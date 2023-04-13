import React, { useEffect, useState } from 'react'
import './_VideoHorizontal.scss'

import { AiFillEye } from 'react-icons/ai'
import request from '../../apiCall'
import privateVideo from '../../img/maxresdefault.jpg'
import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { MdVerified } from "react-icons/md";
import { RiMusicFill } from 'react-icons/ri';
import { getchannelDetails } from '../../redux/actions/channel.action'
import { useSelector } from 'react-redux'
const VideoHorizontal = ({ video, SearchScreen, subScreen, likedScreen,PlaylistScreen,WatchScreen }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { high },
            resourceId,
        },
    } = video

    const [isArtist, setIsArtist] = useState(false);

    const isVideo = !(id.kind === 'youtube#channel' || subScreen)
    const isChannel = (id.kind === 'youtube#channel' || subScreen)

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)
    var videoIds = ''
    if (likedScreen) {
        videoIds = id
    }else if(PlaylistScreen){
        videoIds = video.snippet.resourceId.videoId
    }
    
     else {
        videoIds = id.videoId
    }

    const _channelId = resourceId?.channelId || channelId
   
    useEffect(() => {
       
        const get_video_details = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: videoIds,
                },
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        if (isVideo) get_video_details()
    }, [id, isVideo])

    useEffect(() => {
        const get_channel_icon = async () => {
            const {
                data: { items },
            } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            })
            setChannelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()
        const fetchHandle = async () => {
            try {
              const channelHandle = await axios.get(`https://yt.lemnoslife.com/channels?part=status,approval&id=${_channelId}&handle=HANDLE`);
              
              setIsArtist(channelHandle.data.items[0].approval);
            } catch (error) {
              console.error(error);
            }
          };
          fetchHandle();

        
       
    }, [channelId])

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')
    const history = useHistory()


    const handleClick = () => {
        isVideo
            ? history.push(`/watch/${videoIds}`)
            : history.push(`/channel/${_channelId}`)
        { window.scrollTo(0, 0) }
    }

    const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'

    const numeral = (vcount) => {
        if (vcount > 1000 && vcount < 1000000) {
            vcount = (vcount / 1000).toFixed(1) + 'K'
        } else if (vcount > 1000000 && vcount < 1000000000) {
            vcount = (vcount / 1000000).toFixed(0) + 'M'
        } else if (vcount > 1000000000) {
            vcount = (vcount / 1000000000).toFixed(0) + 'B'
        }

        return vcount;
    }
    return (
        <Row
            className='py-2 m-1 videoHorizontal align-items-center'
            onClick={handleClick}>
            <Col className={`${PlaylistScreen ? ' playlistscreen-details':'videoHorizontal__left'}`}
                xs={6}
                md={SearchScreen || subScreen || likedScreen ? 4 : 6}
             >
                <LazyLoadImage
                    src={high?.url ? high?.url :privateVideo }
                    effect='blur'
                    className={`videoHorizontal__thumbnail ${thumbnail} ${PlaylistScreen ? 'videoHorizontal__thumbnail--playlist' : '' }`}
                    wrapperClassName='videoHorizontal__thumbnail-wrapper'
                    
                />
                {isVideo && (
                    <span className= {` ${PlaylistScreen ? 'videoHorizontal__duration--playlist' : 'videoHorizontal__duration' }`}>{_duration}</span>
                )}
            </Col>
            <Col 
                xs={6}
                md={SearchScreen || subScreen || likedScreen ? 8 : 6}
                className={`${PlaylistScreen ? 'playlistscreen-details-right':'videoHorizontal__right'}`}>
                <p className={!PlaylistScreen? `mb-1 videoHorizontal__title`:``}>{title} {" "}  {(isChannel || subScreen)? isArtist === 'Official Artist Channel' ? <RiMusicFill style={{color:'#b7b6b4'}}/>:isArtist === 'Verified' ? <MdVerified style={{color:'#b7b6b4'}} /> : null :null}  {' '}</p>

                {isVideo  &&  (
                    <div className='videoHorizontal__details'>
                    {PlaylistScreen ? 
                         video?.snippet?.videoOwnerChannelTitle ? video?.snippet?.videoOwnerChannelTitle :channelTitle  + " • "  :"" }   {' ' 
                   
                    }
                    {PlaylistScreen ? " • ":null}
                        {numeral(views)} Views • {' '}
                        {moment(publishedAt).fromNow()}
                        <br/>
                        {SearchScreen? <br/>:null}

                        {SearchScreen  &&  (
                        <LazyLoadImage src={channelIcon?.url} effect='blur' className='imgChannel' style={{width:'40px',height:'40px',marginRight:'0.6rem'}} />
                    )}
                    
                     {!PlaylistScreen ?  video?.snippet?.videoOwnerChannelTitle ? video?.snippet?.videoOwnerChannelTitle :channelTitle :""}   {!PlaylistScreen ?  isArtist === 'Official Artist Channel' ? <RiMusicFill style={{color:'#b7b6b4'}}/>:isArtist === 'Verified' ? <MdVerified style={{color:'#b7b6b4'}} /> : null :""} {' '}
                     <br/> 
                     <br/>
                    </div>
                )}
                {(SearchScreen || subScreen || likedScreen ) && (
                    
                    <p className='mt-1 videoHorizontal__desc'>{description}</p>
                )}


                {!PlaylistScreen && !WatchScreen &&
                <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
                    {/* {  && (
                        <LazyLoadImage src={channelIcon?.url} effect='blur' />
                    )} */}
                </div>
                }
                {subScreen  && (
                    <p className='mt-2'>
                        {video.contentDetails.totalItemCount} Videos
                    </p>
                )}
            </Col>
        <style>
{`
.videoHorizontal__thumbnail--playlist {
  width: 200px;
  height: 160px;
  


}

.playlistscreen-details-right{
  margin-left: -7rem;
}
`}
        </style>
        </Row>
    )
}

export default VideoHorizontal
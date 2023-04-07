import React, { useEffect, useState } from 'react'
import './_video.scss'
import { AiFillEye } from 'react-icons/ai'
import request from '../../apiCall'
import moment from 'moment/moment'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useHistory } from 'react-router-dom'
import { getchannelDetails } from '../../redux/actions/channel.action'
import removed from '../../img/maxresdefault.jpg'
import { MdVerified } from "react-icons/md";
import { RiMusicFill } from 'react-icons/ri';
import axios from 'axios'
const Video = ({ video, channelScreen }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            title,
            publishedAt,

        },
        snippet,
        contentDetails,
    } = video



    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const _videoId = id?.videoId || contentDetails?.videoId || id


    const history = useHistory()
    const [isArtist, setIsArtist] = useState(false);

    useEffect(() => {
        const fetchHandle = async () => {
            try {
              const channelHandle = await axios.get(`https://yt.lemnoslife.com/channels?part=status,approval&id=${channelId}&handle=HANDLE`);
              console.log(channelHandle)
              
              setIsArtist(channelHandle.data.items[0].approval);
            } catch (error) {
              console.error(error);
            }
          };
          fetchHandle();
        const get_video_details = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: _videoId,
                },
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        get_video_details()
    }, [_videoId])

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
    }, [channelId])

    const handleVideoClick = () => {

        history.push(`/watch/${_videoId}`)
        { window.scrollTo(0, 0) }
    }
    if (snippet?.thumbnails.hasOwnProperty('high')) {
        var photoUrl = snippet.thumbnails.high.url
    } else {
        photoUrl = removed


    }
    const handleChannelClick = (() => {
        history.push(`/channel/${channelId}`)
    })


    const numeral = (vcount) => {
        if (vcount > 1000 && vcount < 1000000) {
            vcount = (vcount / 1000).toFixed(0) + 'K'
        } else if (vcount > 1000000 && vcount < 1000000000) {
            vcount = (vcount / 1000000).toFixed(1) + 'M'
        } else if (vcount > 1000000000) {
            vcount = (vcount / 1000000000).toFixed(0) + 'B'
        }

        return vcount;
    }
    return (

        <div className='video' style={{borderRadius:"9px"}}>



            <div className='video__top' onClick={handleVideoClick}>
                <LazyLoadImage style={{borderRadius:"18px",objectFit:'cover'}} src={photoUrl} effect='blur' />
                <span className='video__top__duration'>{_duration}</span>
            </div>
             
            {!channelScreen && (
                <div className='video__channel' title={channelTitle} onClick={handleChannelClick}>
                    <LazyLoadImage src={channelIcon?.url} effect='blur' />

            <div className='video__title' onClick={handleVideoClick}>{title}</div>
                </div>
                
            )}
           
            {!channelScreen && (
                <div className='details'>

                <div style={{marginleft:'3rem'}} className='video__channel' title={channelTitle} onClick={handleChannelClick}>

                    <p style={{marginleft:'3rem'}}>{channelTitle} {" "}  {isArtist === 'Official Artist Channel' ? <RiMusicFill style={{color:'#b7b6b4'}}/>:isArtist === 'Verified' ? <MdVerified style={{color:'#b7b6b4'}} /> : null}</p>
                </div>
            <div className='video__details' style={{marginleft:'3rem'}} onClick={handleVideoClick}>
                <span>
                     {numeral(views)} views • {' '} {' '}{moment(publishedAt).fromNow()} 
                </span>
                
            </div>
                </div>
                
            )}
        </div>
    )
}

export default Video


// Todo

// show more format
// fix comment issue
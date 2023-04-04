import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { getVideoBypPlaylist } from '../../../redux/actions/videos.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import Video from '../../video/Video'
import { Row, Col, Container } from 'react-bootstrap'
import { Helmet } from 'react-helmet'
import { getChannelPlaylistDetails } from '../../../redux/actions/channel.action'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import moment from 'moment'
const PlaylistScreen = ({ item }) => {
    const { playlistId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()
    useEffect(() => {
        // dispatch(getVideoBypPlaylist(playlistId))
        dispatch(getChannelPlaylistDetails(playlistId))

    }, [dispatch, playlistId])

    // const { videos } = useSelector(state => state.playlistVideos)
    const {details} = useSelector(state=>state.getChannelPlaylistDetails)
    console.log(details)
    const fetchData = () => {
        dispatch(getVideoBypPlaylist(playlistId))

    }
    const handleChannelNameClick = (id) => {
        history.push(`/channel/${id}`)
    }
    // console.log(videos)
    // console.log()
    // if(details.length!=0){
    //     return(<h1>Loading</h1>)
    // }
    return (
        <Container>
            <Helmet>
                <title>Playlist</title>
            </Helmet>
            <Row gap={1}>
                <Col sm={4}>
                <div className='mt-9 image-container' style={{border:'1px solid #ffffff',borderRadius:'18px', display:'inline-block', padding:'.9rem', backgroundImage:`url(${details.items[0].snippet.thumbnails.high.url})`}}>
                <div className='content'>

                <LazyLoadImage src ={details.items[0].snippet.thumbnails.high.url} style={{borderRadius:'27px'}} effect='blur'/>
                <br/>   
                <br/>   
                <h3>{details.items[0].snippet.title}</h3>

                <br/>   
                
                
                <p style={{cursor:'pointer'}} onClick={()=>handleChannelNameClick(details.items[0].snippet.channelId)}>{details.items[0].snippet.channelTitle}</p>
                <p style={{color:'#c0c2c2'}}>{details.items[0].contentDetails.itemCount} {' '} {"videos"} {' '} {`Published On : ${moment(details.items[0].snippet.publishedAt).format('MMMM DD, YYYY')}`}</p>
                </div>

                </div>
                </Col>
                <Col sm={4}>

                </Col>
            </Row>


            {/* <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                className='row'>
                <Row className='mt-2'>
                    {
                        videos?.map(video => (
                            <Col md={3} lg={3}>
                                <Video video={video} channelScreen />
                            </Col>


                        ))}
                </Row>
            </InfiniteScroll> */}
            <style>
                {
                    `
                    .image-container {
  position: relative;
  background-size: cover; /* Scale the image to cover the container */
  background-repeat: no-repeat; /* Prevent the image from repeating */
  background-position: center;
}

.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.9); /* Add a semi-transparent background color to the blur effect */
  filter: blur(8px);
  -webkit-filter: blur(8px);
  z-index: -1; /* Position the pseudo-element behind the content */
}

.content {
  position: relative;
  z-index: 1;
  /* Your content styles here */
}

                    `
                }
            </style>
    
        </Container>
    )
}

export default PlaylistScreen
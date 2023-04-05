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
        dispatch(getChannelPlaylistDetails(playlistId))
        dispatch(getVideoBypPlaylist(playlistId))

    }, [dispatch, playlistId])

    const { videos,nextPageToken } = useSelector(state => state.playlistVideos)
    const {details} = useSelector(state=>state.getChannelPlaylistDetails)
    console.log(details)
    const fetchData = () => {
        if(nextPageToken!=undefined){

            dispatch(getVideoBypPlaylist(playlistId))
        }

    }
    const handleChannelNameClick = (id) => {
        history.push(`/channel/${id}`)
    }
    console.log(videos)
    

    return (
        <Container>
            <Helmet>
                <title>{details?.snippet?.title} - YouTube</title>
            </Helmet>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                
                <div className='sticky-top imageMaker' sm={4} style={{ position: 'fixed', maxWidth: 'calc(100vw - 700px)',marginTop:'6rem',borderRadius:'18px' }}>
                <div className='mt-9 image-container' style={{border:'1px solid #ffffff',borderRadius:'18px', display:'inline-block', padding:'.9rem' ,height:"86vh"}}>
                <div className='content'>

                <LazyLoadImage src ={details?.snippet?.thumbnails?.high?.url} style={{borderRadius:'27px', height:'321px', width:'450px'}} effect='blur'/>
                <br/>   
                <br/>   
                <h3>{details?.snippet?.title}</h3>

                <br/>   
                
                
                <p style={{cursor:'pointer'}} onClick={()=>handleChannelNameClick(details?.snippet?.channelId)}>{details?.snippet?.channelTitle}</p>
                <p style={{color:'#c0c2c2'}}>{details?.contentDetails?.itemCount} {' '} {"videos"} {' '} {`Published On : ${moment(details?.snippet?.publishedAt).format('MMMM DD, YYYY')}`}</p>
                </div>

                </div>
                </div>

                <div sm={8} style={{ marginLeft:'27rem', top: 0 }}>
                <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                className='row'
                style={{ position: 'sticky', top: 0  }}>
                <Row className='mt-2' style={{marginLeft:'9rem'}}>
                    {
                        videos?.map(video => (
                            <Col md={2} lg={5}>
                                <Video video={video} channelScreen />
                            </Col>


                        ))}
                </Row>
            </InfiniteScroll>
                </div>
                </div>


          
            <style>
                {
                    `
                    .imageMaker {
                        background-color: #2d3436;
background-image: linear-gradient(315deg, #2d3436 0%, #000000 74%);                          {/* background:linear-gradient(to bottom, rgba(89,72,69,0.800) 0%, rgba(89,72,69,0.298) 33.000001%, rgba(15,15,15,1.000) 100%); */}
}


  




                    `
                }
            </style>
    
        </Container>
    )
}

export default PlaylistScreen
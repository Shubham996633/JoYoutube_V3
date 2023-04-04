import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getShortsChannel } from '../../../redux/actions/videos.action'
import Video from '../../video/Video'
import { Row, Col } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './video.scss'
import { useHistory } from 'react-router-dom'
const ShortsVideos = ({channelId}) => {
    const history = useHistory()
    const dispatch = useDispatch()
    const fetchShortsChannel = useCallback(() => {
        dispatch(getShortsChannel(channelId));
      }, [dispatch, channelId]);
      useEffect(() => {
        fetchShortsChannel();
      }, [fetchShortsChannel]);



    const {loading, shorts, nextPageToken} = useSelector(state=>state.getShorts) 
    const fetchData = () => {
        if(nextPageToken!=undefined){

            dispatch(getShortsChannel(channelId, nextPageToken))
        }
    }
    console.log(nextPageToken)
    console.log(shorts.length)
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
    const handleVideoClick = (id) => {

        history.push(`/watch/${id}`)
        { window.scrollTo(0, 0) }
    }
    

  return (
    <>


    <InfiniteScroll
        dataLength={shorts.length}
        next={fetchData}
        hasMore={true}
        loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
        }
        className='row'>
        <Row className=''>
            {
                shorts?.map(video => (
                    <Col md={2} lg={2}>
                    
                        <div className='video' onClick={()=>handleVideoClick(video.videoId)}>
                            <LazyLoadImage src ={video.thumbnails[0].url} effect='blur' style={{height:'369px', width:'200px', borderRadius:'9px'}}/>
                            <p className='videoTitle'  style={{marginTop:'1.2rem'}}>{video.title}</p>
                            <p style={{backgroundColor:'#0c0c0c'}}>{numeral(video.viewCount)} {' '} views</p>
                        </div>
                    </Col>
    
    
                ))}
        </Row>
    </InfiniteScroll>
        </>
  )
}

export default ShortsVideos
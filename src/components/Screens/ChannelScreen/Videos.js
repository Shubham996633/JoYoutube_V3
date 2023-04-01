import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideoByChannel } from '../../../redux/actions/videos.action'
import './_ChannelScreen.scss'
import { Col, Container, Row } from 'react-bootstrap'
import Video from '../../video/Video'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { getchannelDetails } from '../../../redux/actions/channel.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Helmet } from 'react-helmet'
import { useEffect } from 'react'
const Videos = () => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    useEffect(() => {
        dispatch(getVideoByChannel(channelId))
    }, [dispatch], channelId)
    const { videos, loading } = useSelector(state => state.channelVideos)
   

    const fetchData = () => {
        dispatch(getVideoByChannel(channelId))
    }

    const numeral = (vcount) => {
        if (vcount > 1000 && vcount < 1000000) {
            vcount = (vcount / 1000).toFixed(2) + 'K'
        } else if (vcount > 1000000 && vcount < 1000000000) {
            vcount = (vcount / 1000000).toFixed(2) + 'M'
        } else if (vcount > 1000000000) {
            vcount = (vcount / 1000000000).toFixed(2) + 'B'
        }

        return vcount;
    }
  return (
    <>






<InfiniteScroll
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
</InfiniteScroll>
    </>
  )
}

export default Videos
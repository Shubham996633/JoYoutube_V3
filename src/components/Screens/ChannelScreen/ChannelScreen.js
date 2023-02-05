import React, { useEffect } from 'react'
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

const ChannelScreen = () => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    useEffect(() => {
        dispatch(getVideoByChannel(channelId))
        dispatch(getchannelDetails(channelId))
    }, [dispatch], channelId)

    const { videos, loading } = useSelector(state => state.channelVideos)
    const { snippet, statistics } = useSelector(
        state => state.channelDetails.channel
    )
    const subscriptionStatus = useSelector(
        state => state.channelDetails.subscriptionStatus
    )

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
        <Container>
            <Helmet>
                <title>{snippet?.title}</title>
            </Helmet>
            <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
                <div className='d-flex align-items-center'>
                    <img src={snippet?.thumbnails?.default?.url} alt='' className='imgChannel' />

                    <div className='ml-3 channelHeader__details'>
                        <h3>{snippet?.title}</h3>
                        <span>
                            {numeral(statistics?.subscriberCount)}{' '}
                            subscribers
                        </span>
                    </div>
                </div>

                <button
                    className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'
                        }`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>





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

        </Container>

    )
}

export default ChannelScreen
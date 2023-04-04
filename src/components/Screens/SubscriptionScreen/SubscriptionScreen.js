import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSubscribedChannels } from '../../../redux/actions/videos.action'
import './_SubscriptionScreen.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal'
import { Helmet } from 'react-helmet'

const SubscriptionScreen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribedChannels())
    }, [dispatch])

    const { loading, videos } = useSelector(state => state.subscriptionsChannel)
    console.log(videos)
    return (

        <Container fluid>
            <Helmet>
                <title>Subscriptions</title>
            </Helmet>
            {!loading ? (
                videos?.map(video => (
                    <VideoHorizontal video={video} key={video.id} subScreen />
                ))
            ) : (
                <SkeletonTheme color='#343a40' highlightColor='#3c4147'>
                    <Skeleton width='100%' height='160px' count={20} />
                </SkeletonTheme>
            )}
        </Container>
    )
}

export default SubscriptionScreen
// 5:38:24
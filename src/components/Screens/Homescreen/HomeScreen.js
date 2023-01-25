import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import Video from '../../video/Video'
import CategoriesBar from '../../CategoriesBar/CategoriesBar'
import { useDispatch, useSelector, } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
    getPopularVideos,
    getVideosByCategory,
} from '../../../redux/actions/videos.action'
import SkeletonVideo from '../../skeletons/SkeletonVideo'

const HomeScreen = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getPopularVideos())
    }, [dispatch])

    const { videos, activeCategory, loading } = useSelector(
        state => state.homeVideos
    )

    const fetchData = () => {
        if (activeCategory === 'All') dispatch(getPopularVideos())
        else {
            dispatch(getVideosByCategory(activeCategory))
        }
    }

    console.log(videos.length)


    return (
        <Container>
            <CategoriesBar />

            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>
                }
                className='row'>
                {videos.map(video => (
                    <Col lg={3} md={4}>
                        <Video video={video} key={video.id} />
                    </Col>
                ))
                }
            </InfiniteScroll>
        </Container>
    )
}
export default HomeScreen

// 3:02:18
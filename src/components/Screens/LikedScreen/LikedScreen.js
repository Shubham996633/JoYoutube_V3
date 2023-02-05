import React, { useEffect } from 'react'
import './_LikedScreen.scss'
import { useDispatch } from 'react-redux'
import { getLikedVideos } from '../../../redux/actions/videos.action'
import { Container, Col } from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSelector } from 'react-redux'
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal'
import Video from '../../video/Video'
import { Helmet } from 'react-helmet'

const LikedScreen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLikedVideos())
    }, [dispatch])
    const { videos } = useSelector(state => state.likedVideos)



    const fetchData = () => {
        dispatch(getLikedVideos())

    }



    return (
        <Container>
            <Helmet>
                <title>Liked Vides</title>
            </Helmet>
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader={
                    <div className='spinner-border text-danger d-block mx-auto'></div>

                }
                className='row'
            >
                {
                    videos.map(video => (
                        <Col lg={3} md={4}>

                            <Video
                                video={video}
                                key={video.id.videoId}
                                likedScreen
                            />
                        </Col>

                    ))
                }

            </InfiniteScroll>
        </Container>
    )
}



export default LikedScreen
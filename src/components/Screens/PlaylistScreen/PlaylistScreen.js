import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideoBypPlaylist } from '../../../redux/actions/videos.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import Video from '../../video/Video'
import { Row, Col } from 'react-bootstrap'
const PlaylistScreen = ({ item }) => {
    const { playlistId } = useParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getVideoBypPlaylist(playlistId))

    }, [dispatch, playlistId])

    const { videos } = useSelector(state => state.playlistVideos)
    const fetchData = () => {
        dispatch(getVideoBypPlaylist(playlistId))

    }
    console.log(videos)

    return (
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
    )
}

export default PlaylistScreen
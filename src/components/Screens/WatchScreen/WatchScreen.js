import React, { useEffect } from 'react'
import './_WatchScreen.scss'
import { Col, Row } from 'react-bootstrap'
import VideoMetaData from '../../VideoMetaData/VideoMetaData'
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal'
import Comments from '../../Comments/Comments'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRelatedVideos, getVideoById } from '../../../redux/actions/videos.action'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Helmet } from 'react-helmet'
import { getchannelDetails } from '../../../redux/actions/channel.action'
import InfiniteScroll from 'react-infinite-scroll-component'
const WatchScreen = () => {
    const { id } = useParams()

    const dispatch = useDispatch()

    const { video, loading } = useSelector(state => state.selectedVideo)
    useEffect(() => {

        dispatch(getVideoById(id))
        dispatch(getchannelDetails(video?.snippet.channelId))
        dispatch(getRelatedVideos(id))
    }, [dispatch, id])


    const { videos, loading: relatedVideosLoading } = useSelector(state => state.relatedVideos)


    const {
        snippet: channelSnippet,
        statistics: channelStatistics,
    } = useSelector(state => state.channelDetails.channel || {});
    


    return (

        <Row>
            <Helmet>
                <title>{video?.snippet?.title}</title>
            </Helmet>
            <Col lg={8}>
                <div className='watchScreen__player'>
                    <iframe src={`https://www.youtube.com/embed/${id}`}

                        frameBorder="0"
                        title={video?.snippet?.title}
                        allowFullScreen
                        autoplay
                        width="100%"
                        height="100%"></iframe>
                </div>
                {
                    !loading ?
                        <VideoMetaData video={video} videoId={id} />
                        : <h6>Loading ...</h6>
                }
                <Comments videoId={id} totalComments={video?.statistics?.commentCount} channelName={channelSnippet?.localized?.title } channelIcon={channelSnippet?.thumbnails?.high?.url} />
            </Col>
            <Col lg={4} >
            
                { (
                    videos
                        ?.filter(video => video.snippet)
                        .map(video => (
                            <VideoHorizontal video={video} key={video.id.videoId} WatchScreen />
                        ))
                )}


            </Col>
        </Row>
    )
}

export default WatchScreen

// 4:01:57
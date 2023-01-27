import React, { useEffect } from 'react'
import './_SearchScreen.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosBySearch } from '../../../redux/actions/videos.action'
import { Container } from 'react-bootstrap'
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import InfiniteScroll from 'react-infinite-scroll-component';

const SearchScreen = () => {
    const { query } = useParams()




    const dispatch = useDispatch()




    useEffect(() => {
        dispatch(getVideosBySearch(query))
    }, [dispatch, query])

    const { videos, loading } = useSelector(state => state.searchedVideos)

    const fetchData = () => {
        dispatch(getVideosBySearch(query))

    }


    return (
        <Container>
            <InfiniteScroll
                dataLength={videos.length}
                next={fetchData}
                hasMore={true}
                loader=<div className='spinner-border text-danger d-block mx-auto'></div>
                className='row'
            >
                {
                    videos.map(video => (

                        <VideoHorizontal
                            video={video}
                            key={video.id.videoId}
                            SearchScreen
                        />
                    ))
                }
            </InfiniteScroll>


        </Container>
    )
}

export default SearchScreen
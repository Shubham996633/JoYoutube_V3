import React, { useEffect } from 'react'
import './_SearchScreen.scss'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getVideosBySearch } from '../../../redux/actions/videos.action'
import { Container } from 'react-bootstrap'
import VideoHorizontal from '../../VideoHorizontal/VideoHorizontal'
const SearchScreen = () => {
    const { query } = useParams()




    const dispatch = useDispatch()




    useEffect(() => {
        dispatch(getVideosBySearch(query))
    }, [dispatch, query])

    const { videos, loading } = useSelector(state => state.searchedVideos)

    return (
        <Container>

            {!loading ? (
                videos?.map(video => (
                    <VideoHorizontal
                        video={video}
                        key={video.id.videoId}
                        SearchScreen
                    />
                ))
            ) : (
                <h1>Loading...</h1>
            )}
        </Container>
    )
}

export default SearchScreen
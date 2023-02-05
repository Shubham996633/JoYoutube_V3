import React from 'react'
import { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaylist } from '../../../redux/actions/channel.action'
import { MdLibraryBooks } from 'react-icons/md'
import './libraryscreen.scss'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Helmet } from 'react-helmet'

const LibraryScreen = () => {

    const history = useHistory()
    const { playlist } = useSelector(state => state.playlistItems)
    const handlePlaylist = (id) => {
        console.log(id)
        history.push(`/playlist/${id}`)

    }

    return (
        <Container className='playlist-container'>
            <Helmet>
                <title>Library</title>
            </Helmet>
            {playlist.map(item => (

                <Col lg={10} md={10}
                    className={`py-2 m-1 videoHorizontal align-items-center ${item.id}`} onClick={(e) => handlePlaylist(item.id)}
                    key={item.id}
                >
                    <Col
                        xs={6}
                        md={6}
                        className='videoHorizontal__left'>
                        <LazyLoadImage
                            src={item.snippet.thumbnails.high.url}
                            effect='blur'
                            className='videoHorizontal__thumbnail'
                            wrapperClassName='videoHorizontal__thumbnail'
                        />

                    </Col>
                    <Col
                        xs={6}
                        md={6}
                        className='p-0 videoHorizontal__details'>
                        <p className='videoHorizontal__title'>{item.snippet.title}</p>





                        <p className='mt-1 videoHorizontal__desc'>by {item.snippet.channelTitle}</p>


                        <div className='my-1 videoHorizontal__channel d-flex align-items-center'>

                            <p className='mb-0'>{item.snippet.description}</p>
                        </div>

                        <p className='mt-2'>
                            Published At:  {
                                moment(item.snippet.publishedAt).fromNow()
                            }
                        </p>






                    </Col>
                </Col>
            ))
            }
        </Container>

    )
}

export default LibraryScreen



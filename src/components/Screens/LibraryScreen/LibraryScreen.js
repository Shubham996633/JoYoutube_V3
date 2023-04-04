import React from 'react'
import { useEffect } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { useDispatch, useSelector } from 'react-redux'
import { getAllPlaylist } from '../../../redux/actions/channel.action'
import { MdLibraryBooks } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import { Helmet } from 'react-helmet'
import { Container, Row, Col } from 'react-bootstrap'

const LibraryScreen = () => {

    const history = useHistory()
    const { playlist } = useSelector(state => state.playlistItems)
    const handlePlaylist = (id) => {
        console.log(id)
        history.push(`/playlist/${id}`)

    }
    console.log(playlist)

    return (
        <>
        <Container style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
          {playlist.map((list) => (
            <div style={{ margin: '10px' }}>
              <div className='playlist-container origin-center' onClick={() => handlePlaylist(list.id)}>
                <div className='playlist-image'>
                  <LazyLoadImage className='playlist-image-Image' style={{height:"252px",width:'333px'}} src={list.snippet.thumbnails.high.url} effect='blur' />
                  <div className='playlist-overlay'>
                    <p className='overlay-text'>Videos : {list.contentDetails.itemCount}</p>
                  </div>
                </div>
                <p>{list.snippet.title}</p>
                <p style={{ color: "#ced1d1" }}>View full playlist</p>
              </div>
            </div>
          ))}
        </Container>
      </>
      

    )
}

export default LibraryScreen



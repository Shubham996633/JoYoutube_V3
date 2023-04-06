import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelPlaylist } from '../../../redux/actions/channel.action'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Container, Row,Col } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const ChannelPlaylist = ({channelId}) => {
 
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannelPlaylist(channelId))
    },[dispatch, channelId]);
    const {loading, playlists, nextPageToken} =useSelector(state=>state.getChannelPlaylist)
    console.log(playlists)

  const history = useHistory()
  const handleClick = (id) => {

    history.push(`/playlist/${id}`)
    { window.scrollTo(0, 0) }
}
  return (
    <>
      {playlists.map((playlist)=>(
        <Container>
        <br/>

       <p> {playlist.title}</p>
<div>
<Row style={{display:'flex'}}>

        {playlist.playlists.map((list)=>(
          <Col lg={3} md={4}>

          <div className='playlist-container origin-center' onClick={()=>handleClick(list.id)}>
          <div className='playlist-image'>

          <LazyLoadImage className='playlist-image-Image' style={{height:"180px",width:'300px'}} src={list.thumbnailVideo.thumbnails[0].url} effect='blur'/>
          <div className='playlist-overlay'>

          <p className='overlay-text'>Videos : {list.videoCount}</p>
          </div>

          </div>
          <p>{list.title}</p>

        <p style={{color:"#ced1d1"}}>View full playlist</p>
          
          </div>
          </Col>
        ))}
</Row>
</div>
        </Container>
      ))}
    </>
  )
}

export default ChannelPlaylist
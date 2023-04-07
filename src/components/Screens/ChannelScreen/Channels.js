import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './_ChannelScreen.scss'
import { Col, Container, Row } from 'react-bootstrap';
import { getChannels } from '../../../redux/actions/channel.action';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
const Channels = ({channelId}) => {

 
const dispatch = useDispatch()
    useEffect(() => {
       dispatch(getChannels(channelId))



      }, [dispatch,channelId]);
      
const {loading, channel} = useSelector(state=>state.getchannel)

  const numeral = (vcount) => {
    if (vcount > 1000 && vcount < 1000000) {
      vcount = (vcount / 1000).toFixed(2) + 'K';
    } else if (vcount > 1000000 && vcount < 1000000000) {
      vcount = (vcount / 1000000).toFixed(2) + 'M';
    } else if (vcount > 1000000000) {
      vcount = (vcount / 1000000000).toFixed(2) + 'B';
    }

    return vcount;
  };
  const history = useHistory()
  const handleClick = (id) =>{
    history.push(`/channel/${id}`)

  }
  
console.log(channel)
if (loading) {
    return        <Spinner animation="grow" variant="danger" />

  }

  return (
    <Container>
    <br/>
     {channel.items[0].channelSections.map((type) => (
  <div>
    <h3>{type.title}</h3>
    <br/>
    <Row style={{ display: 'flex' }}>
        {type.sectionChannels.map((channel) => (
          <Col lg={3} md={4}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'  }} onClick={()=>handleClick(channel.channelId)}>
              <img src={channel.thumbnails[2].url} className='imgChannel' style={{ width: '111px', height: '111px', marginRight:'0rem' }}/>
              <br/>
              <p>{channel.title}</p>
              <p style={{color:'#dcdcdc'}}>{numeral(channel.subscriberCount)} subscribers</p>
            </div>
          <br/>
          </Col>
        ))}
      </Row>
  <br/>
  </div>
))}

    </Container>
  )
}

export default Channels
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import './video.css'
const About = (
    {channelId}
) => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
    
  const [channelData, setChannelData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,about,approval&id=${channelId}&handle=HANDLE`);
        setChannelData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
    console.log(channelData);
  }, [channelId]);
  
console.log(channelData)

  return (
    <div>
      {channelData ? (
        <Container>
          <br />
          <Row gap={1}>
            <Col sm={8}>
              <h5>Description</h5>
              <p>{channelData.items[0].about.description}</p>
              <br />
              <hr/>
              <h6>Details</h6>
              <p style={{color:'#afacab'}}><span style={{marginRight:'3rem'}}>Location: </span> {'       '}{ "        " +channelData.items[0].about.details.location}</p>
              <hr />
              {/* <Row gap={2}>
                {channelData.items[0].about.featuredChannelsUrls.map((channel) => (
                  <Col key={channel}>
                    <a href={`https://www.youtube.com/channel/${channel}`} target="_blank" rel="noreferrer">
                      {channel}
                    </a>
                  </Col>
                ))}
              </Row> */}
              <br />
              <h6>Links</h6>
              <hr />
              <Row gap={2}>
                {channelData.items[0].about.links.map((link) => (
                  <Col key={link.url}>
                    <a  href={link.url} target="_blank" rel="noreferrer" className='links'>
                      {link.title}
                    </a>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col sm={4}>
              <h3>Stats</h3>
              <hr />
              {/* <p>Subscribers: {channelData.items[0].status.subscriberCount}</p> */}
              <p>Joined : {moment.unix(channelData.items[0].about.stats.joinedDate).format('MMMM DD, YYYY')}</p>
              <hr />
              
              <p>Views: {channelData.items[0].about.stats.viewCount.toLocaleString('en-US')}  { ' '} views</p>
              <hr />
              
              {/* <p>Videos: {channelData.items[0].status.videoCount}</p> */}
            </Col>
          </Row>
        </Container>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default About;

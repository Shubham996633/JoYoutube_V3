import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './video.css';
import './_ChannelScreen.scss';
import { Col, Container, Row } from 'react-bootstrap';
import { checkSubscriptionStatus, getchannelDetails } from '../../../redux/actions/channel.action';
import { Helmet } from 'react-helmet';
import Videos from './Videos';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { RiMusicFill } from 'react-icons/ri';
import About from './About';
import Channels from './Channels';
import Community from './Community';
import { MdVerified } from "react-icons/md";
import request from '../../../apiCall';
import { getVideoByChannel } from '../../../redux/actions/videos.action';
const ChannelScreen = () => {
    const { channelId = '' } = useParams();
    const dispatch = useDispatch();
  
    const [isArtist, setIsArtist] = useState(false);
    const [aboutData, setAboutData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://yt.lemnoslife.com/channels?part=status,about,approval&id=${channelId}&handle=HANDLE`);
          console.log(response)
          setAboutData(response.data.items[0].about);
          setIsArtist(response.data.items[0].approval);
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
      dispatch(getchannelDetails(channelId));
      dispatch(checkSubscriptionStatus(channelId));
        dispatch(getVideoByChannel(channelId))

    }, [dispatch, channelId]);
  
  const { snippet, statistics, brandingSettings } = useSelector(
    (state) => state.channelDetails.channel
  );
  const subscriptionStatus = useSelector((state) => state.channelDetails.subscriptionStatus);

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

  const isLoading = !snippet;
  var shorts = []
  var longs = []
  const timeCheck = (id, video) => {
    const get_video_details = async () => {
      const {
          data: { items },
      } = await request('/videos', {
          params: {
              part: 'contentDetails,statistics',
              id: id,
          },
      })
      var duration = items[0].contentDetails.duration
      if(duration.startsWith("PT") && (duration.endsWith("S") && !duration.includes("M"))){
        console.log('shorts')
        shorts.push(video)
      }else{
        console.log('long')
        longs.push(video)

      }
  }
  get_video_details()

  }
    const { videos, loading } = useSelector(state => state.channelVideos)
    
   
    console.log(shorts)
    console.log(longs)
    videos.map((video)=> (
      timeCheck(video.snippet.resourceId.videoId, video)
    ))

   
    return (
        <Container>
            <Helmet>
                <title>{snippet?.title}</title>
            </Helmet>

            <div className='flex'>
            {!isLoading && (
                <img src ={`${brandingSettings.image.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj` } width={'111%'} />
            )}
            <br/>
        <br/>
            </div>
            {!isLoading && ( // Render the channel header only when the data is ready
            
                <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
         
                    <div className='d-flex align-items-center'>
                        <img src={snippet?.thumbnails?.high?.url} alt='' className='imgChannel' style={{ width: '150px', height: '150px' }}/>
                        <div className='ml-3 channelHeader__details'>
                            <h3>{snippet?.title} {'  '}  {isArtist === 'Official Artist Channel' ? <RiMusicFill style={{color:'#b7b6b4'}}/>:isArtist === 'Verified' ? <MdVerified style={{color:'#b7b6b4'}} /> : null}</h3>
                            <p style={{color:'#b7b6b4'}}>{aboutData.handle} { '  '} { '  '} {numeral(statistics?.subscriberCount)} subscribers { '  '}  { '  '} {statistics?.videoCount} videos</p>
                        </div>
                    </div>
                    <button className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'}`}>
                        {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                    </button>
       
                </div>
            )}
        <br/>
            <Tabs
      defaultActiveKey="VIDEOS"
      id="uncontrolled-tab-example"
      className="mb-3 nav-tabs "
    >
      
            <Tab eventKey="VIDEOS" title="VIDEOS" className="tab nav-link">
        <Videos videos = {longs} />
        </Tab>
        <Tab eventKey="SHORTS" title="SHORTS" className="tab nav-link">
        <Videos videos = {shorts} />
        </Tab>
        <Tab eventKey="COMMUNITY" title="COMMUNITY" className="tab nav-link">
        <Community handle = {aboutData.handle} icon={snippet?.thumbnails?.high?.url} channelId={channelId}/>
        </Tab>
        <Tab eventKey="CHANNELS" title="CHANNELS" className="tab nav-link">
        <Channels channelId={channelId}/>
        </Tab>
        <Tab eventKey="ABOUT" title="ABOUT" className="tab nav-link">
        <About channelId = {channelId}/>
        </Tab>
    </Tabs>

    <br/>
    <style>
  {`
    .nav-tabs .nav-link.active {
      background-color: #0c0c0c;
      color: white;
    }
  `}
</style>

  
          

        </Container>

    )
}

export default ChannelScreen
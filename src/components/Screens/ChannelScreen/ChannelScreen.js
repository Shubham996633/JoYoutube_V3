import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideoByChannel } from '../../../redux/actions/videos.action'
import './video.css'
import './_ChannelScreen.scss'
import { Col, Container, Row } from 'react-bootstrap'
import Video from '../../video/Video'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { checkSubscriptionStatus, getchannelDetails } from '../../../redux/actions/channel.action'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Helmet } from 'react-helmet'
import Videos from './Videos'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
const ChannelScreen = () => {


    const dispatch = useDispatch()
    const { channelId = '' } = useParams()

    
    useEffect(() => {
        dispatch(getchannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    const { snippet, statistics,brandingSettings } = useSelector(
        state => state.channelDetails.channel
    )
    const subscriptionStatus = useSelector(
        state => state.channelDetails.subscriptionStatus
    )
    const numeral = (vcount) => {
        if (vcount > 1000 && vcount < 1000000) {
            vcount = (vcount / 1000).toFixed(2) + 'K'
        } else if (vcount > 1000000 && vcount < 1000000000) {
            vcount = (vcount / 1000000).toFixed(2) + 'M'
        } else if (vcount > 1000000000) {
            vcount = (vcount / 1000000000).toFixed(2) + 'B'
        }

        return vcount;
    }

   
    return (
        <Container>
            <Helmet>
                <title>{snippet?.title}</title>
            </Helmet>

            <div className='flex'>

                <img src ={`${brandingSettings.image.bannerExternalUrl}=w2120-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj` } width={'111%'} />
            </div>
    <div className='px-5 py-2 my-2 d-flex justify-content-between align-items-center channelHeader'>
            
            <div className='d-flex align-items-center'>
                <img src={snippet?.thumbnails?.default?.url} alt='' className='imgChannel' />
        
                <div className='ml-3 channelHeader__details'>
                    <h3>{snippet?.title}</h3>
                    <span>
                        {numeral(statistics?.subscriberCount)}{' '}
                        subscribers
                    </span>
                </div>
            </div>
        
            <button
                className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'
                    }`}>
                {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
        
            <Tabs
      defaultActiveKey="VIDEOS"
      id="uncontrolled-tab-example"
      className="mb-3 nav-tabs "
    >
      
            <Tab eventKey="VIDEOS" title="VIDEOS" className="tab nav-link">
        <Videos />
        </Tab>
        <Tab eventKey="COMMUNITY" title="COMMUNITY" className="tab nav-link">
        community
        </Tab>
        <Tab eventKey="CHANNELS" title="CHANNELS" className="tab nav-link">
        channels
        </Tab>
        <Tab eventKey="ABOUT" title="ABOUT" className="tab nav-link">
        about
        </Tab>
    </Tabs>
    <style>
  {`
    .nav-tabs .nav-link.active {
      background-color: black;
      color: white;
    }
  `}
</style>
  
          

        </Container>

    )
}

export default ChannelScreen
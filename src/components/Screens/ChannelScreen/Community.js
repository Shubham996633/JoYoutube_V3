import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommunityPost } from '../../../redux/actions/channel.action'
import './_ChannelScreen.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Spinner } from 'react-bootstrap'
const Community = ({handle,icon,channelId}) => {
 

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCommunityPost(channelId))
    },[dispatch,channelId])


    const {loading, community,nextPageToken} = useSelector(state=>state.getCommunity)
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

      console.log(community)
      // if (loading) {
      //   return         <Spinner animation="grow" variant="danger" />

      // }
      console.log(nextPageToken)
      
      const fetchData = () => {
        if(nextPageToken!="stop"){

          dispatch(getCommunityPost(channelId, nextPageToken))
        }
      };
      
  return (
  
    <InfiniteScroll
        dataLength={community.length}
        next={fetchData}
        hasMore={true}
        loader={        <Spinner animation="grow" variant="danger" />
}
        className='row'
        key={community.join()}
      >

    <>
    <br/>
    {community.map((post) => (
        <div style={{border:'0.5px solid #d5d5d5', borderRadius :'1%', padding:'15px', marginBottom:'3rem'}}>
        <div style={{display:'flex'}} >

            <img  src ={icon} title={handle} className='imgChannel' style={{ marginRight:'.5rem', width: '42px', height: '42px' }} />
            <p >{handle} {'   '}{post.date} { ' '} {post.edited ? 'Edited':null}</p>
        </div>
        <br/>
            <span>{post.contentText.map((postText) => {
  if (postText.text && (postText.text.startsWith('http://') || postText.text.startsWith('https://'))) {
    return (
      <div>
        <a href={postText.text} target="_blank" rel="noopener noreferrer" style={{ marginLeft:'3rem'}}>{postText.text}</a>
      </div>
    );
  } else {
    return (
      <div style={{ marginLeft:'3rem'}}>
        {postText.text}
      </div>
    );
  }
})}
</span>
    <br/>

{post.images.length != 0 ? <img style={{ marginLeft:'3rem', }} src={post.images[0].thumbnails[post.images[0].thumbnails.length-2].url} />


    
:null}
<br/>
<br/>
        </div>
    ))}
    
    </>
      </InfiniteScroll>
  )
}

export default Community
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCommunityPost } from '../../../redux/actions/channel.action'
import './_ChannelScreen.scss'

const Community = ({handle,icon,channelId}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCommunityPost(channelId))
    },[dispatch])


    const {loading, community} = useSelector(state=>state.getCommunity)
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
      if (loading) {
        return <p>Loading...</p>
      }
  return (
    <>
    <br/>
    {community.community.map((post) => (
        <div style={{border:'0.5px solid #d5d5d5', borderRadius :'1%', padding:'15px', marginBottom:'3rem'}}>
        <div style={{display:'flex'}} >

            <img  src ={icon} title={handle} className='imgChannel' style={{ marginRight:'.5rem', width: '42px', height: '42px' }} />
            <p >{handle} {'   '}{post.date} { ' '} {post.edited ? 'Edited':null}</p>
        </div>
        <br/>
            <span>{post.contentText.map((postText) => {
  if (postText.text && (postText.text.startsWith('http://') || postText.text.startsWith('https://'))) {
    // If the text starts with http:// or https://, assume it is a link and render it as such
    return (
      <div>
        <a href={postText.text} target="_blank" rel="noopener noreferrer" style={{ marginLeft:'3rem'}}>{postText.text}</a>
      </div>
    );
  } else {
    // Otherwise, assume it is plain text and render it as such
    return (
      <div style={{ marginLeft:'3rem'}}>
        {postText.text}
      </div>
    );
  }
})}
</span>
    <br/>

{post.images.length != 0 ? <img style={{ marginLeft:'3rem' }} src={post.images[0].thumbnails[post.images[0].thumbnails.length-1].url} />


    
:null}
<br/>
<br/>
        </div>
    ))}
    
    </>
  )
}

export default Community
import moment from 'moment/moment'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './_comment.scss'
import { BiDislike, BiLike } from "react-icons/bi";
import { AiFillCaretDown, AiFillHeart } from "react-icons/ai";

const Comment = ({ comment,channelIcon,channelName }) => {
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

    return (
        <div className='comment p-2 d-flex'>
            <img src={comment.authorProfileImageUrls[2].url} alt="" className='rounded-circle mr-3' />
            <div className='comment__body'>
                <p className='comment__header mb-1'>
                    {comment.authorName} • {comment.publishedAt} {comment.wasEdited? "(Edited)":""}
                </p>
                <p className='mb-0'>{comment.textOriginal}</p>
               <br/>
                <p><BiLike style={{height:"21px",width:'21px' }}/>  {" "} {numeral(comment.likeCount)}
                <BiDislike style={{height:"21px",width:'21px', marginRight:'.5rem', marginLeft:".5rem"}}/>
                {comment.isHearted? <div class="image-container" title={`Hearted by ${channelName}` }> <img className='imgChannel' src={channelIcon} style={{height:'27px' , width:"27px",marginRight:'.4rem'}}/><AiFillHeart className='heart-icon' style={{height:"21px",width:'21px', color:'red ',marginTop:'.8rem'}}/></div>:null}</p>
                <p>
  {comment.totalReplyCount !== 0 ? (
    <span style={{color:'skyblue'}}>
    <AiFillCaretDown size="24px" />
    {comment.videoCreatorHasReplied ?  <img className='imgChannel' src={channelIcon} style={{height:'27px' , width:"27px" ,marginRight:'.5rem'}}/>  :null} {'·'} {comment.totalReplyCount} replies 
    </span>
  ) : null}
</p>
            </div>
        <style>
{
    `
    .image-container {
  position: relative;
  display: inline-block;
}

.heart-icon {
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background-size: cover;
  z-index: 1;
}

    `
}
        </style>
        </div>
    )
}

export default Comment
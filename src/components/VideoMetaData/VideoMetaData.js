import React, { useEffect } from 'react'
import './_VideoMetaData.scss'
import { useState } from 'react';
import moment from 'moment'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text'
import { useDispatch, useSelector } from 'react-redux'
import {
    checkSubscriptionStatus,
    delSubscribe,
    getchannelDetails,
    getVideoRating,
    makeLike,
    makeSubscribe,
} from '../../redux/actions/channel.action'
import HelmetCustom from '../HelmetCustom'
import { useHistory } from 'react-router-dom'

import { AiFillLike } from "react-icons/ai";


import { BiLike, BiDislike } from "react-icons/bi";
import { getLikedVideos, getSubscribedChannels } from '../../redux/actions/videos.action';


const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet
    const { viewCount, likeCount, dislikeCount } = statistics

    const dispatch = useDispatch()

    const history = useHistory()
    const [open, setOpen] = useState(false);

    const handleSubscribe = (status) => {
        if (status) {

            setOpen(true);
        }
        else {
            console.log("task to unsubscribe")
            dispatch(makeSubscribe(channelId))
        }
    }


    const { loading, videos } = useSelector(state => state.subscriptionsChannel)
    var channelList = []
    var channelSubId = []
    videos.map((video) => {
        channelList.push(video.snippet.title)
        channelSubId.push(video.id)

    })
    console.log(videos)
    const handleClose = () => {

        setOpen(false);

    };
    function findListId(name, lists) {
        for (let i = 0; i < lists.length; i++) {
            if (lists[i] === name) {
                return i;
            }
        }

    }

    const handleUnSubscribe = () => {
        var requiredId = channelSubId[(findListId(channelTitle, channelList))]
        console.log(requiredId)
        dispatch(delSubscribe(requiredId))
        setOpen(false)

    }


    useEffect(() => {
        dispatch(getchannelDetails(channelId))
        dispatch(getSubscribedChannels())

        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    const {
        snippet: channelSnippet,
        statistics: channelStatistics,
    } = useSelector(state => state.channelDetails.channel || {})

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
    const handleChannelClick = (() => {
        history.push(`/channel/${channelId}`)
    })

    var like = 'none';

    useEffect(() => {
        dispatch(getVideoRating(videoId))
    }, [dispatch, videoId])

    const rate = useSelector(state => state.ratecheck.rating)
    if (rate === 'like') {
        like = "like";
    } else if (rate === 'dislike') {
        like = "dislike";
    } else {
        like = "none";
    }


    const handleLikeClick = (videoId, like) => {
        if (like === 'none') {
            const act = 'like'
            dispatch(makeLike(videoId, act))
        } else {
            const act = 'none'
            dispatch(makeLike(videoId, act))
        }


    }

    const handleDisLikeClick = (videoId, like) => {
        if (like === 'none') {
            const act = 'dislike'
            dispatch(makeLike(videoId, act))
        } else {
            const act = 'none'
            dispatch(makeLike(videoId, act))
        }


    }
    const {error} = useSelector(state=>state.ratecheck || {})
    if(error.code===401){

        console.log('error catched')
    }
    return (
        <div className='py-2 videoMetaData '>
            <HelmetCustom title={title} description={description} />

            <div className='videoMetaData__top'>
                <h5>{title}</h5>
                <div className='py-1 d-flex justify-content-between align-items-center'>
                    <span>
                        {numeral(viewCount)} Views •{' '}
                        {moment(publishedAt).fromNow()}
                    </span>

                    <div>
                        <span className='mr-3' onClick={() => handleLikeClick(videoId, like)}>
                            {like === 'like' ? <MdThumbUp size={26} /> : <BiLike size={26} />}  {numeral(likeCount)}
                        </span>
                        <span className='mr-3' onClick={() => handleDisLikeClick(videoId, like)}>
                            {like === 'dislike' ? <MdThumbDown size={26} /> : <BiDislike size={26} disabled />}{' '}
                            {numeral(dislikeCount)}
                        </span>
                    </div>
                </div>
            </div>
            <div className='py-3 my-2 videoMetaData__channel d-flex justify-content-between align-items-center'>
                <div className='d-flex' title={channelTitle} onClick={handleChannelClick}>
                    <img
                        src={channelSnippet?.thumbnails?.default?.url}
                        alt=''
                        className='mr-3 rounded-circle'
                    />
                    <div className='d-flex flex-column'>
                        <span className='text-2xl font-bold	'>{channelTitle}</span>
                        <span>
                            {' '}
                            {numeral(channelStatistics?.subscriberCount)}{' '}
                            Subscribers
                        </span>
                    </div>
                </div>

                <button variant="outlined" onClick={() => handleSubscribe(subscriptionStatus)}
                    className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'
                        }`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"



                >

                    <DialogContent className='promptdark'>
                        <DialogContentText id="alert-dialog-description" style={{ color: '#b5b7b3' }}>
                            Unsubscribe from {channelTitle}?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions className='promptdark'>
                        <Button style={{ color: '#ffffff' }} onClick={handleClose}>Cancel</Button>
                        <Button style={{ color: '#0f94d0' }} onClick={() => handleUnSubscribe()} autoFocus>
                            Unsubscribe
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className='videoMetaData__description'>
                <ShowMoreText
                    lines={3}
                    more='Show More'
                    less='Show Less'
                    anchorClass='showMoreText'
                    expanded={false}>
                    {description}
                </ShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData
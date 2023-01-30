import React, { useEffect } from 'react'
import './_VideoMetaData.scss'
import moment from 'moment'

import { MdThumbUp, MdThumbDown } from 'react-icons/md'
import ShowMoreText from 'react-show-more-text'
import { useDispatch, useSelector } from 'react-redux'
import {
    checkSubscriptionStatus,
    getchannelDetails,
} from '../../redux/actions/channel.action'
import HelmetCustom from '../HelmetCustom'
import { useHistory } from 'react-router-dom'
const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
    const { channelId, channelTitle, description, title, publishedAt } = snippet
    const { viewCount, likeCount, dislikeCount } = statistics

    const dispatch = useDispatch()

    const history = useHistory()


    useEffect(() => {
        console.log(channelId)
        dispatch(getchannelDetails(channelId))
        dispatch(checkSubscriptionStatus(channelId))
    }, [dispatch, channelId])

    const {
        snippet: channelSnippet,
        statistics: channelStatistics,
    } = useSelector(state => state.channelDetails.channel)

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


    return (
        <div className='py-2 videoMetaData'>
            <HelmetCustom title={title} description={description} />

            <div className='videoMetaData__top'>
                <h5>{title}</h5>
                <div className='py-1 d-flex justify-content-between align-items-center'>
                    <span>
                        {numeral(viewCount)} Views •{' '}
                        {moment(publishedAt).fromNow()}
                    </span>

                    <div>
                        <span className='mr-3'>
                            <MdThumbUp size={26} /> {numeral(likeCount)}
                        </span>
                        <span className='mr-3'>
                            <MdThumbDown size={26} />{' '}
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
                        <span>{channelTitle}</span>
                        <span>
                            {' '}
                            {numeral(channelStatistics?.subscriberCount)}{' '}
                            Subscribers
                        </span>
                    </div>
                </div>

                <button
                    className={`p-2 m-2 border-0 btn ${subscriptionStatus && 'btn-gray'
                        }`}>
                    {subscriptionStatus ? 'Subscribed' : 'Subscribe'}
                </button>
            </div>
            <div className='videoMetaData__description'>
                <ShowMoreText
                    lines={3}
                    more='SHOW MORE'
                    less='SHOW LESS'
                    anchorClass='showMoreText'
                    expanded={false}>
                    {description}
                </ShowMoreText>
            </div>
        </div>
    )
}

export default VideoMetaData
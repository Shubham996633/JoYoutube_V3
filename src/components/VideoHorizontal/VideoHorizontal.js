import React, { useEffect, useState } from 'react'
import './_VideoHorizontal.scss'

import { AiFillEye } from 'react-icons/ai'
import request from '../../apiCall'

import moment from 'moment'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Col, Row } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

const VideoHorizontal = ({ video, SearchScreen, subScreen, likedScreen }) => {
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { high },
            resourceId,
        },
    } = video


    const isVideo = !(id.kind === 'youtube#channel' || subScreen)

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)
    var videoIds = ''
    if (likedScreen) {
        videoIds = id
    } else {
        videoIds = id.videoId
    }
    useEffect(() => {
        const get_video_details = async () => {
            const {
                data: { items },
            } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: videoIds,
                },
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        if (isVideo) get_video_details()
    }, [id, isVideo])

    useEffect(() => {
        const get_channel_icon = async () => {
            const {
                data: { items },
            } = await request('/channels', {
                params: {
                    part: 'snippet',
                    id: channelId,
                },
            })
            setChannelIcon(items[0].snippet.thumbnails.default)
        }
        get_channel_icon()
    }, [channelId])

    const seconds = moment.duration(duration).asSeconds()
    const _duration = moment.utc(seconds * 1000).format('mm:ss')

    const history = useHistory()

    const _channelId = resourceId?.channelId || channelId

    const handleClick = () => {
        isVideo
            ? history.push(`/watch/${videoIds}`)
            : history.push(`/channel/${_channelId}`)
        { window.scrollTo(0, 0) }
    }

    const thumbnail = !isVideo && 'videoHorizontal__thumbnail-channel'


    const numeral = (vcount) => {
        if (vcount > 1000 && vcount < 1000000) {
            vcount = (vcount / 1000).toFixed(1) + 'K'
        } else if (vcount > 1000000 && vcount < 1000000000) {
            vcount = (vcount / 1000000).toFixed(0) + 'M'
        } else if (vcount > 1000000000) {
            vcount = (vcount / 1000000000).toFixed(0) + 'B'
        }

        return vcount;
    }
    return (
        <Row
            className='py-2 m-1 videoHorizontal align-items-center'
            onClick={handleClick}>
            <Col
                xs={6}
                md={SearchScreen || subScreen || likedScreen ? 4 : 6}
                className='videoHorizontal__left'>
                <LazyLoadImage
                    src={high.url}
                    effect='blur'
                    className={`videoHorizontal__thumbnail ${thumbnail} `}
                    wrapperClassName='videoHorizontal__thumbnail-wrapper'
                />
                {isVideo && (
                    <span className='videoHorizontal__duration'>{_duration}</span>
                )}
            </Col>
            <Col
                xs={6}
                md={SearchScreen || subScreen || likedScreen ? 8 : 6}
                className='p-0 videoHorizontal__right'>
                <p className='mb-1 videoHorizontal__title'>{title}</p>

                {isVideo && (
                    <div className='videoHorizontal__details'>
                        <AiFillEye /> {numeral(views)} Views • {' '}
                        {moment(publishedAt).fromNow()}
                    </div>
                )}

                {(SearchScreen || subScreen || likedScreen) && (
                    <p className='mt-1 videoHorizontal__desc'>{description}</p>
                )}

                <div className='my-1 videoHorizontal__channel d-flex align-items-center'>
                    {isVideo && (
                        <LazyLoadImage src={channelIcon?.url} effect='blur' />
                    )}
                    <p className='mb-0'>{channelTitle}</p>
                </div>
                {subScreen && (
                    <p className='mt-2'>
                        {video.contentDetails.totalItemCount} Videos
                    </p>
                )}
            </Col>
        </Row>
    )
}

export default VideoHorizontal
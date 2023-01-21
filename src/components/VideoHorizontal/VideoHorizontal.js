import React, { useState, useEffect } from 'react'
import './_VideoHorizontal.scss'
import { AiFillEye } from 'react-icons/ai'
import request from '../../apiCall'
import moment from 'moment/moment'
import numeral from 'numeral'
import { Row, Col } from 'react-bootstrap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useHistory } from 'react-router-dom'
const VideoHorizontal = ({ video }) => {

    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)
    const [channelIcon, setChannelIcon] = useState(null)
    const {
        id,
        snippet: {
            channelId,
            channelTitle,
            description,
            title,
            publishedAt,
            thumbnails: { high },
        },

    } = video


    useEffect(() => {
        const get_video_details = async () => {
            const { data: { items } } = await request('/videos', {
                params: {
                    part: 'contentDetails,statistics',
                    id: id.videoId,

                },
            })
            setDuration(items[0].contentDetails.duration)
            setViews(items[0].statistics.viewCount)
        }
        get_video_details()
    }, [id])

    useEffect(() => {
        const get_channel_icon = async () => {
            const { data: { items } } = await request('/channels', {
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
    const handleClick = () => {
        history.push(`/watch/${id.videoId}`)

    }
    return (
        <Row className="videoHorizontal m-1 py-2 align-align-items-center" onClick={
            handleClick
        }>
            <Col xs={6} md={5} className="videoHorizontal__left">
                <LazyLoadImage wrapperClassName="videoHorizontal__thumbnail-wrapper" className="videoHorizontal__thumbnail" src={high.url} effect="blur" />
                <span className='videoHorizontal__duration'>{_duration}</span>

            </Col>
            <Col xs={6} md={6} className="videoHorizontal__right p-0">
                <p className='videoHorizontal__title mb-1'>
                    {title}
                </p>

                <div className='videoHorizontal__details'>
                    <span>
                        <AiFillEye /> {numeral(views).format('0.a')} Views • {moment(publishedAt).fromNow()}
                    </span>
                </div>

                <div className='videoHorizontal__channel d-flex align-items-center my-1'>
                    <LazyLoadImage src='https://yt3.ggpht.com/dxED1O-r5cRS73JBlUk4VS3pZHDfiHcuRjRbFMcf6KgYhxP4NUlD7x0h4TR1XTXkl-JGjTPTYQ=s88-c-k-c0x00ffffff-no-rj' effect="blur" />
                    <p className='mb-0'>
                        {channelTitle}
                    </p>
                </div>

            </Col>

        </Row>
    )
}

export default VideoHorizontal
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getVideoByChannel } from '../../../redux/actions/videos.action'
import './_ChannelScreen.scss'
const ChannelScreen = () => {
    const dispatch = useDispatch()
    const { channelId } = useParams()
    useEffect(() => {
        dispatch(getVideoByChannel(channelId))
    }, [dispatch], channelId)
    return (
        <div>ChannelScreen</div>
    )
}

export default ChannelScreen
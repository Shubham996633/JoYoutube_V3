import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSubscribedChannels } from '../../../redux/actions/videos.action'
import './_SubscriptionScreen.scss'
const SubscriptionScreen = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribedChannels())
    }, [dispatch])
    return (
        <div>SubscriptionScreen</div>
    )
}

export default SubscriptionScreen
// 5:38:24
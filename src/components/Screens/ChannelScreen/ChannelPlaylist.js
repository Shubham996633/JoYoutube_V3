import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getChannelPlaylist } from '../../../redux/actions/channel.action'

const ChannelPlaylist = ({channelId}) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getChannelPlaylist(channelId))
    },[dispatch, channelId]);
    const {loading, playlists, nextPageToken} =useSelector(state=>state.getChannelPlaylist)
    console.log(playlists)
  return (
    <div>ChannelPlaylist</div>
  )
}

export default ChannelPlaylist
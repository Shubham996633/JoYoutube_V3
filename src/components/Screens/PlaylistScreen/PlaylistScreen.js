import React from 'react'
import { useParams } from 'react-router-dom'

const PlaylistScreen = ({ item }) => {

    const { playlistId } = useParams()
    console.log(item)
    return (
        <div>PlaylistScreen playlistId {playlistId}</div>
    )
}

export default PlaylistScreen
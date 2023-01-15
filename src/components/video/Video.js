import React from 'react'
import './_video.scss'
import { AiFillEye } from 'react-icons/ai'
const Video = () => {
    return (
        <div className='video'>
            <div className='video__top'>
                <img src='https://i.ytimg.com/vi/tDhENbk65bE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDMQPCpIhSGHtr4W3xgawSBy_xDsQ' alt='' />
                <span>03:21</span>

            </div>
            <div className='video__title'>Piya Tose Naina Laage Re (Cover) - Jonita Gandhi feat. Keba Jeremiah & Sanket Naik</div>
            <div className='video__details'>
                <span>
                    <AiFillEye /> 14M Views • </span>
                <span className='time'>  4 years ago</span>
            </div>
            <div className='video__channel'>
                <img src='https://yt3.ggpht.com/ytc/AMLnZu_Y7PTfuKgvrrphSGmhku1j5EqIls9l3btuz5l4=s88-c-k-c0x00ffffff-no-rj' alt='' />
                <p>Jonitamusic</p>
            </div>

        </div>
    )
}

export default Video
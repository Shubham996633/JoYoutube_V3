import numeral from 'numeral'
import React from 'react'
import { AiFillEye } from 'react-icons/ai'
import './_VideoMetaData.scss'
import moment from 'moment'
import { MdThumbDown, MdThumbUp } from 'react-icons/md'

const VideoMetaData = () => {
    return (
        <div className='videoMetaData py-2'>
            <div className='videoMetaData__top'>
                <h5>Video Title</h5>
                <div className='d-flex justify-content-between align-items-center py-1'>
                    <span>
                        {numeral(369369369).format('0.a')} Views • </span>
                    <span className='time'>  {moment('2020-06-06').fromNow()}</span>

                </div>
            </div>
            <div>

                <span>
                    <MdThumbUp size={26} />
                    {numeral(369369369).format('0.a')}

                </span>
                <span>
                    <MdThumbDown size={26} />
                    {numeral(0).format('0.a')}

                </span>
            </div>
            <div className='videoMetaData__channel'></div>
            <div className='videoMetaData__description'></div>

        </div>
    )
}

export default VideoMetaData
// 3:31:00
import moment from 'moment/moment'
import React from 'react'
import './_comment.scss'
const Comment = () => {
    return (
        <div className='comment p-2 d-flex'>
            <img src="https://yt3.ggpht.com/ytc/AMLnZu_Y7PTfuKgvrrphSGmhku1j5EqIls9l3btuz5l4=s88-c-k-c0x00ffffff-no-rj" alt="" className='rounded-circle mr-3' />
            <div className='comment__body'>
                <p className='comment__header mb-1'>
                    Shubham Maurya • {moment(9999).fromNow()}
                </p>
                <p className='mb-0'>My Favourite Singer</p>
            </div>
        </div>
    )
}

export default Comment
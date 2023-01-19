import React from 'react'
import './_Comments.scss'
import Comment from '../comment/Comment'
const Comments = () => {

    const handleComment = () => {

    }
    return (
        <div className='comments'>


            <p>369 Comments</p>
            <div className='comments__form d-flex w-100 my-2'>
                <img src="https://yt3.ggpht.com/yti/AJo0G0mswRqeSCaPK1wYyAy1erB3WAzsmGVv-8JOGfL7=s88-c-k-c0x00ffffff-no-rj" alt="" className='rounded-circle mr-3' />
                <form onSubmit={handleComment} className="d-flex flex-grow-1">
                    <input type="text" className='flex-grow-1' placeholder='Add A Comment' />
                    <button className='border-0 p-2'>Comment</button>
                </form>
            </div>
            <div className='comments__list'>
                {[...Array(15)].map(() => (
                    <Comment />
                ))}
            </div>
        </div>
    )
}

export default Comments
import React, { useEffect } from 'react'
import './_Comments.scss'

import Comment from '../comment/Comment'
import { useDispatch, useSelector } from 'react-redux'
import { getCommentsOfVideoById } from '../../redux/actions/comments.action'
const Comments = ({ videoId }) => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCommentsOfVideoById(videoId))
    }, [videoId, dispatch])
    const handleComment = () => { }

    const comments = useSelector(state => state.commentList.comments)

    const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet)


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
                {_comments.map((comment, i) => (
                    <Comment comment={comment} key={i} />
                ))}
            </div>
        </div>
    )
}

export default Comments
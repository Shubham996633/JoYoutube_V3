import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addComment,
    getCommentsOfVideoById,
} from '../../redux/actions/comments.action'
import Comment from '../comment/Comment'
import './_Comments.scss'
import InfiniteScroll from 'react-infinite-scroll-component'
const Comments = ({ videoId, totalComments,channelIcon, channelName }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCommentsOfVideoById(videoId,null,null))
    }, [videoId, dispatch])

    const {comments,nextPageToken} = useSelector(state => state.commentList)
    const { photoURL } = useSelector(state => state.auth?.user)

    const [text, setText] = useState('')

    const _comments = comments?.map(
        comment => comment.snippet.topLevelComment.snippet
    )
    // console.log(nextPageToken)
    // console.log(comments)

    const handleComment = e => {
        e.preventDefault()
        if (text.length === 0) return

        dispatch(addComment(videoId, text))
        setText('')
    }
    const fetchData = () => {
      
            dispatch(getCommentsOfVideoById(videoId,nextPageToken,null))
        

    }
    
    

    return (
        <div className='comments'>
            <p>{totalComments} Comments</p>
            <div className='my-2 comments__form d-flex w-100'>
                <img src={photoURL} alt='avatar' className='mr-3 rounded-circle' />
                <form className='d-flex flex-grow-1'>
                    <input
                        type='text'
                        className='flex-grow-1'
                        placeholder='Write a comment...'
                        value={text}
                        onChange={e => setText(e.target.value)}
                    />
                    <button className='p-2 border-0' onClick={handleComment}>Comment</button>
                </form>
            </div>

            <InfiniteScroll
        dataLength={_comments.length}
        next={fetchData}
        hasMore={true}
        loader={
            <div className='spinner-border text-danger d-block mx-auto'></div>
        }
        className='row'>
            <div className='comments__list'>
                {_comments?.map((comment, i) => (
                    <Comment comment={comment} key={i} channelIcon={channelIcon} channelName ={channelName}/>
                ))}
            </div>
            </InfiniteScroll>
        </div>
    )
}

export default Comments
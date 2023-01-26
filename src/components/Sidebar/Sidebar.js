import React from 'react'
import './_sidebar.scss';
import { MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { log_out } from '../../redux/actions/auth.action';
import { useHistory } from 'react-router-dom';
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const logoutHandler = () => {
        dispatch(log_out())
        history.push('/auth')
    }
    const handleClickHome = () => {
        history.push('/')
    }
    const handleClickSubs = () => {
        history.push('/feed/subscriptions')
    }
    const handleLiked = () => {
        history.push('/likedVideos')
    }
    return (
        <nav className={sidebar ? 'sidebar open' : 'sidebar'}
            onClick={() => handleToggleSidebar(false)}>
            <li title='Home' onClick={handleClickHome}>
                <MdHome size={23} />
                <span>Home</span>
            </li>


            <li title='Subscriptions' onClick={handleClickSubs}>
                <MdSubscriptions size={23} />
                <span>Subscriptions</span>
            </li>


            <li title='Liked Video' onClick={handleLiked}>
                <MdThumbUp size={23} />
                <span>Liked Video</span>
            </li>

            <li title='History'>
                <MdHistory size={23} />
                <span>History</span>
            </li>

            <li title='Library'>
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </li>
            <li title='I dont Know'>
                <MdSentimentDissatisfied size={23} />
                <span>I don't Know</span>
            </li>

            <hr />

            <li title='Log Out' onClick={logoutHandler}>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </li>

            <hr />

        </nav>
    )
}

export default Sidebar
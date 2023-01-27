import React, { useEffect } from 'react'
import './_sidebar.scss';
import { MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { log_out } from '../../redux/actions/auth.action';
import { useHistory } from 'react-router-dom';
import { getAllPlaylist } from '../../redux/actions/channel.action';
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    useEffect(() => {
        dispatch(getAllPlaylist())
    }, [dispatch])
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
    const handlePlaylist = (id) => {
        console.log(id)
    }



    const { playlist } = useSelector(state => state.playlistItems)
    const items = playlist.playlists
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



            <li title='Library'>
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </li>

            {
                items.map(item => (

                    <li title='Library' onClick={handlePlaylist(item.id)}>
                        <MdLibraryBooks size={23} />
                        <span>{item.snippet.title}</span>
                    </li>



                ))
            }



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
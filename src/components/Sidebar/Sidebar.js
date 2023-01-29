import React, { useEffect } from 'react'
import './_sidebar.scss';
import { MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { log_out } from '../../redux/actions/auth.action';
import { useHistory } from 'react-router-dom';
import { getAllPlaylist } from '../../redux/actions/channel.action';
import PlaylistScreen from '../Screens/PlaylistScreen/PlaylistScreen';
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
    const dispatch = useDispatch()

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





    const { playlist } = useSelector(state => state.playlistItems)
    const handlePlaylist = (id) => {
        history.push(`playlist/${id}`)
    }
    const history = useHistory()
    const handleLibrary = () => {
        history.push('/library')
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



            <li title='Library' onClick={handleLibrary}>
                <MdLibraryBooks size={23} />
                <span>Library</span>
            </li>


            {/* {



                playlist.map(item => (

                    <li title={item.snippet.title} key={item.id} onClick={(e) => handlePlaylist(item.id)}>
                        <MdLibraryBooks size={23} />
                        <span >

                            {item.snippet.title.length > 15 ? item.snippet.title.substring(0, 15) + '...' : item.snippet.title}</span>
                    </li>



                ))


            }
            {
                playlist.map(item => {
                    <PlaylistScreen item={item} key={item.id} />
                })
            } */}



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
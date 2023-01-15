import React from 'react'
import './_sidebar.scss';
import { MdSubscriptions, MdExitToApp, MdThumbUp, MdHistory, MdLibraryBooks, MdHome, MdSentimentDissatisfied } from 'react-icons/md';
const Sidebar = ({ sidebar, handleToggleSidebar }) => {
    return (
        <nav className={sidebar ? 'sidebar open' : 'sidebar'}
            onClick={() => handleToggleSidebar(false)}>
            <li title='Home'>
                <MdHome size={23} />
                <span>Home</span>
            </li>


            <li title='Subscriptions'>
                <MdSubscriptions size={23} />
                <span>Subscriptions</span>
            </li>


            <li title='Liked Video'>
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

            <li title='Log Out'>
                <MdExitToApp size={23} />
                <span>Log Out</span>
            </li>

            <hr />

        </nav>
    )
}

export default Sidebar
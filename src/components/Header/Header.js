import React from 'react'
import './_header.scss'

import { FaBars } from 'react-icons/fa'
import icon from '../Images/icon.png'
import avatar from '../Images/avatar.jpg'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
const Header = ({ handleToggleSidebar }) => {
    return (
        <div className='header'>
            <FaBars
                className='header__menu'
                size={26}
                onClick={() => handleToggleSidebar()}

            />
            <img
                src={icon}
                alt=''
                className='header__logo'
                title='Youtube Home'
            />

            <form>
                <input type='text' placeholder='Search' />
                <button type='submit' title="Search">
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className='header__icons'>
                <MdNotifications size={28} className="notify" title='Notifications' />
                <MdApps size={28} className="apps" title='Apps' />
                <img
                    src={avatar}
                    alt='avatar'
                    className="avatar"
                />
            </div>
        </div>
    )
}

export default Header
import React, { useState } from 'react'
import './_header.scss'

import { FaBars } from 'react-icons/fa'
import icon from '../Images/icon.png'
import avatar from '../Images/avatar.jpg'
import { AiOutlineSearch } from 'react-icons/ai'
import { MdNotifications, MdApps } from 'react-icons/md'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
const Header = ({ handleToggleSidebar }) => {
    const [input, setInput] = useState('')

    const history = useHistory()

    const handleSubmit = e => {
        e.preventDefault()

        history.push(`/search/${input}`)
    }
    let tagArr = document.getElementsByTagName("input");
    for (let i = 0; i < tagArr.length; i++) {
      tagArr[i].autocomplete = 'off';
    }

    const handleHome = e => {

        history.push(`/`)
    }
    const user = useSelector(state => state.auth?.user)

    return (
        <div className='header '>
            <FaBars
                className='header__menu'
                size={26}
                onClick={() => handleToggleSidebar()}
            />

            <img
                src={icon}
                alt=''
                className='header__logo'
                onClick={handleHome}
            />

            <form onSubmit={handleSubmit}>
                <input
                    type='text'
                    placeholder='Search'
                    value={input}
                    autocomplete="off"
                    onChange={e => setInput(e.target.value)}
                />
                <button type='submit'>
                    <AiOutlineSearch size={22} />
                </button>
            </form>

            <div className='header__icons'>
                <MdNotifications size={28} />
                <MdApps size={28} />
                <img src={user?.photoURL} alt='avatar' />
            </div>
        </div>
    )
}

export default Header
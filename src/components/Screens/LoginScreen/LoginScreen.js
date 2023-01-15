import React from 'react'
import './loginScreen.scss'
import youtube from '../../Images/youtube.png'
const LoginScreen = () => {
    return (
        <div className='login'>
            <div className='login__container'>
                <img src={youtube} alt='' />
                <button>Login with Google</button>
                <p>This Project is developed by using Youtube Data API</p>
            </div>
        </div>
    )
}

export default LoginScreen
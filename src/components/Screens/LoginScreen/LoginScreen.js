import React, { useEffect } from 'react'
import './loginScreen.scss'
import youtube from '../../Images/youtube.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../../redux/actions/auth.action'
import { useHistory } from 'react-router-dom'
import { Button } from '@mui/material'
const LoginScreen = () => {

    const dispatch = useDispatch()

    const accessToken = useSelector(state => state.auth.accessToken)

    const handleLogin = () => {
        dispatch(login())
    }
    const history = useHistory()

    useEffect(() => {
        if (accessToken) {
            history.push('/')

        }
    }, [accessToken, history])
    return (
        <div className='login'>
            <div className='login__container'>
                <img src={youtube} alt='' />
                <Button size= "large" variant="contained" onClick={handleLogin}>Login with Google</Button>
                <p>This Project is developed by using Youtube Data API</p>
            </div>
        </div>
    )
}

export default LoginScreen
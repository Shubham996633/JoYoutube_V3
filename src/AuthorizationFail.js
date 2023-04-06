import React from 'react'
import offlineImage from './img/offline.png'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { log_out } from './redux/actions/auth.action'
import Button from 'react-bootstrap/Button';

const AuthorizationFail = () => {
    const history = useHistory()
    const dispatch = useDispatch()
const handleClick =() =>{
    dispatch(log_out())
    history.push('/auth')
    window.reload()

    }
  return (
    <div className="offline-message" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <img src={offlineImage} style={{height:'300px',height:'300px', margin:'3rem', marginTop:'20vh'}}/>
    <h2>Authorization Token Fail</h2>
    <p>We condemn for that, Please Click on Button To return to Login Page.</p>
    <Button variant="info"onClick={()=>handleClick()}>Return to Login </Button>

    
    </div>
  )
}

export default AuthorizationFail
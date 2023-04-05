import React from 'react'
import offlineImage from './img/offline.png'

const ApiFull = () => {
  return (
    <div className="offline-message" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <img src={offlineImage} style={{height:'300px',height:'300px', margin:'3rem', marginTop:'20vh'}}/>
    <h3>Sorry</h3>
    <p>Our's API has ran off the daily Request.</p>
    <p>We condemn for that, Please try after some time.</p>
    </div>
  )
}

export default ApiFull
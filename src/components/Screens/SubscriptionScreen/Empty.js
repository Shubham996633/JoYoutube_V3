import React from 'react'
import offlineImage from '../../../img/offline.png'
const Empty = () => {
  return (
    <div className="offline-message" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <img src={offlineImage} style={{height:'300px',height:'300px', margin:'3rem', marginTop:'15vh'}}/>
    <h3>No Subscribed Channels Found</h3>
    <p>You not had subscribed any channel.</p>
    <p>Subscribed any channel by this clone and it will be added ti your account.</p>
    </div>
  )
}

export default Empty
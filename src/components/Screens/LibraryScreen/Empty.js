import React from 'react'
import offlineImage from '../../../img/offline.png'
const Empty = () => {
  return (
    <div className="offline-message" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <img src={offlineImage} style={{height:'300px',height:'300px', margin:'3rem', marginTop:'15vh'}}/>
    <h3>No Playlist Found</h3>
    <p>You don't have any Playlist in your YouTube account.</p>
    </div>
  )
}

export default Empty
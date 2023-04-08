import React from 'react'
import offlineImage from '../../../img/offline.png'
const Empty = () => {
  return (
    <div className="offline-message" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
    <img src={offlineImage} style={{height:'300px',height:'300px', margin:'3rem', marginTop:'15vh'}}/>
    <h3>No Like Videos Found</h3>
    <p>You not had like any video.</p>
    <p> Like any video by this clone and it added to your account.</p>
    </div>
  )
}

export default Empty
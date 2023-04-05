import React from 'react'
import offlineImage from './img/offline.png'
const Offline = () => {
    return (
      <div className="offline-message" style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <img src={offlineImage} style={{height:'300px',height:'300px', margin:'3rem', marginTop:'20vh'}}/>
      <h3>Connect to the internet</h3>
      <p>You are offline. Check your connection.</p>
      <p>We will take you back to your page when your connection is back</p>
      </div>
    );
  };

export default Offline
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import './_app.scss'
import LoginScreen from './components/Screens/LoginScreen/LoginScreen'
import SearchScreen from './components/Screens/SearchScreen/SearchScreen'
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import HomeScreen from './components/Screens/Homescreen/HomeScreen'
import { useSelector } from 'react-redux'
import WatchScreen from './components/Screens/WatchScreen/WatchScreen'
import SubscriptionsScreen from './components/Screens/SubscriptionScreen/SubscriptionScreen'
import ChannelScreen from './components/Screens/ChannelScreen/ChannelScreen'
import LikedScreen from './components/Screens/LikedScreen/LikedScreen'
import PlaylistScreen from './components/Screens/PlaylistScreen/PlaylistScreen'
import LibraryScreen from './components/Screens/LibraryScreen/LibraryScreen'
import Offline from './Offline'
import ApiFull from './ApiFull'
import AuthorizationFail from './AuthorizationFail'
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(true)
  
  const handleToggleSidebar = () => toggleSidebar(value => !value)

  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container'>
        <Sidebar
          sidebar={sidebar}
          handleToggleSidebar={handleToggleSidebar}
        />
        <Container fluid className='app__main '>
          {children}
        </Container>
      </div>
    </>
  )
}
const App = () => {

  const { accessToken, loading } = useSelector(state => state.auth)

  const history = useHistory()

  useEffect(() => {
    if (!loading && !accessToken) {
      history.push('/auth')

    }

  }, [accessToken, loading, history])
 

  const [isOnline, setIsOnline] = React.useState(navigator.onLine);

  React.useEffect(() => {
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  function handleOffline() {
    setIsOnline(false);
  }

  function handleOnline() {
    setIsOnline(true);
  }
  const {error} = useSelector(state=>state.channelDetails)
  const {error1} = useSelector(state=>state.homeVideos)
  const {error4} = useSelector(state=>state.relatedVideos)
  const {error5} = useSelector(state=>state.searchedVideos)
  const {error6} = useSelector(state=>state.channelVideos)
  const {error7} = useSelector(state=>state.likedVideos)
 

  if(error?.code === 403||
    error1?.code === 403||
    error4?.code === 403||
    error5?.code === 403||
    error6?.code === 403||
    error7?.code === 403
    ){
    return(
      <ApiFull/>
    )
  }

  if(error?.code === 401||
    error1?.code === 401||
    error4?.code === 401||
    error5?.code === 401||
    error6?.code === 401||
    error7?.code === 401
    ){
    return(
      <AuthorizationFail/>
    )
  }
  return (
    <div>
    {isOnline ? (
      /* Render your main app components here */
      <Switch>
      <Route path='/' exact>
        <Layout>
          <HomeScreen />
        </Layout>
      </Route>

      <Route path='/auth'>
        <LoginScreen />
      </Route>

      <Route path='/search/:query'>
        <Layout>
          <SearchScreen />
        </Layout>
      </Route>
      <Route path='/watch/:id'>
        <Layout>
          <WatchScreen />
        </Layout>
      </Route>

      <Route path='/feed/subscriptions'>
        <Layout>
          <SubscriptionsScreen />
        </Layout>
      </Route>
      <Route path='/playlist/:playlistId'>
        <Layout>
          <PlaylistScreen />
        </Layout>
      </Route>
      <Route path='/channel/:channelId'>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route>



      <Route path='/likedVideos'>
        <Layout>
          <LikedScreen />
        </Layout>
      </Route>


      <Route path='/library'>
        <Layout>
          <LibraryScreen />
        </Layout>
      </Route>

      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
    ) : (
      <Offline />
    )}
  </div>
   

  )

}

export default App
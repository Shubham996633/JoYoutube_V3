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
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)

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


  return (
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

  )

}

export default App
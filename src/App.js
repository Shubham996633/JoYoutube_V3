import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Homescreen from './components/Screens/HomeScreen'
import './_app.scss'
import LoginScreen from './components/Screens/LoginScreen/LoginScreen'

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

const Layout = (children) => {

  const [sidebar, toggleSidebar] = useState(false)

  const handleToggleSidebar = () => toggleSidebar(value => !value)
  return (

    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container'>
        <Sidebar sidebar={sidebar} handleToggleSidebar={handleToggleSidebar} />
        <Container fluid className='app_main'>
          {children}
        </Container>
      </div>

    </>
  )
}
const App = () => {

  return (
    <Switch>
      <Route path='/' exact>
        <Layout>
          <Homescreen />
        </Layout>
      </Route>

      <Route path='/auth'>
        <LoginScreen />
      </Route>

      {/* <Route path='/search/:query'>
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
      <Route path='/channel/:channelId'>
        <Layout>
          <ChannelScreen />
        </Layout>
      </Route> */}

      <Route>
        <Redirect to='/' />
      </Route>
    </Switch>
  )

}

export default App
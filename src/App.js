import React from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Homescreen from './components/Screens/HomeScreen'
const App = () => {
  return (
    <>
      <Header />
      <div className='app_container'>
        <Sidebar />
        <Container fluid className='app_main'>
          <Homescreen />
        </Container>
      </div>
    </>
  )
}

export default App
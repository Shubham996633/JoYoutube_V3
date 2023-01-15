import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Homescreen from './components/Screens/HomeScreen'
import './_app.scss'
const App = () => {

  const [sidebar, toggleSidebar] = useState(false)

  const handleToggleSidebar = () => toggleSidebar(value => !value)
  return (
    <>
      <Header handleToggleSidebar={handleToggleSidebar} />
      <div className='app__container border border-info'>
        <Sidebar sidebar={sidebar} />
        <Container fluid className='app_main border boder-warning'>
          <Homescreen />
        </Container>
      </div>
    </>
  )
}

export default App
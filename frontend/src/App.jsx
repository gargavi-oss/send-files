import React, { useContext } from 'react'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Send from './components/Send'
import Receive from './components/Receive'
import Bottom from './components/Bottom'
import {Helmet} from "react-helmet"
import ThemeContext from './context/ThemeContext'
const App = () => {
 
  return (
    <div>

       <Helmet>
            <title>Send Files - Files Everywhere</title>
            <link rel="icon" type="image/png" href="./public/logo.png" />
          </Helmet>
      <Navbar/>
      <Home/>
      <Send/>
      <Receive/>
      <Bottom/>
    </div>
  )
}

export default App
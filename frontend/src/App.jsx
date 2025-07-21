import React from 'react'
import FileUpload from './components/FileUpload'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Send from './components/Send'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <Send/>
      <FileUpload/>
    </div>
  )
}

export default App
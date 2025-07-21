import React from 'react'
import FileUpload from './components/FileUpload'
import Navbar from './components/Navbar'
import Home from './components/Home'

const App = () => {
  return (
    <div>
      <Navbar/>
      <Home/>
      <FileUpload/>
    </div>
  )
}

export default App
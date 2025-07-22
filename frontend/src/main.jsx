import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FileReceived from './components/FileReceived.jsx'
import About from './components/About.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/fileReceived' element={<FileReceived/>}/>
    <Route path='/' element={<App/>}/>
    <Route path='/about' element={<About/>}/>
    </Routes>
   
    </BrowserRouter>
  </StrictMode>,
)

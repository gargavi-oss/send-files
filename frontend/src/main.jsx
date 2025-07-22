import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import FileUpload from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import FileReceived from './components/FileReceived.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/fileReceived' element={<FileReceived/>}/>
    <Route path='/' element={<App/>}/>
    </Routes>
   
    </BrowserRouter>
  </StrictMode>,
)

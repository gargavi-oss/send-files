import React, { useEffect, useState } from 'react'
import ThemeContext from './ThemeContext';

const ThemeProvider = ({children}) => {
    const [theme,setTheme] = useState(()=>{
      return localStorage.getItem("theme") || 'light'
    });
    useEffect(()=>{
      localStorage.setItem("theme",theme)
    })
    const toggleTheme = ()=>{
        setTheme(theme==='light' ? 'dark': 'light' )
    }
  return (
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import "highlight.js/styles/github-dark.css";
import "@fontsource/mona-sans";
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)

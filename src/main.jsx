import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import { PathProvider } from './contexts/PathContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <PathProvider>
        <App />
      </PathProvider>
    </Router>
  </StrictMode>,
)

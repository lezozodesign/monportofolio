import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/familjen-grotesk';
import '@fontsource/dm-sans';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

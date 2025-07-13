import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

console.log('Telegram WebApp:', window.Telegram.WebApp);

const tg = window.Telegram.WebApp;
console.log('User data:', tg.initDataUnsafe.user);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

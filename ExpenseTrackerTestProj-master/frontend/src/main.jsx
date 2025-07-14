import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

if (typeof window.Telegram !== 'undefined' && window.Telegram.WebApp) {
  console.log('✅ Telegram WebApp:', window.Telegram.WebApp);
  console.log('👤 User data:', window.Telegram.WebApp.initDataUnsafe?.user);
} else {
  console.warn('⚠️ Telegram WebApp SDK недоступен. Открой через Telegram!');
}

createRoot(document.getElementById('root')).render(
  <App />
);

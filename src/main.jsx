import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// ─────────────────────────────────────────────────────────────
//  Storage adapter
//  The Claude artifact used window.storage (cloud-based).
//  In the native app we use localStorage — same API surface.
// ─────────────────────────────────────────────────────────────
window.storage = {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) throw new Error('not found');
      return { key, value };
    } catch {
      throw new Error('not found');
    }
  },
  async set(key, value) {
    localStorage.setItem(key, value);
    return { key, value };
  },
  async delete(key) {
    localStorage.removeItem(key);
    return { key, deleted: true };
  },
  async list(prefix = '') {
    const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
    return { keys };
  },
};

// Register service worker for offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

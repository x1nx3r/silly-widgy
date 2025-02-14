import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter, Routes, Route } from 'react-router-dom'
import App from '@renderer/App'
import SettingsPage from '@renderer/components/SettingsPage'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
)

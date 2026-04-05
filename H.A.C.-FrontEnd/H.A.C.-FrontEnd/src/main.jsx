import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './estilos/global.css'

/**
 * Ponto de entrada principal da aplicação React
 */
createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

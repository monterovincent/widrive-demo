// main.jsx — the entry point of the entire app
// This is the file that actually boots React and injects it into the HTML page

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// This line is CRITICAL — it imports our CSS including the Tailwind directives
// Without this import, zero styles apply — which is exactly what you're seeing
import './index.css'

import App from './App.jsx'

// This finds the <div id="root"> in index.html and renders our entire App inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
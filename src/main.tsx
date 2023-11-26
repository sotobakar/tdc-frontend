import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app'
import './styles/globals.less'
import './i18n/config'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)

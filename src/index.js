import ReactDOM from 'react-dom/client';
import React from 'react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter as Router } from 'react-router-dom'

import './_base.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <App />
    </Router>

)
// import ReactDOM from 'react-dom'
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'

import React from 'react'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router } from 'react-router-dom'

import './_base.scss'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(

    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>);

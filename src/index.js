import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom'

import './index.scss';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Router>
        <nav>
          <h2>TGB</h2>
          <Link id='link' to="/">Home</Link>
        </nav>
        <Routes>
          <Route path='/' element = {<App />}/>
        </Routes>
      </Router>
  </React.StrictMode>
);


import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import GetBlogProvider from './Context/GetBlogProvider';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GetBlogProvider>
    <App />
    </GetBlogProvider>
  </React.StrictMode>
);



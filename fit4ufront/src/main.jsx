import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CLIENT_ID } from './Constants/Constants.js';

ReactDOM.render(
  <GoogleOAuthProvider clientId="218979441807-vqp0lda53qd3dfdkvqcti2mgjbn3obs1.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './featured/store';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Picker } from "emoji-mart"
import axios from "axios"

axios.defaults.withCredentials = true;

new Picker({
  data: async () => {
    const response = await fetch(
      'https://cdn.jsdelivr.net/npm/@emoji-mart/data',
    )

    return response.json()
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <HelmetProvider>
          <ToastContainer />
          <App />
        </HelmetProvider>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();

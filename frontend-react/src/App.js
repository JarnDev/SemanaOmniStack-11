import React from 'react';
import Routes from './routes'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

toast.configure({
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeButton:false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true
  })

function App() {
  return (
      <Routes/>
  );
}

export default App;

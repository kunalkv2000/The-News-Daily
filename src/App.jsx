import React from "react";
import { NotificationProvider } from "./context/NotificationContext";
import AuthProvider from "./context/AuthContext";

import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStateProvider } from '../src/context/GlobalStateContext'

import RouterComponent from './router';
import Navbar from "./components/Navbar";

import Footer from './components/Footer';

import './index.css';



const App = () => {
  return (
    <NotificationProvider>
  
    <GlobalStateProvider>
    <AuthProvider>
        <Router>
          {/* Main Layout */}
          <Navbar />
          <div className="main-content">
            <RouterComponent />
          </div>
          <Footer />
        </Router>
        </AuthProvider>
    </GlobalStateProvider>
    
    </NotificationProvider>
  );
};

export default App;




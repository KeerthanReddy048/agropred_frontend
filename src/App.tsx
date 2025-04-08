import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import PredictionPage from './components/PredictionPage';
import SpikeDetection from './components/SpikeDetection';
import LoginPage from './components/LoginPage';
import { AuthProvider } from './context/AuthContext';
import SNPInfo from './components/SNPInfo';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#f8faf7]">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/PredictionPage" element={<PredictionPage />} />
            <Route path="/SpikeDetection" element={<SpikeDetection />} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/SNPInfo" element={<SNPInfo/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
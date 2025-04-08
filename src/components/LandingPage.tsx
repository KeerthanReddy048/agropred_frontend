import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dna, Wheat } from 'lucide-react';  // Changed logo to Wheat icon
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const ToPredictionPage = () => {
    navigate('/PredictionPage');
  };

  const ToSpikeDetection = () => {
    navigate('/SpikeDetection');
  };

  const storedUser = localStorage.getItem('user');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
          Agricultural Intelligence Platform
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Empowering Wheat Breeders with advanced genomic prediction and Farmers with wheat development stage Monitoring
        </p>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Genomic Prediction */}
          <button onClick={ToPredictionPage}>
            <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center space-x-2">
                <Dna className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Genomic Prediction</h3>
              </div>
              <p className="mt-4 text-gray-500">
                Advanced DNA analysis for crop phenotypic trait prediction.
              </p>
              {storedUser ? (
                <p></p>
              ) : (
                <p className="mt-4 text-sm text-gray-500">Login required to access this feature</p>
              )}
            </div>
          </button>

          {/* Wheat Spike Detection */}
          <button onClick={ToSpikeDetection}>
            <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-lg transition">
              <div className="flex items-center space-x-2">
                <Wheat className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold text-gray-900">Wheat Spike Detection</h3>
              </div>
              <p className="mt-4 text-gray-500">
                Real-time monitoring of Wheat Development Stage.
              </p>
              {storedUser ? (
                <p></p>
              ) : (
                <p className="mt-4 text-sm text-gray-500">Login required to access this feature</p>
              )}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

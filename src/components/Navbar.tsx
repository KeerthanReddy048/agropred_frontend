import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, LogIn, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');  
    navigate('/');
  };

  const storedUser = localStorage.getItem('user');

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* AgroPred Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="text-xl font-semibold text-green-600">AgroPred</span>
          </Link>

          {/* Hamburger Icon for Mobile */}
          <div className="flex sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-600 hover:text-gray-600 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Items - Desktop */}
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <Link to="/" className="text-green-600 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/PredictionPage" className="text-green-600 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Genomic Prediction
            </Link>
            <Link to="/SpikeDetection" className="text-green-600 hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Spike Detection
            </Link>
            {storedUser ? (
              <button
                onClick={handleLogout}
                className="text-green-600 hover:text-gray-600 px-3 py-2 text-sm font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/LoginPage" className="text-green-600 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="sm:hidden">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link to="/" className="block text-green-600 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link to="/PredictionPage" className="block text-green-600 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                Genomic Prediction
              </Link>
              <Link to="/SpikeDetection" className="block text-green-600 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                Spike Detection
              </Link>
              {storedUser ? (
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-green-600 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/LoginPage" className="block text-green-600 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <button
              onClick={() => navigate(isAuthenticated ? "/tours" : "/login")}
              className="flex items-center gap-2 text-2xl font-bold text-indigo-600 hover:text-indigo-700"
            >
              <span>✈️</span>
              <span>Travel Booking</span>
            </button>

            {/* Navigation Links */}
            {isAuthenticated && (
              <div className="flex items-center gap-6">
                <button
                  onClick={() => navigate("/tours")}
                  className="text-gray-700 hover:text-indigo-600 font-semibold transition"
                >
                  Tours
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; 2024 Travel Booking System. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-2">
            Powered by React + Vite + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;

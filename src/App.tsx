import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./components/Login";
import TourList from "./components/TourList";
import TourDetails from "./components/TourDetails";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import "./App.css";

function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/tours" /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/tours"
          element={
            <ProtectedRoute>
              <Layout>
                <TourList />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tour/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <TourDetails />
              </Layout>
            </ProtectedRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/tours" : "/login"} />}
        />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

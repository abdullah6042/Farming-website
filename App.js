import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminPanel from './Components/AdminPanel';
import AdminNavbar from './Components/AdminNavbar';
import ContactList from './Components/ContactList';
import LoginList from './Components/LoginList';
import RegisterList from './Components/RegisterList';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    // Simulate authentication logic, e.g., check credentials
    // For simplicity, using hardcoded check
    // Replace with actual authentication logic
    const isAuthenticated = true; // Replace with your authentication logic
    setLoggedIn(isAuthenticated);
  };

  return (
    <Router>
      <div className="App">
        {loggedIn && <AdminNavbar />} {/* Display AdminNavbar only if loggedIn */}
        <Routes>
          {!loggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
          {loggedIn && (
            <>
              <Route path="/" element={<Navigate to="/admin" />} /> {/* Redirect to admin panel */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/contact" element={<ContactList />} />
              <Route path="/login" element={<LoginList />} />
              <Route path="/register" element={<RegisterList />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

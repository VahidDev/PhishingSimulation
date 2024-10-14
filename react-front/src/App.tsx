import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import PhishingForm from './components/PhishingForm';
import PhishingAttemptsTable from './components/PhishingAttemptsTable';
import './App.css';

const App: React.FC = () => {
  const [email, setEmail] = useState('');
  const [phishingAttempts, setPhishingAttempts] = useState([]);
  const [token, setToken] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const backendUrl = process.env.REACT_APP_NEST_BACKEND_URL;

  const fetchPhishingAttempts = async () => {
    try {
      const response = await fetch(`${backendUrl}/phishing-attempts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setPhishingAttempts(data);
    } catch (error) {
      console.error('Error fetching phishing attempts:', error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      fetchPhishingAttempts();
    }
  }, [token]);

  const logout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <div className="container">
      {token && (
        <div className="logout-container">
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}

      <h1>Phishing Simulation</h1>

      {!token ? (
        <div>
          {isRegister ? (
            <>
              <RegistrationForm setToken={setToken} />
              <p>Already have an account? <button onClick={() => setIsRegister(false)}>Switch to Login</button></p>
            </>
          ) : (
            <>
              <LoginForm setToken={setToken} />
              <p>Don't have an account? <button onClick={() => setIsRegister(true)}>Switch to Register</button></p>
            </>
          )}
        </div>
      ) : (
        <div>
          <PhishingForm
            email={email}
            setEmail={setEmail}
            token={token}
            fetchPhishingAttempts={fetchPhishingAttempts}
          />
          <PhishingAttemptsTable phishingAttempts={phishingAttempts} />
        </div>
      )}
    </div>
  );
};

export default App;

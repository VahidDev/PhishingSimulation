import React, { useState } from 'react';
import axios from 'axios';

interface RegistrationFormProps {
  setToken: (token: string) => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]);  
  const backendUrl = process.env.REACT_APP_NEST_BACKEND_URL;

  const register = async () => {
    try {
      const registerResponse = await axios.post(`${backendUrl}/auth/register`, { email, password });
      const loginResponse = await axios.post(`${backendUrl}/auth/login`, { email, password });
      setToken(loginResponse.data.access_token);
      localStorage.setItem('token', loginResponse.data.access_token);
      setErrors([]);
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) ? error.response.data.message : [error.response.data.message]);
      } else {
        setErrors(['Registration failed']);
      }
    }
  };

  return (
    <div className="form-container registration-form">
      <div className="form-icon">📝</div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errors.length > 0 && (
        <ul className="error">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      )}
      <button className="registration-button" type="button" onClick={register}>Register</button>
    </div>
  );
};

export default RegistrationForm;

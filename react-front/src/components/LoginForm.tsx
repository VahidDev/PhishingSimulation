import React, { useState } from 'react';
import axios from 'axios';

interface LoginFormProps {
  setToken: (token: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<string[]>([]); 
  const backendUrl = process.env.REACT_APP_NEST_BACKEND_URL;

  const login = async () => {
    try {
      const response = await axios.post(`${backendUrl}/auth/login`, { email, password });
      setToken(response.data.access_token);
      localStorage.setItem('token', response.data.access_token);
      setErrors([]); 
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrors(Array.isArray(error.response.data.message) ? error.response.data.message : [error.response.data.message]);
      } else {
        setErrors(['Login failed']);
      }
    }
  };

  return (
    <div className="form-container login-form">
      <div className="form-icon">🔐</div>
      <h2>Login</h2>
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
      <button className="login-button" type="button" onClick={login}>Login</button>
    </div>
  );
};

export default LoginForm;

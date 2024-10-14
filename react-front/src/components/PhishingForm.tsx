import React, { useState } from 'react';

interface PhishingFormProps {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  token: string;
  fetchPhishingAttempts: () => Promise<void>;
}

const PhishingForm: React.FC<PhishingFormProps> = ({ email, setEmail, token, fetchPhishingAttempts }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 
  const backendUrl = process.env.REACT_APP_NEST_BACKEND_URL;

  const sendPhishingAttempt = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`${backendUrl}/phishing-attempts/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const result = await response.json();
      setError('');
      fetchPhishingAttempts();
      setEmail('');
    } catch (error: any) {
      setError(error.message || 'Error sending phishing attempt.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="phishing-form">
      <input
        type="email"
        placeholder="Recipient's Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading} 
      />
      <button type="button" onClick={sendPhishingAttempt} disabled={loading}> 
        {loading ? 'Sending...' : 'Send Phishing Email'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default PhishingForm;

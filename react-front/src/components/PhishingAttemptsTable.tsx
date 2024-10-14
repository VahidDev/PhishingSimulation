import React from 'react';
import { PhishingStatuses } from './PhishingStatuses'; 
import { PhishingAttempt } from './PhishingAttempt'; 

const statusMessages: { [key in PhishingStatuses]: string } = {
  [PhishingStatuses.Pending]: 'Pending',
  [PhishingStatuses.Sent]: 'Sent',
  [PhishingStatuses.Clicked]: 'Clicked',
  [PhishingStatuses.Failed]: 'Failed',
};

interface PhishingAttemptsTableProps {
  phishingAttempts: Array<PhishingAttempt>;
}

const PhishingAttemptsTable: React.FC<PhishingAttemptsTableProps> = ({ phishingAttempts }) => {
  return (
    <div className="table-container">
      <h2>Phishing Attempts</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Status</th>
            <th>Clicked</th>
            <th>Content</th>
          </tr>
        </thead>
        <tbody>
          {phishingAttempts.map((attempt, index) => (
            <tr key={attempt.attemptId || index}>
              <td>{attempt.email}</td>
              <td>{attempt.status}</td>
              <td>{attempt.clicked ? 'Yes' : 'No'}</td>
              <td>{attempt.content}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PhishingAttemptsTable;

import { Schema, Document } from 'mongoose';
import { PhishingStatuses } from './phishing-statuses.enum';

export const PhishingAttemptSchema = new Schema({
  email: { type: String, required: true },
  attemptId: { type: String, required: true, unique: true },
  status: { 
    type: String,  
    enum: Object.values(PhishingStatuses),  
    required: true,
    default: PhishingStatuses.Pending 
  },
  clicked: { type: Boolean, default: false },
  content: { type: String, required: true },
}, { collection: 'PhishingAttempts' }); 

export interface PhishingAttempt extends Document {
  email: string;
  attemptId: string;
  status: PhishingStatuses;
  clicked: boolean;
  content: string;
}

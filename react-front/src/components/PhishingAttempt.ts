import { PhishingStatuses } from './PhishingStatuses';

export interface PhishingAttempt {
  email: string;
  status: PhishingStatuses;
  clicked: boolean;
  attemptId: string;
  content: string;
}

export type UserMessageType = {
  id: number;
  name: string;
  email: string;
  phohe_number?: string;
  message: string;
  created_at: string;
  status: 'pending' | 'processing' | 'completed';
};

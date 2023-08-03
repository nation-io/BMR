export interface UserData {
  wallet?: string;
  email?: string;
  id?: string;
  token?: string;
}

export interface TicketData {
  user: string;
  mint: string;
  candyMachineId: string;
  timestamp: string;
  referral?: string;
  id: string;
}

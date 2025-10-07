export interface User {
  _id: string;
  name: string;
  username?: string;
  email: string;
  image?: string; 
  coverImage?: string; 
  bio?: string;
  institute?: string;
  gmailConnected?: boolean;
  gmailConnectedAt?: Date;
  lastGmailSync?: Date;
}

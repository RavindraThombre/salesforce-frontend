export enum ContactStatus {
  NEW = "New",
  REPLIED = "Replied",
  CLOSED = "Closed",
}

export interface Contact {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: ContactStatus;
  reply?: string;
  createdAt: string;
}

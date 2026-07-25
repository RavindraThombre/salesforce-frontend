export interface Payment {
  _id: string;
  course: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending";
  invoiceUrl: string;
}

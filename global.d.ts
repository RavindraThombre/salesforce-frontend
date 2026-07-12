export {};

declare global {
  interface RazorpayOptions {
    key: string;
    order_id?: string;
    amount?: number;
    currency?: string;
    name?: string;
    description?: string;
    handler?: (response: RazorpayResponse) => void | Promise<void>;
    theme?: {
      color?: string;
    };
    modal?: {
      ondismiss?: () => void;
    };
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
  }

  interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
  }

  interface RazorpayInstance {
    open(): void;
    on(event: string, callback: (response: unknown) => void): void;
  }

  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

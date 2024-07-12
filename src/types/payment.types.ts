export interface Payment {
  id: string;
  amount: number;
  createdAt: string;
  payment_method: string;
  payment_status: string;
  updatedAt: string;
  momoId: string | null;
  orderId: string;
  stripeId: string;
  userId: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data: PaymentResponse;
}

export interface SubscriberDTO {
  id: string;
  email: string;
  status: string;
  createdAt: string;
}

export interface SubscribeInput {
  email: string;
}


// for useCreateStripeCustomer hook
export interface CreateStripeCustomerInput {
  email: string
}
// for useCreateStripeCustomer hook
export interface CreateStripeCustomerData {
  createStripeCustomer: string
}

// for useCreateSubscription hook
export interface CreateSubscriptionInput {
  priceId: string;
  stripeCustomerId: string;
}

// data returned from server
export interface CreateSubscriptionData {
    subscriptionId: string;
    clientSecret: string | null;
}

export interface CreateCustomerSubscriptionData {
  createCustomerSubscription: CreateSubscriptionData
}

export interface CreateVendorSubscriptionData {
  createVendorSubscription: CreateSubscriptionData
}
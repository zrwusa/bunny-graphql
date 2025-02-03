export enum OrderStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  AwaitingShipment = 'Awaiting Shipment',
  Shipped = 'Shipped',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Refunding = 'Refunding',
  Refunded = 'Refunded',
  Returning = 'Returning',
  Returned = 'Returned',
}

export enum PaymentStatus {
  Pending = 'Pending',
  Paid = 'Paid',
  Failed = 'Failed',
  Refunded = 'Refunded',
}

export enum ShippingStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
}

export enum PaymentMethod {
  CreditCard = 'Credit Card',
  PayPal = 'Paypal',
  BankTransfer = 'Bank Transfer',
  Other = 'Other',
}

export enum InventoryType {
  PURCHASE = 'purchase', // Purchase
  SALE = 'sale', // Order out
  RETURN = 'return', // Order cancellation
  ADJUSTMENT = 'adjustment', // Inventory adjustment
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

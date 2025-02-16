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
  PURCHASE = 'Purchase', // Purchase
  SALE = 'Sale', // Order out
  RETURN = 'Return', // Order cancellation
  ADJUSTMENT = 'Adjustment', // Inventory adjustment
}

export enum Gender {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum Theme {
  LIGHT = 'Light',
  DARK = 'Dark',
}

export enum ShipmentStatus {
  Pending = 'PENDING',
  Shipped = 'SHIPPED',
  InTransit = 'IN_TRANSIT',
  Delivered = 'DELIVERED',
  Failed = 'FAILED',
  Returned = 'RETURNED',
}

export enum Carrier {
  DHL = 'DHL',
  FedEx = 'FEDEX',
  UPS = 'UPS',
  USPS = 'USPS',
  Aramex = 'ARAMEX',
  LocalCourier = 'LOCAL_COURIER',
}

export enum CategoryType {
  PHYSICAL = 'PHYSICAL',
  DIGITAL = 'DIGITAL',
  SERVICE = 'SERVICE',
}

/**
 * 
 * 
 * These types should be exactly the same as in Notification Server
 */

export interface NotificationData {
  message: string;
  projectId?: string;
}

export interface Notification {
  notificationId: string;
  notificationType: NotificationType;
  data: NotificationData;
  status: NotificationStatus
  timestamp: Date;
}

export enum NotificationStatus {
  SEEN = "SEEN",
  UNSEEN = "UNSEEN"
}

export enum NotificationType {
  SYSTEM = "SYSTEM",
  COMPANY = "COMPANY",
  PROJECT = "PROJECT",
  PO_INVOICE = "PO_INVOICE"
}

export enum EmitEventType {
  INIT_CONNECTION = "INIT_CONNECTION",
  GET_NOTIFICATIONS = "GET_NOTIFICATIONS",
  MARK_SEEN = "MARK_SEEN",
  CLEAR = "CLEAR",
}

export enum ReceiveEventType {
  USER_NOTIFICATIONS = "USER_NOTIFICATIONS",
  NEW_NOTIFICATION = "NEW_NOTIFICATION"
}
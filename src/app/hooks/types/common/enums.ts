export enum ProjectPermission {
  OWNER = "OWNER",
  VIEWER = "VIEWER",
  EDITOR = "EDITOR"
}

export enum ProjectStatus {
  OPEN = "OPEN",
  IN_PROGRESS = "IN_PROGRESS",
  CLOSED = "CLOSED"
}

export enum BidStatus {
  OPEN = "OPEN",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED"
}

export enum CompanyPermission {
  ADMIN = "ADMIN",
  USER = "USER"
}

export enum PlanTier {
  PREMIUM = "PREMIUM",
  BUSINESS = "BUSINESS"
}

export enum CompanySize {
  XS = "XS",
  S = "S",
  M = "S",
  L = "L"
}

export type BillingFrequency = 'day' | 'month' | 'week' | 'year';
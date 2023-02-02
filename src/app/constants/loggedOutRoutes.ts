export enum LOGGED_OUT_ROUTES {
  LOGIN = "/login",
  FORGOT_PASSWORD = "/forgot-password",
  RESET_PASSWORD = "/reset-password/:userId/:token",
  COMPANY_SIGNUP = "/company-signup",
  USER_SIGNUP = "/user-signup/:token",
  VENDOR_SIGNUP = "/vendor-signup",
  CUSTOMER_SIGNUP = "/customer-signup",
  GUEST_PROJECT = "/guest-project/:projectId"
}
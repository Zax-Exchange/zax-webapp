/** If you're adding/deleting routes, please also update the LOGGED_IN_ROUTES array in RequireAuth.tsx
 * so React Router knows how to match it
 */
export enum GENERAL_ROUTES {
  ARBITRARY = "*",
  HOME = "/",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  PROJECT_DETAIL = "/project-detail/:projectId",
  PROJECTS = "/projects",
  PO_INVOICE = "/po-invoice"
}

export enum CUSTOMER_ROUTES {
  SEARCH_RESULTS = "/customer-search-results",
  GUIDED_CREATE_PROJECT = "/guided-create-project",
  ADVANCED_CREATE_PROJECT = "/advanced-create-project",
  EDIT_PROJECT = "/project-detail/:projectId/edit",
  VENDOR_PROFILE = "/vendor-profile/:companyId"
}

export enum VENDOR_ROUTES {
  SEARCH_RESULTS = "/vendor-search-results",

  // do not use directly when using navigate() since it contains variable
  SEARCH_PROJECT_DETAIL = "/search-project-detail/:projectId",
  GUEST_PROJECT_DETAIL = "/guest-project-detail/:projectId"
}
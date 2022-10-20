export enum GENERAL_ROUTES {
  ARBITRARY = "*",
  HOME = "/",
  PROFILE = "/profile",
  SETTINGS = "/settings",
  PROJECT_DETAIL = "/project-detail/:projectId",
}

export enum CUSTOMER_ROUTES {
  PROJECTS = "/customer-projects",
  SEARCH_RESULTS = "/customer-search-results",
  GUIDED_CREATE_PROJECT = "/guided-create-project",
  ADVANCED_CREATE_PROJECT = "/advanced-create-project",

  VENDOR_PROFILE = "/vendor-profile/:companyId"
}

export enum VENDOR_ROUTES {
  PROJECTS = "/vendor-projects",
  SEARCH_RESULTS = "/vendor-search-results",

  // do not use directly when using navigate() since it contains variable
  SEARCH_PROJECT_DETAIL = "/search-project-detail/:projectId",
}
export enum GENERAL_ROUTES {
  ARBITRARY = "*",
  HOME = "/",
  PROFILE = "/profile",
  SETTINGS = "/settings",
}

export enum CUSTOMER_ROUTES {
  PROJECTS = "/customer-projects",
  SEARCH_RESULTS = "/customer-search-results",
  CREATE_PROJECT = "/create-project",

  // do not use directly when using navigate() since it contains variable
  PROJECT_DETAIL = "/customer-project-detail/:projectId"
}

export enum VENDOR_ROUTES {
  PROJECTS = "/vendor-projects",
  SEARCH_RESULTS = "/vendor-search-results",

  // do not use directly when using navigate() since it contains variable
  SEARCH_PROJECT_DETAIL = "/search-project-detail/:projectId",
  PROJECT_DETAIL = "/vendor-project-detail/:projectId"
}
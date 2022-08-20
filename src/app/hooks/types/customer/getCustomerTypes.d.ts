
// for useSearchProjects hook
export interface SearchProjectInput {
    userInput: string; // should contain material names
    deliveryCountries?: string[];
    deliveryCities?: string[];
    budget?: number; // <= 10000, <= 30000, <= 50000, <= 100000
    leadTime?: number; // 3, 6, 9, 12
  }

  export interface SearchProjectData {
    searchCustomerProjects: ProjectOverview[] | []
  }
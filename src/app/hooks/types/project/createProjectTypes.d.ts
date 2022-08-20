// for useCreateProject hook
export interface CreateProjectInput {
  data: {
    userId: string;
  name: string;
  deliveryDate: string; 
  deliveryAddress: string;
  designId: string;
  budget: number;
  comments: string;
  components: CreateProjectComponentInput[];
  }
}

export interface CreateProjectComponentInput {
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
}

// for useCreateProjectBid hook
export interface CreateProjectBidInput {
  data: {
    userId: string;
    projectId: string;
    comments: string;
    components: CreateProjectBidComponentInput[];
  }
}

export interface CreateProjectBidComponentInput {
  projectComponentId: string;
  quantityPrices: QuantityPriceInput[];
}

export interface QuantityPriceInput {
  price: number;
  quantity: number;
}

// for useCreateProjectBid hook
export interface CreateProjectBidData {
  createProjectBid: boolean
}

// for useCreateProject hook
export interface CreateProjectData {
  createProjet: boolean
}

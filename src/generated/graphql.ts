// THIS FILE IS GENERATED. DO NOT EDIT.
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum BidStatus {
  Accepted = 'ACCEPTED',
  Open = 'OPEN',
  Rejected = 'REJECTED'
}

export type CompanyDetail = {
  __typename?: 'CompanyDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Scalars['String']>>;
  moq?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  updatedAt: Scalars['String'];
};

export enum CompanyPermission {
  Admin = 'ADMIN',
  User = 'USER'
}

export type CompanyPlan = {
  __typename?: 'CompanyPlan';
  companyId: Scalars['String'];
  id: Scalars['String'];
  planId: Scalars['String'];
};

export type CompanyPlanDetail = {
  __typename?: 'CompanyPlanDetail';
  billingFrequency: Scalars['String'];
  memberSince: Scalars['String'];
  price: Scalars['Int'];
  subscriptionEndDate: Scalars['String'];
  subscriptionStartDate: Scalars['String'];
  tier: PlanTier;
  trialEndDate?: Maybe<Scalars['String']>;
  trialStartDate?: Maybe<Scalars['String']>;
};

export enum CompanySize {
  L = 'L',
  M = 'M',
  S = 'S',
  Xs = 'XS'
}

export type CreateCustomerInput = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  planId: Scalars['String'];
  userEmail: Scalars['String'];
};

export type CreateProjectBidComponentInput = {
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPriceInput>;
};

export type CreateProjectBidInput = {
  comments: Scalars['String'];
  components: Array<CreateProjectBidComponentInput>;
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateProjectComponentInput = {
  dimension: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
  postProcess: Scalars['String'];
};

export type CreateProjectInput = {
  budget: Scalars['Int'];
  comments: Scalars['String'];
  components: Array<CreateProjectComponentInput>;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  designId?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateUserInput = {
  companyId: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type CreateVendorInput = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  materials: Array<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  planId: Scalars['String'];
  userEmail: Scalars['String'];
};

export type CreateVendorSubscriptionInput = {
  perUserPriceId: Scalars['String'];
  stripeCustomerId: Scalars['String'];
  subscriptionPriceId: Scalars['String'];
};

export type CustomerDetail = {
  __typename?: 'CustomerDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CustomerOverview = {
  __typename?: 'CustomerOverview';
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CustomerProject = {
  __typename?: 'CustomerProject';
  bids?: Maybe<Array<Maybe<ProjectBid>>>;
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  design?: Maybe<ProjectDesign>;
  id: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteProjectBidPermissionsInput = {
  projectBidId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeleteProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type DeleteProjectPermissionsInput = {
  projectId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type EditableCustomerDetail = {
  __typename?: 'EditableCustomerDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  uri: Scalars['String'];
};

export type FileUploadResponse = {
  __typename?: 'FileUploadResponse';
  Bucket: Scalars['String'];
  ETag: Scalars['String'];
  Key: Scalars['String'];
  Location: Scalars['String'];
  key: Scalars['String'];
};

export type GetPermissionedCompanyInput = {
  companyId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetProjectBidInput = {
  projectBidId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  chatToken: Scalars['String'];
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  notificationToken: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: Scalars['String'];
  createCustomerSubscription: StripeSubscription;
  createProject: Scalars['Boolean'];
  createProjectBid: Scalars['Boolean'];
  createStripeCustomer: Scalars['String'];
  createUser: LoggedInUser;
  createVendor: Scalars['String'];
  createVendorSubscription: StripeSubscription;
  deactivateUser: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteProjectBidPermissions: Scalars['Boolean'];
  deleteProjectPermissions: Scalars['Boolean'];
  inviteUser: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  updateCompanyPlan: Scalars['Boolean'];
  updateCompanyPlanSubscriptionInfo: Scalars['Boolean'];
  updateCompanyStatus: Scalars['Boolean'];
  updateCustomer: Scalars['Boolean'];
  updateProjectBidPermissions: Scalars['Boolean'];
  updateProjectPermissions: Scalars['Boolean'];
  updateSubscription: Scalars['Boolean'];
  updateUser: Scalars['Boolean'];
  updateUserPassword: Scalars['Boolean'];
  updateUserPower: Scalars['Boolean'];
  updateVendor: Scalars['Boolean'];
  uploadProjectDesign: Scalars['String'];
};


export type MutationCreateCustomerArgs = {
  data: CreateCustomerInput;
};


export type MutationCreateCustomerSubscriptionArgs = {
  priceId: Scalars['String'];
  stripeCustomerId: Scalars['String'];
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationCreateProjectBidArgs = {
  data: CreateProjectBidInput;
};


export type MutationCreateStripeCustomerArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationCreateVendorArgs = {
  data: CreateVendorInput;
};


export type MutationCreateVendorSubscriptionArgs = {
  data: CreateVendorSubscriptionInput;
};


export type MutationDeactivateUserArgs = {
  email: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  projectId: Scalars['String'];
};


export type MutationDeleteProjectBidPermissionsArgs = {
  data: DeleteProjectBidPermissionsInput;
};


export type MutationDeleteProjectPermissionsArgs = {
  data: DeleteProjectPermissionsInput;
};


export type MutationInviteUserArgs = {
  email: Scalars['String'];
  userId: Scalars['String'];
};


export type MutationResetArgs = {
  t?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateCompanyPlanArgs = {
  data: UpdateCompanyPlanInput;
};


export type MutationUpdateCompanyPlanSubscriptionInfoArgs = {
  subscriptionId: Scalars['String'];
};


export type MutationUpdateCompanyStatusArgs = {
  companyId: Scalars['String'];
  isActive: Scalars['Boolean'];
};


export type MutationUpdateCustomerArgs = {
  data: UpdateCustomerInput;
};


export type MutationUpdateProjectBidPermissionsArgs = {
  data: UpdateProjectBidPermissionsInput;
};


export type MutationUpdateProjectPermissionsArgs = {
  data: UpdateProjectPermissionsInput;
};


export type MutationUpdateSubscriptionArgs = {
  subscriptionId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};


export type MutationUpdateUserPowerArgs = {
  data: UpdateUserPowerInput;
};


export type MutationUpdateVendorArgs = {
  data: UpdateVendorInput;
};


export type MutationUploadProjectDesignArgs = {
  file: Scalars['Upload'];
};

export type PermissionedCompany = {
  __typename?: 'PermissionedCompany';
  companyUrl: Scalars['String'];
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['String'];
  fax: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Scalars['String']>>;
  logo: Scalars['String'];
  materials?: Maybe<Array<Scalars['String']>>;
  moq?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  planInfo: CompanyPlan;
  updatedAt: Scalars['String'];
};

export type PermissionedProjectBid = {
  __typename?: 'PermissionedProjectBid';
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  permission: ProjectPermission;
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type Plan = {
  __typename?: 'Plan';
  companySize?: Maybe<CompanySize>;
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  pricings: Pricings;
  tier: PlanTier;
};

export enum PlanTier {
  Business = 'BUSINESS',
  Premium = 'PREMIUM'
}

export type PricingDetail = {
  __typename?: 'PricingDetail';
  price: Scalars['Int'];
  priceId: Scalars['String'];
};

export type Pricings = {
  __typename?: 'Pricings';
  annual?: Maybe<PricingDetail>;
  monthly?: Maybe<PricingDetail>;
  perUser: PricingDetail;
};

export type Project = {
  __typename?: 'Project';
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  design?: Maybe<ProjectDesign>;
  id: Scalars['String'];
  name: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type ProjectBid = {
  __typename?: 'ProjectBid';
  comments: Scalars['String'];
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['String'];
  id: Scalars['String'];
  project: Project;
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type ProjectBidComponent = {
  __typename?: 'ProjectBidComponent';
  createdAt: Scalars['String'];
  id: Scalars['String'];
  projectBidId: Scalars['String'];
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPrice>;
  updatedAt: Scalars['String'];
};

export type ProjectComponent = {
  __typename?: 'ProjectComponent';
  createdAt: Scalars['String'];
  dimension: Scalars['String'];
  id: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
  postProcess: Scalars['String'];
  projectId: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type ProjectDesign = {
  __typename?: 'ProjectDesign';
  fileName: Scalars['String'];
  url: Scalars['String'];
};

export type ProjectOverview = {
  __typename?: 'ProjectOverview';
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
};

export enum ProjectPermission {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  Viewer = 'VIEWER'
}

export enum ProjectStatus {
  Closed = 'CLOSED',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN'
}

export type QuantityPrice = {
  __typename?: 'QuantityPrice';
  price: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type QuantityPriceInput = {
  price: Scalars['Int'];
  quantity: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  checkCompanyName: Scalars['Boolean'];
  checkUserEmail: Scalars['Boolean'];
  getAllPlans: Array<Plan>;
  getAllUsersWithinCompany: Array<User>;
  getCompanyDetail?: Maybe<CompanyDetail>;
  getCompanyPlanDetail: CompanyPlanDetail;
  getCompanyPlanWithCompanyId: CompanyPlanDetail;
  getCustomerDetail: CustomerDetail;
  getCustomerProject: CustomerProject;
  getCustomerProjects: Array<CustomerProject>;
  getEditableCustomerDetail: EditableCustomerDetail;
  getPlanWithPlanId: Plan;
  getProjectBidUsers: Array<UserPermission>;
  getProjectDetail: Project;
  getProjectUsers: Array<UserPermission>;
  getUserWithUserId: User;
  getVendorDetail: VendorDetail;
  getVendorProject: VendorProject;
  getVendorProjects: Array<VendorProject>;
  login: LoggedInUser;
  searchCustomerProjects: Array<ProjectOverview>;
  searchVendorCompanies: Array<VendorOverview>;
};


export type QueryCheckCompanyNameArgs = {
  name: Scalars['String'];
};


export type QueryCheckUserEmailArgs = {
  email: Scalars['String'];
};


export type QueryGetAllPlansArgs = {
  isVendor: Scalars['Boolean'];
};


export type QueryGetAllUsersWithinCompanyArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyDetailArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyPlanDetailArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCompanyPlanWithCompanyIdArgs = {
  companyId?: InputMaybe<Scalars['String']>;
};


export type QueryGetCustomerDetailArgs = {
  companyId: Scalars['String'];
};


export type QueryGetCustomerProjectArgs = {
  data: GetProjectInput;
};


export type QueryGetCustomerProjectsArgs = {
  userId: Scalars['String'];
};


export type QueryGetEditableCustomerDetailArgs = {
  companyId: Scalars['String'];
};


export type QueryGetPlanWithPlanIdArgs = {
  id: Scalars['String'];
};


export type QueryGetProjectBidUsersArgs = {
  projectBidId: Scalars['String'];
};


export type QueryGetProjectDetailArgs = {
  projectId: Scalars['String'];
};


export type QueryGetProjectUsersArgs = {
  projectId: Scalars['String'];
};


export type QueryGetUserWithUserIdArgs = {
  paranoid?: InputMaybe<Scalars['Boolean']>;
  userId: Scalars['String'];
};


export type QueryGetVendorDetailArgs = {
  companyId: Scalars['String'];
};


export type QueryGetVendorProjectArgs = {
  data: GetProjectInput;
};


export type QueryGetVendorProjectsArgs = {
  userId: Scalars['String'];
};


export type QueryLoginArgs = {
  data: UserLoginInput;
};


export type QuerySearchCustomerProjectsArgs = {
  searchInput: SearchProjectInput;
};


export type QuerySearchVendorCompaniesArgs = {
  searchInput: SearchCompanyInput;
};

export type SearchCompanyInput = {
  leadTime?: InputMaybe<Scalars['Int']>;
  locations?: InputMaybe<Array<Scalars['String']>>;
  moq?: InputMaybe<Scalars['Int']>;
  userInput: Scalars['String'];
};

export type SearchProjectInput = {
  budget?: InputMaybe<Scalars['Int']>;
  deliveryCities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  deliveryCountries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  leadTime?: InputMaybe<Scalars['Int']>;
  userInput: Scalars['String'];
};

export type StripeSubscription = {
  __typename?: 'StripeSubscription';
  clientSecret: Scalars['String'];
  subscriptionId: Scalars['String'];
};

export type UpdateCompanyPlanInput = {
  companyId: Scalars['String'];
  planId: Scalars['String'];
};

export type UpdateCustomerInput = {
  data: UpdateCustomerInputData;
  id: Scalars['String'];
};

export type UpdateCustomerInputData = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type UpdateProjectBidComponentInput = {
  id: Scalars['String'];
  quantityPrices: Array<QuantityPriceInput>;
};

export type UpdateProjectBidInput = {
  comments: Scalars['String'];
  components: Array<UpdateProjectBidComponentInput>;
  id: Scalars['String'];
};

export type UpdateProjectBidPermissionsInput = {
  editors: UpdateProjectBidPermissionsInputData;
  viewers: UpdateProjectBidPermissionsInputData;
};

export type UpdateProjectBidPermissionsInputData = {
  permission: ProjectPermission;
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
  userIds: Array<InputMaybe<Scalars['String']>>;
};

export type UpdateProjectComponentInput = {
  dimension: Scalars['String'];
  id: Scalars['String'];
  materials: Array<Scalars['String']>;
  name: Scalars['String'];
  postProcess: Scalars['String'];
};

export type UpdateProjectInput = {
  budget: Scalars['Int'];
  components: Array<UpdateProjectComponentInput>;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UpdateProjectPermissionsInput = {
  editors: UpdateProjectPermissionsInputData;
  viewers: UpdateProjectPermissionsInputData;
};

export type UpdateProjectPermissionsInputData = {
  permission: ProjectPermission;
  projectId: Scalars['String'];
  userIds: Array<InputMaybe<Scalars['String']>>;
};

export type UpdateUserInput = {
  id: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['String'];
  id: Scalars['String'];
  newPassword: Scalars['String'];
};

export type UpdateUserPowerInput = {
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
};

export type UpdateVendorInput = {
  data: UpdateVendorInputData;
  id: Scalars['String'];
};

export type UpdateVendorInputData = {
  companyUrl?: InputMaybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: InputMaybe<Scalars['String']>;
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: InputMaybe<Scalars['String']>;
  materials: Array<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserPermission = {
  __typename?: 'UserPermission';
  email: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  userId: Scalars['String'];
};

export type VendorDetail = {
  __typename?: 'VendorDetail';
  companyUrl?: Maybe<Scalars['String']>;
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  materials: Array<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type VendorOverview = {
  __typename?: 'VendorOverview';
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  id: Scalars['String'];
  isVerified: Scalars['Boolean'];
  leadTime: Scalars['Int'];
  locations: Array<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  materials: Array<Scalars['String']>;
  moq: Scalars['String'];
  name: Scalars['String'];
};

export type VendorProject = {
  __typename?: 'VendorProject';
  bidInfo: PermissionedProjectBid;
  budget: Scalars['Int'];
  companyId: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['String'];
  customerName: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  design?: Maybe<ProjectDesign>;
  id: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

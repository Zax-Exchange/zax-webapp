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

export type CancelStripeSubscriptionInput = {
  email: Scalars['String'];
};

export type CheckCompanyNameInput = {
  companyName: Scalars['String'];
};

export type CheckUserEmailInput = {
  email: Scalars['String'];
};

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

export type CreateStripeCustomerInput = {
  email: Scalars['String'];
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

export type DeactivateUserInput = {
  email: Scalars['String'];
};

export type DeleteProjectBidPermissionsInput = {
  projectBidId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeleteProjectInput = {
  projectId: Scalars['String'];
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

export type GetAllPlansInput = {
  isVendor: Scalars['Boolean'];
};

export type GetAllUsersWithinCompanyInput = {
  companyId: Scalars['String'];
};

export type GetCompanyDetailInput = {
  companyId: Scalars['String'];
};

export type GetCompanyPlanDetailInput = {
  companyId: Scalars['String'];
};

export type GetCustomerDetailInput = {
  companyId: Scalars['String'];
};

export type GetCustomerProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetCustomerProjectsInput = {
  userId: Scalars['String'];
};

export type GetPlanInput = {
  planId: Scalars['String'];
};

export type GetProjectBidUsersInput = {
  projectBidId: Scalars['String'];
};

export type GetProjectDetailInput = {
  projectId: Scalars['String'];
};

export type GetProjectUsersInput = {
  projectId: Scalars['String'];
};

export type GetUserInput = {
  userId: Scalars['String'];
};

export type GetVendorDetailInput = {
  companyId: Scalars['String'];
};

export type GetVendorProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetVendorProjectsInput = {
  userId: Scalars['String'];
};

export type InviteUserInput = {
  email: Scalars['String'];
  userId: Scalars['String'];
};

export type LoggedInUser = {
  __typename?: 'LoggedInUser';
  chatToken: Scalars['String'];
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isAdmin: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  notificationToken: Scalars['String'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelStripeSubscription: Scalars['Boolean'];
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
  updateCustomerInfo: Scalars['Boolean'];
  updateProjectBidPermissions: Scalars['Boolean'];
  updateProjectPermissions: Scalars['Boolean'];
  updateStripeSubscription: Scalars['Boolean'];
  updateUserInfo: Scalars['Boolean'];
  updateUserPassword: Scalars['Boolean'];
  updateUserPower: Scalars['Boolean'];
  updateVendorInfo: Scalars['Boolean'];
  uploadProjectDesign: Scalars['String'];
};


export type MutationCancelStripeSubscriptionArgs = {
  data: CancelStripeSubscriptionInput;
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
  data: CreateStripeCustomerInput;
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
  data: DeactivateUserInput;
};


export type MutationDeleteProjectArgs = {
  data: DeleteProjectInput;
};


export type MutationDeleteProjectBidPermissionsArgs = {
  data: DeleteProjectBidPermissionsInput;
};


export type MutationDeleteProjectPermissionsArgs = {
  data: DeleteProjectPermissionsInput;
};


export type MutationInviteUserArgs = {
  data: InviteUserInput;
};


export type MutationResetArgs = {
  t?: InputMaybe<Scalars['Int']>;
};


export type MutationUpdateCompanyPlanArgs = {
  data: UpdateCompanyPlanInput;
};


export type MutationUpdateCompanyPlanSubscriptionInfoArgs = {
  data: UpdateCompanyPlanSubscriptionInfoInput;
};


export type MutationUpdateCompanyStatusArgs = {
  data: UpdateCompanyStatusInput;
};


export type MutationUpdateCustomerInfoArgs = {
  data: UpdateCustomerInfoInput;
};


export type MutationUpdateProjectBidPermissionsArgs = {
  data: UpdateProjectBidPermissionsInput;
};


export type MutationUpdateProjectPermissionsArgs = {
  data: UpdateProjectPermissionsInput;
};


export type MutationUpdateStripeSubscriptionArgs = {
  data: UpdateStripeSubscriptionInput;
};


export type MutationUpdateUserInfoArgs = {
  data: UpdateUserInfoInput;
};


export type MutationUpdateUserPasswordArgs = {
  data: UpdateUserPasswordInput;
};


export type MutationUpdateUserPowerArgs = {
  data: UpdateUserPowerInput;
};


export type MutationUpdateVendorInfoArgs = {
  data: UpdateVendorInfoInput;
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
  getCustomerDetail: CustomerDetail;
  getCustomerProject: CustomerProject;
  getCustomerProjects: Array<CustomerProject>;
  getPlan: Plan;
  getProjectBidUsers: Array<UserProjectPermission>;
  getProjectDetail: Project;
  getProjectUsers: Array<UserProjectPermission>;
  getUser: User;
  getVendorDetail: VendorDetail;
  getVendorProject: VendorProject;
  getVendorProjects: Array<VendorProject>;
  login: LoggedInUser;
  searchCustomerProjects: Array<ProjectOverview>;
  searchVendorCompanies: Array<VendorOverview>;
};


export type QueryCheckCompanyNameArgs = {
  data: CheckCompanyNameInput;
};


export type QueryCheckUserEmailArgs = {
  data: CheckUserEmailInput;
};


export type QueryGetAllPlansArgs = {
  data: GetAllPlansInput;
};


export type QueryGetAllUsersWithinCompanyArgs = {
  data: GetAllUsersWithinCompanyInput;
};


export type QueryGetCompanyDetailArgs = {
  data?: InputMaybe<GetCompanyDetailInput>;
};


export type QueryGetCompanyPlanDetailArgs = {
  data: GetCompanyPlanDetailInput;
};


export type QueryGetCustomerDetailArgs = {
  data: GetCustomerDetailInput;
};


export type QueryGetCustomerProjectArgs = {
  data: GetCustomerProjectInput;
};


export type QueryGetCustomerProjectsArgs = {
  data: GetCustomerProjectsInput;
};


export type QueryGetPlanArgs = {
  data: GetPlanInput;
};


export type QueryGetProjectBidUsersArgs = {
  data: GetProjectBidUsersInput;
};


export type QueryGetProjectDetailArgs = {
  data: GetProjectDetailInput;
};


export type QueryGetProjectUsersArgs = {
  data: GetProjectUsersInput;
};


export type QueryGetUserArgs = {
  data: GetUserInput;
};


export type QueryGetVendorDetailArgs = {
  data?: InputMaybe<GetVendorDetailInput>;
};


export type QueryGetVendorProjectArgs = {
  data: GetVendorProjectInput;
};


export type QueryGetVendorProjectsArgs = {
  data: GetVendorProjectsInput;
};


export type QueryLoginArgs = {
  data: UserLoginInput;
};


export type QuerySearchCustomerProjectsArgs = {
  data: SearchCustomerProjectInput;
};


export type QuerySearchVendorCompaniesArgs = {
  data: SearchVendorCompanyInput;
};

export type SearchCustomerProjectInput = {
  budget?: InputMaybe<Scalars['Int']>;
  deliveryCities?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  deliveryCountries?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  leadTime?: InputMaybe<Scalars['Int']>;
  userInput: Scalars['String'];
};

export type SearchVendorCompanyInput = {
  leadTime?: InputMaybe<Scalars['Int']>;
  locations?: InputMaybe<Array<Scalars['String']>>;
  moq?: InputMaybe<Scalars['Int']>;
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

export type UpdateCompanyPlanSubscriptionInfoInput = {
  subscriptionId: Scalars['String'];
};

export type UpdateCompanyStatusInput = {
  companyId: Scalars['String'];
  isActive: Scalars['Boolean'];
};

export type UpdateCustomerInfoInput = {
  companyId: Scalars['String'];
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

export type UpdateStripeSubscriptionInput = {
  subscriptionId: Scalars['String'];
};

export type UpdateUserInfoInput = {
  name?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type UpdateUserPasswordInput = {
  currentPassword: Scalars['String'];
  newPassword: Scalars['String'];
  userId: Scalars['String'];
};

export type UpdateUserPowerInput = {
  isAdmin: Scalars['Boolean'];
  userId: Scalars['String'];
};

export type UpdateVendorInfoInput = {
  companyId: Scalars['String'];
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

export type UserProjectPermission = {
  __typename?: 'UserProjectPermission';
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

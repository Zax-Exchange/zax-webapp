import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  logo?: Maybe<Scalars['String']>;
  materials?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  permission: Scalars['String'];
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
  locations?: Maybe<Array<Maybe<Scalars['String']>>>;
  logo: Scalars['String'];
  materials?: Maybe<Array<Maybe<Scalars['String']>>>;
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
  permission: Scalars['String'];
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
  getPlanWithPlanId: Plan;
  getProjectBidUsers: Array<UserPermission>;
  getProjectDetail: Project;
  getProjectUsers: Array<UserPermission>;
  getUserWithUserId: User;
  getVendorDetail: VendorDetail;
  getVendorProject: VendorProject;
  getVendorProjects: Array<Maybe<VendorProject>>;
  login: LoggedInUser;
  searchCustomerProjects: Array<ProjectOverview>;
  searchVendorCompanies?: Maybe<Array<Maybe<VendorOverview>>>;
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
  permission: Scalars['String'];
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
  permission: Scalars['String'];
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
  permission: Scalars['String'];
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
  locations: Array<Maybe<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  materials: Array<Maybe<Scalars['String']>>;
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
  locations: Array<Maybe<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  materials: Array<Maybe<Scalars['String']>>;
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
  permission: Scalars['String'];
  status: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateStripeCustomerMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type CreateStripeCustomerMutation = { __typename?: 'Mutation', createStripeCustomer: string };

export type CreateCustomerMutationVariables = Exact<{
  data: CreateCustomerInput;
}>;


export type CreateCustomerMutation = { __typename?: 'Mutation', createCustomer: string };

export type CreateCustomerSubscriptionMutationVariables = Exact<{
  priceId: Scalars['String'];
  stripeCustomerId: Scalars['String'];
}>;


export type CreateCustomerSubscriptionMutation = { __typename?: 'Mutation', createCustomerSubscription: { __typename?: 'StripeSubscription', clientSecret: string, subscriptionId: string } };

export type CreateProjectBidMutationVariables = Exact<{
  data: CreateProjectBidInput;
}>;


export type CreateProjectBidMutation = { __typename?: 'Mutation', createProjectBid: boolean };

export type CreateProjectMutationVariables = Exact<{
  data: CreateProjectInput;
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: boolean };

export type UploadProjectDesignMutationVariables = Exact<{
  file: Scalars['Upload'];
}>;


export type UploadProjectDesignMutation = { __typename?: 'Mutation', uploadProjectDesign: string };

export type InviteUserMutationVariables = Exact<{
  email: Scalars['String'];
  userId: Scalars['String'];
}>;


export type InviteUserMutation = { __typename?: 'Mutation', inviteUser: boolean };

export type CreateVendorMutationVariables = Exact<{
  data: CreateVendorInput;
}>;


export type CreateVendorMutation = { __typename?: 'Mutation', createVendor: string };

export type CreateVendorSubscriptionMutationVariables = Exact<{
  data: CreateVendorSubscriptionInput;
}>;


export type CreateVendorSubscriptionMutation = { __typename?: 'Mutation', createVendorSubscription: { __typename?: 'StripeSubscription', clientSecret: string, subscriptionId: string } };

export type DeleteProjectBidPermissionsMutationVariables = Exact<{
  data: DeleteProjectBidPermissionsInput;
}>;


export type DeleteProjectBidPermissionsMutation = { __typename?: 'Mutation', deleteProjectBidPermissions: boolean };

export type DeleteProjectPermissionsMutationVariables = Exact<{
  data: DeleteProjectPermissionsInput;
}>;


export type DeleteProjectPermissionsMutation = { __typename?: 'Mutation', deleteProjectPermissions: boolean };

export type DeleteProjectMutationVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type DeactivateUserMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', deactivateUser: boolean };

export type GetProjectBidUsersQueryVariables = Exact<{
  projectBidId: Scalars['String'];
}>;


export type GetProjectBidUsersQuery = { __typename?: 'Query', getProjectBidUsers: Array<{ __typename?: 'UserPermission', userId: string, name: string, email: string, permission: string }> };

export type GetAllUsersWithinCompanyQueryVariables = Exact<{
  companyId: Scalars['String'];
}>;


export type GetAllUsersWithinCompanyQuery = { __typename?: 'Query', getAllUsersWithinCompany: Array<{ __typename?: 'User', id: string, email: string, name: string }> };

export type GetCompanyPlanWithCompanyIdQueryVariables = Exact<{
  companyId: Scalars['String'];
}>;


export type GetCompanyPlanWithCompanyIdQuery = { __typename?: 'Query', getCompanyPlanWithCompanyId: { __typename?: 'CompanyPlanDetail', tier: PlanTier, price: number, billingFrequency: string, memberSince: string, subscriptionStartDate: string, subscriptionEndDate: string, trialStartDate?: string | null, trialEndDate?: string | null } };

export type GetCompanyDetailQueryVariables = Exact<{
  companyId: Scalars['String'];
}>;


export type GetCompanyDetailQuery = { __typename?: 'Query', getCompanyDetail?: { __typename?: 'CompanyDetail', id: string, name: string, contactEmail: string, logo?: string | null, phone: string, fax?: string | null, country: string, isActive: boolean, isVendor: boolean, isVerified: boolean, companyUrl?: string | null, locations?: Array<string | null> | null, materials?: Array<string | null> | null, moq?: string | null, leadTime?: number | null } | null };

export type GetAllPlansQueryVariables = Exact<{
  isVendor: Scalars['Boolean'];
}>;


export type GetAllPlansQuery = { __typename?: 'Query', getAllPlans: Array<{ __typename?: 'Plan', id: string, isVendor: boolean, companySize?: CompanySize | null, tier: PlanTier, pricings: { __typename?: 'Pricings', monthly?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, annual?: { __typename?: 'PricingDetail', price: number, priceId: string } | null, perUser: { __typename?: 'PricingDetail', price: number, priceId: string } } }> };

export type GetCustomerProjectQueryVariables = Exact<{
  data: GetProjectInput;
}>;


export type GetCustomerProjectQuery = { __typename?: 'Query', getCustomerProject: { __typename?: 'CustomerProject', id: string, userId: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, permission: string, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, bids?: Array<{ __typename?: 'ProjectBid', id: string, userId: string, companyId: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } | null> | null } };

export type GetCustomerProjectsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetCustomerProjectsQuery = { __typename?: 'Query', getCustomerProjects: Array<{ __typename?: 'CustomerProject', id: string, userId: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, permission: string, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, bids?: Array<{ __typename?: 'ProjectBid', id: string, userId: string, companyId: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', id: string, projectBidId: string, projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } | null> | null }> };

export type GetProjectUsersQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetProjectUsersQuery = { __typename?: 'Query', getProjectUsers: Array<{ __typename?: 'UserPermission', userId: string, name: string, email: string, permission: string }> };

export type GetProjectDetailQueryVariables = Exact<{
  projectId: Scalars['String'];
}>;


export type GetProjectDetailQuery = { __typename?: 'Query', getProjectDetail: { __typename?: 'Project', id: string, userId: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }> } };

export type SearchProjectsQueryVariables = Exact<{
  searchInput: SearchProjectInput;
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchCustomerProjects: Array<{ __typename?: 'ProjectOverview', name: string, companyName: string, materials: Array<string>, id: string, companyId: string, deliveryDate: string, deliveryAddress: string, budget: number, createdAt: string }> };

export type GetUserWithUserIdQueryVariables = Exact<{
  userId: Scalars['String'];
  paranoid?: InputMaybe<Scalars['Boolean']>;
}>;


export type GetUserWithUserIdQuery = { __typename?: 'Query', getUserWithUserId: { __typename?: 'User', id: string, name: string, email: string, companyId: string, isActive: boolean } };

export type GetVendorDetailQueryVariables = Exact<{
  companyId: Scalars['String'];
}>;


export type GetVendorDetailQuery = { __typename?: 'Query', getVendorDetail: { __typename?: 'VendorDetail', id: string, name: string, phone: string, logo?: string | null, country: string, isActive: boolean, companyUrl?: string | null, fax?: string | null, isVerified: boolean, locations: Array<string | null>, materials: Array<string | null>, moq: string, leadTime: number } };

export type GetVendorProjectQueryVariables = Exact<{
  data: GetProjectInput;
}>;


export type GetVendorProjectQuery = { __typename?: 'Query', getVendorProject: { __typename?: 'VendorProject', id: string, userId: string, customerName: string, companyId: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, createdAt: string, updatedAt: string, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null, components: Array<{ __typename?: 'ProjectComponent', id: string, projectId: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, bidInfo: { __typename?: 'PermissionedProjectBid', id: string, companyId: string, permission: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> } } };

export type GetVendorProjectsQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type GetVendorProjectsQuery = { __typename?: 'Query', getVendorProjects: Array<{ __typename?: 'VendorProject', id: string, userId: string, companyId: string, customerName: string, name: string, deliveryDate: string, deliveryAddress: string, budget: number, status: string, permission: string, createdAt: string, updatedAt: string, bidInfo: { __typename?: 'PermissionedProjectBid', id: string, companyId: string, permission: string, createdAt: string, updatedAt: string, components: Array<{ __typename?: 'ProjectBidComponent', projectComponentId: string, quantityPrices: Array<{ __typename?: 'QuantityPrice', quantity: number, price: number }> }> }, components: Array<{ __typename?: 'ProjectComponent', id: string, name: string, materials: Array<string>, dimension: string, postProcess: string }>, design?: { __typename?: 'ProjectDesign', fileName: string, url: string } | null } | null> };

export type SearchVendorCompaniesQueryVariables = Exact<{
  searchInput: SearchCompanyInput;
}>;


export type SearchVendorCompaniesQuery = { __typename?: 'Query', searchVendorCompanies?: Array<{ __typename?: 'VendorOverview', id: string, name: string, logo?: string | null, country: string, isVerified: boolean, locations: Array<string | null>, materials: Array<string | null>, moq: string, leadTime: number } | null> | null };

export type UpdateProjectBidPermissionsMutationVariables = Exact<{
  data: UpdateProjectBidPermissionsInput;
}>;


export type UpdateProjectBidPermissionsMutation = { __typename?: 'Mutation', updateProjectBidPermissions: boolean };

export type UpdateCompanyPlanSubscriptionInfoMutationVariables = Exact<{
  subscriptionId: Scalars['String'];
}>;


export type UpdateCompanyPlanSubscriptionInfoMutation = { __typename?: 'Mutation', updateCompanyPlanSubscriptionInfo: boolean };

export type UpdateCompanyStatusMutationVariables = Exact<{
  companyId: Scalars['String'];
  isActive: Scalars['Boolean'];
}>;


export type UpdateCompanyStatusMutation = { __typename?: 'Mutation', updateCompanyStatus: boolean };

export type UpdateCustomerMutationVariables = Exact<{
  data: UpdateCustomerInput;
}>;


export type UpdateCustomerMutation = { __typename?: 'Mutation', updateCustomer: boolean };

export type UpdateProjectPermissionsMutationVariables = Exact<{
  data: UpdateProjectPermissionsInput;
}>;


export type UpdateProjectPermissionsMutation = { __typename?: 'Mutation', updateProjectPermissions: boolean };

export type UpdateUserPasswordMutationVariables = Exact<{
  data: UpdateUserPasswordInput;
}>;


export type UpdateUserPasswordMutation = { __typename?: 'Mutation', updateUserPassword: boolean };

export type UpdateVendorMutationVariables = Exact<{
  data: UpdateVendorInput;
}>;


export type UpdateVendorMutation = { __typename?: 'Mutation', updateVendor: boolean };

export type CheckCompanyNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type CheckCompanyNameQuery = { __typename?: 'Query', checkCompanyName: boolean };

export type CheckUserEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type CheckUserEmailQuery = { __typename?: 'Query', checkUserEmail: boolean };

export type LoginQueryVariables = Exact<{
  data: UserLoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoggedInUser', id: string, companyId: string, isVendor: boolean, isAdmin: boolean, name: string, email: string, token: string, notificationToken: string, chatToken: string } };


export const CreateStripeCustomerDocument = gql`
    mutation createStripeCustomer($email: String!) {
  createStripeCustomer(email: $email)
}
    `;
export type CreateStripeCustomerMutationFn = Apollo.MutationFunction<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>;

/**
 * __useCreateStripeCustomerMutation__
 *
 * To run a mutation, you first call `useCreateStripeCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStripeCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStripeCustomerMutation, { data, loading, error }] = useCreateStripeCustomerMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCreateStripeCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>(CreateStripeCustomerDocument, options);
      }
export type CreateStripeCustomerMutationHookResult = ReturnType<typeof useCreateStripeCustomerMutation>;
export type CreateStripeCustomerMutationResult = Apollo.MutationResult<CreateStripeCustomerMutation>;
export type CreateStripeCustomerMutationOptions = Apollo.BaseMutationOptions<CreateStripeCustomerMutation, CreateStripeCustomerMutationVariables>;
export const CreateCustomerDocument = gql`
    mutation createCustomer($data: CreateCustomerInput!) {
  createCustomer(data: $data)
}
    `;
export type CreateCustomerMutationFn = Apollo.MutationFunction<CreateCustomerMutation, CreateCustomerMutationVariables>;

/**
 * __useCreateCustomerMutation__
 *
 * To run a mutation, you first call `useCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerMutation, { data, loading, error }] = useCreateCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerMutation, CreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerMutation, CreateCustomerMutationVariables>(CreateCustomerDocument, options);
      }
export type CreateCustomerMutationHookResult = ReturnType<typeof useCreateCustomerMutation>;
export type CreateCustomerMutationResult = Apollo.MutationResult<CreateCustomerMutation>;
export type CreateCustomerMutationOptions = Apollo.BaseMutationOptions<CreateCustomerMutation, CreateCustomerMutationVariables>;
export const CreateCustomerSubscriptionDocument = gql`
    mutation createCustomerSubscription($priceId: String!, $stripeCustomerId: String!) {
  createCustomerSubscription(
    priceId: $priceId
    stripeCustomerId: $stripeCustomerId
  ) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateCustomerSubscriptionMutationFn = Apollo.MutationFunction<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>;

/**
 * __useCreateCustomerSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateCustomerSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCustomerSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCustomerSubscriptionMutation, { data, loading, error }] = useCreateCustomerSubscriptionMutation({
 *   variables: {
 *      priceId: // value for 'priceId'
 *      stripeCustomerId: // value for 'stripeCustomerId'
 *   },
 * });
 */
export function useCreateCustomerSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>(CreateCustomerSubscriptionDocument, options);
      }
export type CreateCustomerSubscriptionMutationHookResult = ReturnType<typeof useCreateCustomerSubscriptionMutation>;
export type CreateCustomerSubscriptionMutationResult = Apollo.MutationResult<CreateCustomerSubscriptionMutation>;
export type CreateCustomerSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateCustomerSubscriptionMutation, CreateCustomerSubscriptionMutationVariables>;
export const CreateProjectBidDocument = gql`
    mutation CreateProjectBid($data: CreateProjectBidInput!) {
  createProjectBid(data: $data)
}
    `;
export type CreateProjectBidMutationFn = Apollo.MutationFunction<CreateProjectBidMutation, CreateProjectBidMutationVariables>;

/**
 * __useCreateProjectBidMutation__
 *
 * To run a mutation, you first call `useCreateProjectBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectBidMutation, { data, loading, error }] = useCreateProjectBidMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectBidMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectBidMutation, CreateProjectBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectBidMutation, CreateProjectBidMutationVariables>(CreateProjectBidDocument, options);
      }
export type CreateProjectBidMutationHookResult = ReturnType<typeof useCreateProjectBidMutation>;
export type CreateProjectBidMutationResult = Apollo.MutationResult<CreateProjectBidMutation>;
export type CreateProjectBidMutationOptions = Apollo.BaseMutationOptions<CreateProjectBidMutation, CreateProjectBidMutationVariables>;
export const CreateProjectDocument = gql`
    mutation createProject($data: CreateProjectInput!) {
  createProject(data: $data)
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const UploadProjectDesignDocument = gql`
    mutation uploadProjectDesign($file: Upload!) {
  uploadProjectDesign(file: $file)
}
    `;
export type UploadProjectDesignMutationFn = Apollo.MutationFunction<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>;

/**
 * __useUploadProjectDesignMutation__
 *
 * To run a mutation, you first call `useUploadProjectDesignMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadProjectDesignMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadProjectDesignMutation, { data, loading, error }] = useUploadProjectDesignMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function useUploadProjectDesignMutation(baseOptions?: Apollo.MutationHookOptions<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>(UploadProjectDesignDocument, options);
      }
export type UploadProjectDesignMutationHookResult = ReturnType<typeof useUploadProjectDesignMutation>;
export type UploadProjectDesignMutationResult = Apollo.MutationResult<UploadProjectDesignMutation>;
export type UploadProjectDesignMutationOptions = Apollo.BaseMutationOptions<UploadProjectDesignMutation, UploadProjectDesignMutationVariables>;
export const InviteUserDocument = gql`
    mutation inviteUser($email: String!, $userId: String!) {
  inviteUser(email: $email, userId: $userId)
}
    `;
export type InviteUserMutationFn = Apollo.MutationFunction<InviteUserMutation, InviteUserMutationVariables>;

/**
 * __useInviteUserMutation__
 *
 * To run a mutation, you first call `useInviteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteUserMutation, { data, loading, error }] = useInviteUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useInviteUserMutation(baseOptions?: Apollo.MutationHookOptions<InviteUserMutation, InviteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InviteUserMutation, InviteUserMutationVariables>(InviteUserDocument, options);
      }
export type InviteUserMutationHookResult = ReturnType<typeof useInviteUserMutation>;
export type InviteUserMutationResult = Apollo.MutationResult<InviteUserMutation>;
export type InviteUserMutationOptions = Apollo.BaseMutationOptions<InviteUserMutation, InviteUserMutationVariables>;
export const CreateVendorDocument = gql`
    mutation createVendor($data: CreateVendorInput!) {
  createVendor(data: $data)
}
    `;
export type CreateVendorMutationFn = Apollo.MutationFunction<CreateVendorMutation, CreateVendorMutationVariables>;

/**
 * __useCreateVendorMutation__
 *
 * To run a mutation, you first call `useCreateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorMutation, { data, loading, error }] = useCreateVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVendorMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorMutation, CreateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorMutation, CreateVendorMutationVariables>(CreateVendorDocument, options);
      }
export type CreateVendorMutationHookResult = ReturnType<typeof useCreateVendorMutation>;
export type CreateVendorMutationResult = Apollo.MutationResult<CreateVendorMutation>;
export type CreateVendorMutationOptions = Apollo.BaseMutationOptions<CreateVendorMutation, CreateVendorMutationVariables>;
export const CreateVendorSubscriptionDocument = gql`
    mutation createVendorSubscription($data: CreateVendorSubscriptionInput!) {
  createVendorSubscription(data: $data) {
    clientSecret
    subscriptionId
  }
}
    `;
export type CreateVendorSubscriptionMutationFn = Apollo.MutationFunction<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>;

/**
 * __useCreateVendorSubscriptionMutation__
 *
 * To run a mutation, you first call `useCreateVendorSubscriptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVendorSubscriptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVendorSubscriptionMutation, { data, loading, error }] = useCreateVendorSubscriptionMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateVendorSubscriptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>(CreateVendorSubscriptionDocument, options);
      }
export type CreateVendorSubscriptionMutationHookResult = ReturnType<typeof useCreateVendorSubscriptionMutation>;
export type CreateVendorSubscriptionMutationResult = Apollo.MutationResult<CreateVendorSubscriptionMutation>;
export type CreateVendorSubscriptionMutationOptions = Apollo.BaseMutationOptions<CreateVendorSubscriptionMutation, CreateVendorSubscriptionMutationVariables>;
export const DeleteProjectBidPermissionsDocument = gql`
    mutation deleteProjectBidPermissions($data: DeleteProjectBidPermissionsInput!) {
  deleteProjectBidPermissions(data: $data)
}
    `;
export type DeleteProjectBidPermissionsMutationFn = Apollo.MutationFunction<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>;

/**
 * __useDeleteProjectBidPermissionsMutation__
 *
 * To run a mutation, you first call `useDeleteProjectBidPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectBidPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectBidPermissionsMutation, { data, loading, error }] = useDeleteProjectBidPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProjectBidPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>(DeleteProjectBidPermissionsDocument, options);
      }
export type DeleteProjectBidPermissionsMutationHookResult = ReturnType<typeof useDeleteProjectBidPermissionsMutation>;
export type DeleteProjectBidPermissionsMutationResult = Apollo.MutationResult<DeleteProjectBidPermissionsMutation>;
export type DeleteProjectBidPermissionsMutationOptions = Apollo.BaseMutationOptions<DeleteProjectBidPermissionsMutation, DeleteProjectBidPermissionsMutationVariables>;
export const DeleteProjectPermissionsDocument = gql`
    mutation deleteProjectPermissions($data: DeleteProjectPermissionsInput!) {
  deleteProjectPermissions(data: $data)
}
    `;
export type DeleteProjectPermissionsMutationFn = Apollo.MutationFunction<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>;

/**
 * __useDeleteProjectPermissionsMutation__
 *
 * To run a mutation, you first call `useDeleteProjectPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectPermissionsMutation, { data, loading, error }] = useDeleteProjectPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteProjectPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>(DeleteProjectPermissionsDocument, options);
      }
export type DeleteProjectPermissionsMutationHookResult = ReturnType<typeof useDeleteProjectPermissionsMutation>;
export type DeleteProjectPermissionsMutationResult = Apollo.MutationResult<DeleteProjectPermissionsMutation>;
export type DeleteProjectPermissionsMutationOptions = Apollo.BaseMutationOptions<DeleteProjectPermissionsMutation, DeleteProjectPermissionsMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($projectId: String!) {
  deleteProject(projectId: $projectId)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const DeactivateUserDocument = gql`
    mutation deactivateUser($email: String!) {
  deactivateUser(email: $email)
}
    `;
export type DeactivateUserMutationFn = Apollo.MutationFunction<DeactivateUserMutation, DeactivateUserMutationVariables>;

/**
 * __useDeactivateUserMutation__
 *
 * To run a mutation, you first call `useDeactivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUserMutation, { data, loading, error }] = useDeactivateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDeactivateUserMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, options);
      }
export type DeactivateUserMutationHookResult = ReturnType<typeof useDeactivateUserMutation>;
export type DeactivateUserMutationResult = Apollo.MutationResult<DeactivateUserMutation>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const GetProjectBidUsersDocument = gql`
    query getProjectBidUsers($projectBidId: String!) {
  getProjectBidUsers(projectBidId: $projectBidId) {
    userId
    name
    email
    permission
  }
}
    `;

/**
 * __useGetProjectBidUsersQuery__
 *
 * To run a query within a React component, call `useGetProjectBidUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectBidUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectBidUsersQuery({
 *   variables: {
 *      projectBidId: // value for 'projectBidId'
 *   },
 * });
 */
export function useGetProjectBidUsersQuery(baseOptions: Apollo.QueryHookOptions<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>(GetProjectBidUsersDocument, options);
      }
export function useGetProjectBidUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>(GetProjectBidUsersDocument, options);
        }
export type GetProjectBidUsersQueryHookResult = ReturnType<typeof useGetProjectBidUsersQuery>;
export type GetProjectBidUsersLazyQueryHookResult = ReturnType<typeof useGetProjectBidUsersLazyQuery>;
export type GetProjectBidUsersQueryResult = Apollo.QueryResult<GetProjectBidUsersQuery, GetProjectBidUsersQueryVariables>;
export const GetAllUsersWithinCompanyDocument = gql`
    query getAllUsersWithinCompany($companyId: String!) {
  getAllUsersWithinCompany(companyId: $companyId) {
    id
    email
    name
  }
}
    `;

/**
 * __useGetAllUsersWithinCompanyQuery__
 *
 * To run a query within a React component, call `useGetAllUsersWithinCompanyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersWithinCompanyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersWithinCompanyQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetAllUsersWithinCompanyQuery(baseOptions: Apollo.QueryHookOptions<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>(GetAllUsersWithinCompanyDocument, options);
      }
export function useGetAllUsersWithinCompanyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>(GetAllUsersWithinCompanyDocument, options);
        }
export type GetAllUsersWithinCompanyQueryHookResult = ReturnType<typeof useGetAllUsersWithinCompanyQuery>;
export type GetAllUsersWithinCompanyLazyQueryHookResult = ReturnType<typeof useGetAllUsersWithinCompanyLazyQuery>;
export type GetAllUsersWithinCompanyQueryResult = Apollo.QueryResult<GetAllUsersWithinCompanyQuery, GetAllUsersWithinCompanyQueryVariables>;
export const GetCompanyPlanWithCompanyIdDocument = gql`
    query getCompanyPlanWithCompanyId($companyId: String!) {
  getCompanyPlanWithCompanyId(companyId: $companyId) {
    tier
    price
    billingFrequency
    memberSince
    subscriptionStartDate
    subscriptionEndDate
    trialStartDate
    trialEndDate
  }
}
    `;

/**
 * __useGetCompanyPlanWithCompanyIdQuery__
 *
 * To run a query within a React component, call `useGetCompanyPlanWithCompanyIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyPlanWithCompanyIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyPlanWithCompanyIdQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyPlanWithCompanyIdQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>(GetCompanyPlanWithCompanyIdDocument, options);
      }
export function useGetCompanyPlanWithCompanyIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>(GetCompanyPlanWithCompanyIdDocument, options);
        }
export type GetCompanyPlanWithCompanyIdQueryHookResult = ReturnType<typeof useGetCompanyPlanWithCompanyIdQuery>;
export type GetCompanyPlanWithCompanyIdLazyQueryHookResult = ReturnType<typeof useGetCompanyPlanWithCompanyIdLazyQuery>;
export type GetCompanyPlanWithCompanyIdQueryResult = Apollo.QueryResult<GetCompanyPlanWithCompanyIdQuery, GetCompanyPlanWithCompanyIdQueryVariables>;
export const GetCompanyDetailDocument = gql`
    query getCompanyDetail($companyId: String!) {
  getCompanyDetail(companyId: $companyId) {
    id
    name
    contactEmail
    logo
    phone
    fax
    country
    isActive
    isVendor
    isVerified
    companyUrl
    locations
    materials
    moq
    leadTime
  }
}
    `;

/**
 * __useGetCompanyDetailQuery__
 *
 * To run a query within a React component, call `useGetCompanyDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCompanyDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCompanyDetailQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetCompanyDetailQuery(baseOptions: Apollo.QueryHookOptions<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>(GetCompanyDetailDocument, options);
      }
export function useGetCompanyDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>(GetCompanyDetailDocument, options);
        }
export type GetCompanyDetailQueryHookResult = ReturnType<typeof useGetCompanyDetailQuery>;
export type GetCompanyDetailLazyQueryHookResult = ReturnType<typeof useGetCompanyDetailLazyQuery>;
export type GetCompanyDetailQueryResult = Apollo.QueryResult<GetCompanyDetailQuery, GetCompanyDetailQueryVariables>;
export const GetAllPlansDocument = gql`
    query getAllPlans($isVendor: Boolean!) {
  getAllPlans(isVendor: $isVendor) {
    id
    isVendor
    companySize
    tier
    pricings {
      monthly {
        price
        priceId
      }
      annual {
        price
        priceId
      }
      perUser {
        price
        priceId
      }
    }
  }
}
    `;

/**
 * __useGetAllPlansQuery__
 *
 * To run a query within a React component, call `useGetAllPlansQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPlansQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPlansQuery({
 *   variables: {
 *      isVendor: // value for 'isVendor'
 *   },
 * });
 */
export function useGetAllPlansQuery(baseOptions: Apollo.QueryHookOptions<GetAllPlansQuery, GetAllPlansQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPlansQuery, GetAllPlansQueryVariables>(GetAllPlansDocument, options);
      }
export function useGetAllPlansLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPlansQuery, GetAllPlansQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPlansQuery, GetAllPlansQueryVariables>(GetAllPlansDocument, options);
        }
export type GetAllPlansQueryHookResult = ReturnType<typeof useGetAllPlansQuery>;
export type GetAllPlansLazyQueryHookResult = ReturnType<typeof useGetAllPlansLazyQuery>;
export type GetAllPlansQueryResult = Apollo.QueryResult<GetAllPlansQuery, GetAllPlansQueryVariables>;
export const GetCustomerProjectDocument = gql`
    query getCustomerProject($data: GetProjectInput!) {
  getCustomerProject(data: $data) {
    id
    userId
    companyId
    name
    deliveryDate
    deliveryAddress
    design {
      fileName
      url
    }
    budget
    status
    permission
    createdAt
    updatedAt
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    bids {
      id
      userId
      companyId
      components {
        id
        projectBidId
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetCustomerProjectQuery__
 *
 * To run a query within a React component, call `useGetCustomerProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerProjectQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetCustomerProjectQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>(GetCustomerProjectDocument, options);
      }
export function useGetCustomerProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>(GetCustomerProjectDocument, options);
        }
export type GetCustomerProjectQueryHookResult = ReturnType<typeof useGetCustomerProjectQuery>;
export type GetCustomerProjectLazyQueryHookResult = ReturnType<typeof useGetCustomerProjectLazyQuery>;
export type GetCustomerProjectQueryResult = Apollo.QueryResult<GetCustomerProjectQuery, GetCustomerProjectQueryVariables>;
export const GetCustomerProjectsDocument = gql`
    query GetCustomerProjects($userId: String!) {
  getCustomerProjects(userId: $userId) {
    id
    userId
    companyId
    name
    deliveryDate
    deliveryAddress
    design {
      fileName
      url
    }
    budget
    status
    permission
    createdAt
    updatedAt
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    bids {
      id
      userId
      companyId
      components {
        id
        projectBidId
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetCustomerProjectsQuery__
 *
 * To run a query within a React component, call `useGetCustomerProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCustomerProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCustomerProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetCustomerProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>(GetCustomerProjectsDocument, options);
      }
export function useGetCustomerProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>(GetCustomerProjectsDocument, options);
        }
export type GetCustomerProjectsQueryHookResult = ReturnType<typeof useGetCustomerProjectsQuery>;
export type GetCustomerProjectsLazyQueryHookResult = ReturnType<typeof useGetCustomerProjectsLazyQuery>;
export type GetCustomerProjectsQueryResult = Apollo.QueryResult<GetCustomerProjectsQuery, GetCustomerProjectsQueryVariables>;
export const GetProjectUsersDocument = gql`
    query getProjectUsers($projectId: String!) {
  getProjectUsers(projectId: $projectId) {
    userId
    name
    email
    permission
  }
}
    `;

/**
 * __useGetProjectUsersQuery__
 *
 * To run a query within a React component, call `useGetProjectUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectUsersQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectUsersQuery(baseOptions: Apollo.QueryHookOptions<GetProjectUsersQuery, GetProjectUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectUsersQuery, GetProjectUsersQueryVariables>(GetProjectUsersDocument, options);
      }
export function useGetProjectUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectUsersQuery, GetProjectUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectUsersQuery, GetProjectUsersQueryVariables>(GetProjectUsersDocument, options);
        }
export type GetProjectUsersQueryHookResult = ReturnType<typeof useGetProjectUsersQuery>;
export type GetProjectUsersLazyQueryHookResult = ReturnType<typeof useGetProjectUsersLazyQuery>;
export type GetProjectUsersQueryResult = Apollo.QueryResult<GetProjectUsersQuery, GetProjectUsersQueryVariables>;
export const GetProjectDetailDocument = gql`
    query getProjectDetail($projectId: String!) {
  getProjectDetail(projectId: $projectId) {
    id
    userId
    companyId
    name
    deliveryDate
    deliveryAddress
    budget
    design {
      fileName
      url
    }
    status
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetProjectDetailQuery__
 *
 * To run a query within a React component, call `useGetProjectDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectDetailQuery({
 *   variables: {
 *      projectId: // value for 'projectId'
 *   },
 * });
 */
export function useGetProjectDetailQuery(baseOptions: Apollo.QueryHookOptions<GetProjectDetailQuery, GetProjectDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectDetailQuery, GetProjectDetailQueryVariables>(GetProjectDetailDocument, options);
      }
export function useGetProjectDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectDetailQuery, GetProjectDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectDetailQuery, GetProjectDetailQueryVariables>(GetProjectDetailDocument, options);
        }
export type GetProjectDetailQueryHookResult = ReturnType<typeof useGetProjectDetailQuery>;
export type GetProjectDetailLazyQueryHookResult = ReturnType<typeof useGetProjectDetailLazyQuery>;
export type GetProjectDetailQueryResult = Apollo.QueryResult<GetProjectDetailQuery, GetProjectDetailQueryVariables>;
export const SearchProjectsDocument = gql`
    query searchProjects($searchInput: SearchProjectInput!) {
  searchCustomerProjects(searchInput: $searchInput) {
    name
    companyName
    materials
    id
    companyId
    deliveryDate
    deliveryAddress
    budget
    createdAt
  }
}
    `;

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const GetUserWithUserIdDocument = gql`
    query getUserWithUserId($userId: String!, $paranoid: Boolean) {
  getUserWithUserId(userId: $userId) {
    id
    name
    email
    companyId
    isActive
  }
}
    `;

/**
 * __useGetUserWithUserIdQuery__
 *
 * To run a query within a React component, call `useGetUserWithUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserWithUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserWithUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      paranoid: // value for 'paranoid'
 *   },
 * });
 */
export function useGetUserWithUserIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>(GetUserWithUserIdDocument, options);
      }
export function useGetUserWithUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>(GetUserWithUserIdDocument, options);
        }
export type GetUserWithUserIdQueryHookResult = ReturnType<typeof useGetUserWithUserIdQuery>;
export type GetUserWithUserIdLazyQueryHookResult = ReturnType<typeof useGetUserWithUserIdLazyQuery>;
export type GetUserWithUserIdQueryResult = Apollo.QueryResult<GetUserWithUserIdQuery, GetUserWithUserIdQueryVariables>;
export const GetVendorDetailDocument = gql`
    query getVendorDetail($companyId: String!) {
  getVendorDetail(companyId: $companyId) {
    id
    name
    phone
    logo
    country
    isActive
    companyUrl
    fax
    isVerified
    locations
    materials
    moq
    leadTime
  }
}
    `;

/**
 * __useGetVendorDetailQuery__
 *
 * To run a query within a React component, call `useGetVendorDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorDetailQuery({
 *   variables: {
 *      companyId: // value for 'companyId'
 *   },
 * });
 */
export function useGetVendorDetailQuery(baseOptions: Apollo.QueryHookOptions<GetVendorDetailQuery, GetVendorDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorDetailQuery, GetVendorDetailQueryVariables>(GetVendorDetailDocument, options);
      }
export function useGetVendorDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorDetailQuery, GetVendorDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorDetailQuery, GetVendorDetailQueryVariables>(GetVendorDetailDocument, options);
        }
export type GetVendorDetailQueryHookResult = ReturnType<typeof useGetVendorDetailQuery>;
export type GetVendorDetailLazyQueryHookResult = ReturnType<typeof useGetVendorDetailLazyQuery>;
export type GetVendorDetailQueryResult = Apollo.QueryResult<GetVendorDetailQuery, GetVendorDetailQueryVariables>;
export const GetVendorProjectDocument = gql`
    query getVendorProject($data: GetProjectInput!) {
  getVendorProject(data: $data) {
    id
    userId
    customerName
    companyId
    name
    deliveryDate
    deliveryAddress
    budget
    status
    design {
      fileName
      url
    }
    components {
      id
      projectId
      name
      materials
      dimension
      postProcess
    }
    bidInfo {
      id
      companyId
      permission
      components {
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetVendorProjectQuery__
 *
 * To run a query within a React component, call `useGetVendorProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorProjectQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetVendorProjectQuery(baseOptions: Apollo.QueryHookOptions<GetVendorProjectQuery, GetVendorProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorProjectQuery, GetVendorProjectQueryVariables>(GetVendorProjectDocument, options);
      }
export function useGetVendorProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorProjectQuery, GetVendorProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorProjectQuery, GetVendorProjectQueryVariables>(GetVendorProjectDocument, options);
        }
export type GetVendorProjectQueryHookResult = ReturnType<typeof useGetVendorProjectQuery>;
export type GetVendorProjectLazyQueryHookResult = ReturnType<typeof useGetVendorProjectLazyQuery>;
export type GetVendorProjectQueryResult = Apollo.QueryResult<GetVendorProjectQuery, GetVendorProjectQueryVariables>;
export const GetVendorProjectsDocument = gql`
    query getVendorProjects($userId: String!) {
  getVendorProjects(userId: $userId) {
    bidInfo {
      id
      companyId
      permission
      components {
        projectComponentId
        quantityPrices {
          quantity
          price
        }
      }
      createdAt
      updatedAt
    }
    components {
      id
      name
      materials
      dimension
      postProcess
    }
    id
    userId
    companyId
    customerName
    name
    deliveryDate
    deliveryAddress
    budget
    design {
      fileName
      url
    }
    status
    permission
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetVendorProjectsQuery__
 *
 * To run a query within a React component, call `useGetVendorProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetVendorProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetVendorProjectsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetVendorProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>(GetVendorProjectsDocument, options);
      }
export function useGetVendorProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>(GetVendorProjectsDocument, options);
        }
export type GetVendorProjectsQueryHookResult = ReturnType<typeof useGetVendorProjectsQuery>;
export type GetVendorProjectsLazyQueryHookResult = ReturnType<typeof useGetVendorProjectsLazyQuery>;
export type GetVendorProjectsQueryResult = Apollo.QueryResult<GetVendorProjectsQuery, GetVendorProjectsQueryVariables>;
export const SearchVendorCompaniesDocument = gql`
    query searchVendorCompanies($searchInput: SearchCompanyInput!) {
  searchVendorCompanies(searchInput: $searchInput) {
    id
    name
    logo
    country
    isVerified
    locations
    materials
    moq
    leadTime
  }
}
    `;

/**
 * __useSearchVendorCompaniesQuery__
 *
 * To run a query within a React component, call `useSearchVendorCompaniesQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchVendorCompaniesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchVendorCompaniesQuery({
 *   variables: {
 *      searchInput: // value for 'searchInput'
 *   },
 * });
 */
export function useSearchVendorCompaniesQuery(baseOptions: Apollo.QueryHookOptions<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>(SearchVendorCompaniesDocument, options);
      }
export function useSearchVendorCompaniesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>(SearchVendorCompaniesDocument, options);
        }
export type SearchVendorCompaniesQueryHookResult = ReturnType<typeof useSearchVendorCompaniesQuery>;
export type SearchVendorCompaniesLazyQueryHookResult = ReturnType<typeof useSearchVendorCompaniesLazyQuery>;
export type SearchVendorCompaniesQueryResult = Apollo.QueryResult<SearchVendorCompaniesQuery, SearchVendorCompaniesQueryVariables>;
export const UpdateProjectBidPermissionsDocument = gql`
    mutation updateProjectBidPermissions($data: UpdateProjectBidPermissionsInput!) {
  updateProjectBidPermissions(data: $data)
}
    `;
export type UpdateProjectBidPermissionsMutationFn = Apollo.MutationFunction<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>;

/**
 * __useUpdateProjectBidPermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectBidPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectBidPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectBidPermissionsMutation, { data, loading, error }] = useUpdateProjectBidPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectBidPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>(UpdateProjectBidPermissionsDocument, options);
      }
export type UpdateProjectBidPermissionsMutationHookResult = ReturnType<typeof useUpdateProjectBidPermissionsMutation>;
export type UpdateProjectBidPermissionsMutationResult = Apollo.MutationResult<UpdateProjectBidPermissionsMutation>;
export type UpdateProjectBidPermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectBidPermissionsMutation, UpdateProjectBidPermissionsMutationVariables>;
export const UpdateCompanyPlanSubscriptionInfoDocument = gql`
    mutation updateCompanyPlanSubscriptionInfo($subscriptionId: String!) {
  updateCompanyPlanSubscriptionInfo(subscriptionId: $subscriptionId)
}
    `;
export type UpdateCompanyPlanSubscriptionInfoMutationFn = Apollo.MutationFunction<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>;

/**
 * __useUpdateCompanyPlanSubscriptionInfoMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyPlanSubscriptionInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyPlanSubscriptionInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyPlanSubscriptionInfoMutation, { data, loading, error }] = useUpdateCompanyPlanSubscriptionInfoMutation({
 *   variables: {
 *      subscriptionId: // value for 'subscriptionId'
 *   },
 * });
 */
export function useUpdateCompanyPlanSubscriptionInfoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>(UpdateCompanyPlanSubscriptionInfoDocument, options);
      }
export type UpdateCompanyPlanSubscriptionInfoMutationHookResult = ReturnType<typeof useUpdateCompanyPlanSubscriptionInfoMutation>;
export type UpdateCompanyPlanSubscriptionInfoMutationResult = Apollo.MutationResult<UpdateCompanyPlanSubscriptionInfoMutation>;
export type UpdateCompanyPlanSubscriptionInfoMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyPlanSubscriptionInfoMutation, UpdateCompanyPlanSubscriptionInfoMutationVariables>;
export const UpdateCompanyStatusDocument = gql`
    mutation updateCompanyStatus($companyId: String!, $isActive: Boolean!) {
  updateCompanyStatus(companyId: $companyId, isActive: $isActive)
}
    `;
export type UpdateCompanyStatusMutationFn = Apollo.MutationFunction<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>;

/**
 * __useUpdateCompanyStatusMutation__
 *
 * To run a mutation, you first call `useUpdateCompanyStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCompanyStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCompanyStatusMutation, { data, loading, error }] = useUpdateCompanyStatusMutation({
 *   variables: {
 *      companyId: // value for 'companyId'
 *      isActive: // value for 'isActive'
 *   },
 * });
 */
export function useUpdateCompanyStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>(UpdateCompanyStatusDocument, options);
      }
export type UpdateCompanyStatusMutationHookResult = ReturnType<typeof useUpdateCompanyStatusMutation>;
export type UpdateCompanyStatusMutationResult = Apollo.MutationResult<UpdateCompanyStatusMutation>;
export type UpdateCompanyStatusMutationOptions = Apollo.BaseMutationOptions<UpdateCompanyStatusMutation, UpdateCompanyStatusMutationVariables>;
export const UpdateCustomerDocument = gql`
    mutation updateCustomer($data: UpdateCustomerInput!) {
  updateCustomer(data: $data)
}
    `;
export type UpdateCustomerMutationFn = Apollo.MutationFunction<UpdateCustomerMutation, UpdateCustomerMutationVariables>;

/**
 * __useUpdateCustomerMutation__
 *
 * To run a mutation, you first call `useUpdateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCustomerMutation, { data, loading, error }] = useUpdateCustomerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCustomerMutation, UpdateCustomerMutationVariables>(UpdateCustomerDocument, options);
      }
export type UpdateCustomerMutationHookResult = ReturnType<typeof useUpdateCustomerMutation>;
export type UpdateCustomerMutationResult = Apollo.MutationResult<UpdateCustomerMutation>;
export type UpdateCustomerMutationOptions = Apollo.BaseMutationOptions<UpdateCustomerMutation, UpdateCustomerMutationVariables>;
export const UpdateProjectPermissionsDocument = gql`
    mutation updateProjectPermissions($data: UpdateProjectPermissionsInput!) {
  updateProjectPermissions(data: $data)
}
    `;
export type UpdateProjectPermissionsMutationFn = Apollo.MutationFunction<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>;

/**
 * __useUpdateProjectPermissionsMutation__
 *
 * To run a mutation, you first call `useUpdateProjectPermissionsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectPermissionsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectPermissionsMutation, { data, loading, error }] = useUpdateProjectPermissionsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectPermissionsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>(UpdateProjectPermissionsDocument, options);
      }
export type UpdateProjectPermissionsMutationHookResult = ReturnType<typeof useUpdateProjectPermissionsMutation>;
export type UpdateProjectPermissionsMutationResult = Apollo.MutationResult<UpdateProjectPermissionsMutation>;
export type UpdateProjectPermissionsMutationOptions = Apollo.BaseMutationOptions<UpdateProjectPermissionsMutation, UpdateProjectPermissionsMutationVariables>;
export const UpdateUserPasswordDocument = gql`
    mutation updateUserPassword($data: UpdateUserPasswordInput!) {
  updateUserPassword(data: $data)
}
    `;
export type UpdateUserPasswordMutationFn = Apollo.MutationFunction<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;

/**
 * __useUpdateUserPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateUserPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserPasswordMutation, { data, loading, error }] = useUpdateUserPasswordMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUserPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>(UpdateUserPasswordDocument, options);
      }
export type UpdateUserPasswordMutationHookResult = ReturnType<typeof useUpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationResult = Apollo.MutationResult<UpdateUserPasswordMutation>;
export type UpdateUserPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateUserPasswordMutation, UpdateUserPasswordMutationVariables>;
export const UpdateVendorDocument = gql`
    mutation updateVendor($data: UpdateVendorInput!) {
  updateVendor(data: $data)
}
    `;
export type UpdateVendorMutationFn = Apollo.MutationFunction<UpdateVendorMutation, UpdateVendorMutationVariables>;

/**
 * __useUpdateVendorMutation__
 *
 * To run a mutation, you first call `useUpdateVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateVendorMutation, { data, loading, error }] = useUpdateVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateVendorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateVendorMutation, UpdateVendorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateVendorMutation, UpdateVendorMutationVariables>(UpdateVendorDocument, options);
      }
export type UpdateVendorMutationHookResult = ReturnType<typeof useUpdateVendorMutation>;
export type UpdateVendorMutationResult = Apollo.MutationResult<UpdateVendorMutation>;
export type UpdateVendorMutationOptions = Apollo.BaseMutationOptions<UpdateVendorMutation, UpdateVendorMutationVariables>;
export const CheckCompanyNameDocument = gql`
    query checkCompanyName($name: String!) {
  checkCompanyName(name: $name)
}
    `;

/**
 * __useCheckCompanyNameQuery__
 *
 * To run a query within a React component, call `useCheckCompanyNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckCompanyNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckCompanyNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCheckCompanyNameQuery(baseOptions: Apollo.QueryHookOptions<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>(CheckCompanyNameDocument, options);
      }
export function useCheckCompanyNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>(CheckCompanyNameDocument, options);
        }
export type CheckCompanyNameQueryHookResult = ReturnType<typeof useCheckCompanyNameQuery>;
export type CheckCompanyNameLazyQueryHookResult = ReturnType<typeof useCheckCompanyNameLazyQuery>;
export type CheckCompanyNameQueryResult = Apollo.QueryResult<CheckCompanyNameQuery, CheckCompanyNameQueryVariables>;
export const CheckUserEmailDocument = gql`
    query checkUserEmail($email: String!) {
  checkUserEmail(email: $email)
}
    `;

/**
 * __useCheckUserEmailQuery__
 *
 * To run a query within a React component, call `useCheckUserEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckUserEmailQuery(baseOptions: Apollo.QueryHookOptions<CheckUserEmailQuery, CheckUserEmailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUserEmailQuery, CheckUserEmailQueryVariables>(CheckUserEmailDocument, options);
      }
export function useCheckUserEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUserEmailQuery, CheckUserEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUserEmailQuery, CheckUserEmailQueryVariables>(CheckUserEmailDocument, options);
        }
export type CheckUserEmailQueryHookResult = ReturnType<typeof useCheckUserEmailQuery>;
export type CheckUserEmailLazyQueryHookResult = ReturnType<typeof useCheckUserEmailLazyQuery>;
export type CheckUserEmailQueryResult = Apollo.QueryResult<CheckUserEmailQuery, CheckUserEmailQueryVariables>;
export const LoginDocument = gql`
    query login($data: UserLoginInput!) {
  login(data: $data) {
    id
    companyId
    isVendor
    isAdmin
    name
    email
    token
    notificationToken
    chatToken
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
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
  Date: any;
  JSON: any;
  Upload: any;
};

export type BidRemark = FileInterface & {
  __typename?: 'BidRemark';
  fileId: Scalars['String'];
  filename: Scalars['String'];
  url: Scalars['String'];
};

export enum BidStatus {
  Accepted = 'ACCEPTED',
  Expired = 'EXPIRED',
  InvoiceAccepted = 'INVOICE_ACCEPTED',
  InvoiceIssued = 'INVOICE_ISSUED',
  Open = 'OPEN',
  Outdated = 'OUTDATED',
  PoAccepted = 'PO_ACCEPTED',
  PoIssued = 'PO_ISSUED',
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
  createdAt: Scalars['Date'];
  fax?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Scalars['String']>>;
  logo?: Maybe<Scalars['String']>;
  moq?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  products?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Date'];
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
  stripeCustomerInfo: StripeCustomerInfo;
  userEmail: Scalars['String'];
};

export type CreateGuestProjectInput = {
  category: Scalars['String'];
  components: Array<CreateProjectComponentInput>;
  creationMode: ProjectCreationMode;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  projectId: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
};

export type CreateGuestProjectLinkInput = {
  guestEmail: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateInvoiceInput = {
  invoiceId: Scalars['String'];
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
};

export type CreateProjectBidComponentInput = {
  projectBidId?: InputMaybe<Scalars['String']>;
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPriceInput>;
  samplingFee: Scalars['Int'];
  toolingFee?: InputMaybe<Scalars['Int']>;
};

export type CreateProjectBidInput = {
  bidRemarkFileId?: InputMaybe<Scalars['String']>;
  components: Array<CreateProjectBidComponentInput>;
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type CreateProjectComponentInput = {
  componentSpec: CreateProjectComponentSpecInput;
  designIds?: InputMaybe<Array<Scalars['String']>>;
  name: Scalars['String'];
  projectId?: InputMaybe<Scalars['String']>;
};

export type CreateProjectComponentSpecInput = {
  boxStyle?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  dimension: ProductDimensionInput;
  finish?: InputMaybe<Scalars['String']>;
  flute?: InputMaybe<Scalars['String']>;
  includeArtworkInQuote?: InputMaybe<Scalars['Boolean']>;
  insideColor?: InputMaybe<Scalars['String']>;
  insideFinish?: InputMaybe<Scalars['String']>;
  insideMaterial?: InputMaybe<Scalars['String']>;
  insideMaterialSource?: InputMaybe<Scalars['String']>;
  manufacturingProcess?: InputMaybe<Scalars['String']>;
  material?: InputMaybe<Scalars['String']>;
  materialSource?: InputMaybe<Scalars['String']>;
  numberOfPages?: InputMaybe<Scalars['String']>;
  outsideColor?: InputMaybe<Scalars['String']>;
  outsideFinish?: InputMaybe<Scalars['String']>;
  outsideMaterial?: InputMaybe<Scalars['String']>;
  outsideMaterialSource?: InputMaybe<Scalars['String']>;
  postProcess?: InputMaybe<Array<PostProcessDetailInput>>;
  productName: Scalars['String'];
  purpose?: InputMaybe<Scalars['String']>;
  shape?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  thickness?: InputMaybe<Scalars['String']>;
};

export type CreateProjectInput = {
  category: Scalars['String'];
  components: Array<CreateProjectComponentInput>;
  creationMode: ProjectCreationMode;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  userId: Scalars['String'];
};

export type CreatePurchaseOrderInput = {
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
  purchaseOrderId: Scalars['String'];
};

export type CreateStripeCustomerInStripeForCustomerInput = {
  email: Scalars['String'];
  priceId: Scalars['String'];
};

export type CreateStripeCustomerInStripeForVendorInput = {
  email: Scalars['String'];
  perUserPriceId: Scalars['String'];
  subscriptionPriceId: Scalars['String'];
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
  name: Scalars['String'];
  phone: Scalars['String'];
  planId: Scalars['String'];
  productsAndMoq: Array<ProductAndMoqInput>;
  stripeCustomerInfo: StripeCustomerInfo;
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

export type CustomerPo = {
  __typename?: 'CustomerPo';
  permission: ProjectPermission;
  poDetails: Array<CustomerPoDetail>;
  projectInfo: CustomerPoProjectInfo;
};

export type CustomerPoDetail = {
  __typename?: 'CustomerPoDetail';
  invoiceFile?: Maybe<Invoice>;
  poFile: PurchaseOrder;
  projectBidId: Scalars['String'];
  vendorInfo: PoDetailVendorInfo;
};

export type CustomerPoProjectInfo = {
  __typename?: 'CustomerPoProjectInfo';
  projectId: Scalars['String'];
  projectName: Scalars['String'];
};

export type CustomerProject = ProjectInterface & {
  __typename?: 'CustomerProject';
  bids?: Maybe<Array<ProjectBid>>;
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  creationMode: ProjectCreationMode;
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type CustomerProjectOverview = {
  __typename?: 'CustomerProjectOverview';
  category: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type DeactivateUserInput = {
  companyId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeleteBidRemarkInput = {
  fileId: Scalars['String'];
};

export type DeleteInvoiceInput = {
  fileId: Scalars['String'];
};

export type DeletePendingJoinRequestInput = {
  userEmail: Scalars['String'];
};

export type DeleteProjectBidPermissionsInput = {
  projectBidId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeleteProjectComponentInput = {
  componentId: Scalars['String'];
};

export type DeleteProjectDesignInput = {
  fileId: Scalars['String'];
};

export type DeleteProjectInput = {
  projectId: Scalars['String'];
};

export type DeleteProjectPermissionsInput = {
  projectId: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type DeletePurchaseOrderInput = {
  fileId: Scalars['String'];
};

export type FileInterface = {
  fileId: Scalars['String'];
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type GenericUser = UserInterface & {
  __typename?: 'GenericUser';
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  power: UserPower;
  status: UserStatus;
};

export type GetAllPendingJoinRequestsInput = {
  companyId: Scalars['String'];
};

export type GetAllPlansInput = {
  isVendor: Scalars['Boolean'];
};

export type GetAllUsersWithinCompanyInput = {
  companyId: Scalars['String'];
  userStatus: Array<UserStatus>;
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

export type GetCustomerPosInput = {
  userId: Scalars['String'];
};

export type GetCustomerProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetCustomerProjectsInput = {
  permissions?: InputMaybe<Array<ProjectPermission>>;
  userId: Scalars['String'];
};

export type GetGuestProjectDetailInput = {
  projectId: Scalars['String'];
};

export type GetInvoiceInput = {
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
};

export type GetPlanInput = {
  planId: Scalars['String'];
};

export type GetProjectBidInput = {
  companyId: Scalars['String'];
  projectId: Scalars['String'];
};

export type GetProjectBidUsersInput = {
  projectBidId: Scalars['String'];
};

export type GetProjectBidsForPoInput = {
  projectId: Scalars['String'];
};

export type GetProjectChangelogInput = {
  projectId: Scalars['String'];
};

export type GetProjectComponentChangelogInput = {
  projectComponentId: Scalars['String'];
};

export type GetProjectDetailInput = {
  projectId: Scalars['String'];
};

export type GetProjectUsersInput = {
  projectId: Scalars['String'];
};

export type GetPurchaseOrderInput = {
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
};

export type GetStatementsLinkInput = {
  companyId: Scalars['String'];
};

export type GetUserInput = {
  userId: Scalars['String'];
};

export type GetVendorDetailInput = {
  companyId: Scalars['String'];
};

export type GetVendorGuestProjectInput = {
  projectId: Scalars['String'];
  userId: Scalars['String'];
};

export type GetVendorGuestProjectsInput = {
  userId: Scalars['String'];
};

export type GetVendorPosInput = {
  userId: Scalars['String'];
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

export type Invoice = FileInterface & {
  __typename?: 'Invoice';
  fileId: Scalars['String'];
  filename: Scalars['String'];
  status: InvoiceStatus;
  url: Scalars['String'];
};

export enum InvoiceStatus {
  Accepted = 'ACCEPTED',
  Open = 'OPEN',
  Outdated = 'OUTDATED',
  Rejected = 'REJECTED',
  Void = 'VOID'
}

export type LoggedInUser = UserInterface & {
  __typename?: 'LoggedInUser';
  chatToken: Scalars['String'];
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  power: UserPower;
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  cancelStripeSubscription: Scalars['Boolean'];
  createCustomer: Scalars['Boolean'];
  createCustomerSubscription: StripeSubscription;
  createGuestProject: Scalars['Boolean'];
  createGuestProjectLink: Scalars['Boolean'];
  createInvoice: Scalars['Boolean'];
  createProject: Scalars['Boolean'];
  createProjectBid: Scalars['Boolean'];
  createProjectBidComponents: Scalars['Boolean'];
  createPurchaseOrder: Scalars['Boolean'];
  createStripeCustomerInStripeForCustomer: StripePaymentIntent;
  createStripeCustomerInStripeForVendor: StripePaymentIntent;
  createUser: LoggedInUser;
  createVendor: Scalars['String'];
  createVendorSubscription: StripeSubscription;
  deactivateCustomerUser: Scalars['Boolean'];
  deleteBidRemark: Scalars['Boolean'];
  deleteInvoice: Scalars['Boolean'];
  deletePendingJoinRequests: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteProjectBidPermissions: Scalars['Boolean'];
  deleteProjectDesign: Scalars['Boolean'];
  deleteProjectPermissions: Scalars['Boolean'];
  deletePurchaseOrder: Scalars['Boolean'];
  inviteUsers: Scalars['Boolean'];
  requestToJoin: Scalars['Boolean'];
  reset: Scalars['Boolean'];
  resetPassword?: Maybe<Scalars['Boolean']>;
  resubmitProjectBid: Scalars['Boolean'];
  sendPasswordResetLink: Scalars['Boolean'];
  updateCompanyPlan: Scalars['Boolean'];
  updateCompanyPlanSubscriptionInfo: Scalars['Boolean'];
  updateCompanyStatus: Scalars['Boolean'];
  updateCustomerInfo: Scalars['Boolean'];
  updateGuestProject: Scalars['Boolean'];
  updateProject: Scalars['Boolean'];
  updateProjectBid: Scalars['Boolean'];
  updateProjectBidComponents: Scalars['Boolean'];
  updateProjectBidPermissions: Scalars['Boolean'];
  updateProjectPermissions: Scalars['Boolean'];
  updateStripeSubscription: Scalars['Boolean'];
  updateUserInfo: Scalars['Boolean'];
  updateUserPassword: Scalars['Boolean'];
  updateUserPower: Scalars['Boolean'];
  updateVendorInfo: Scalars['Boolean'];
  uploadBidRemark: BidRemark;
  uploadInvoice: Invoice;
  uploadProjectDesign: ProjectDesign;
  uploadPurchaseOrder: PurchaseOrder;
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


export type MutationCreateGuestProjectArgs = {
  data: CreateGuestProjectInput;
};


export type MutationCreateGuestProjectLinkArgs = {
  data: CreateGuestProjectLinkInput;
};


export type MutationCreateInvoiceArgs = {
  data: CreateInvoiceInput;
};


export type MutationCreateProjectArgs = {
  data: CreateProjectInput;
};


export type MutationCreateProjectBidArgs = {
  data: CreateProjectBidInput;
};


export type MutationCreateProjectBidComponentsArgs = {
  data: Array<CreateProjectBidComponentInput>;
};


export type MutationCreatePurchaseOrderArgs = {
  data: CreatePurchaseOrderInput;
};


export type MutationCreateStripeCustomerInStripeForCustomerArgs = {
  data: CreateStripeCustomerInStripeForCustomerInput;
};


export type MutationCreateStripeCustomerInStripeForVendorArgs = {
  data: CreateStripeCustomerInStripeForVendorInput;
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


export type MutationDeactivateCustomerUserArgs = {
  data: DeactivateUserInput;
};


export type MutationDeleteBidRemarkArgs = {
  data: DeleteBidRemarkInput;
};


export type MutationDeleteInvoiceArgs = {
  data: DeleteInvoiceInput;
};


export type MutationDeletePendingJoinRequestsArgs = {
  data: Array<DeletePendingJoinRequestInput>;
};


export type MutationDeleteProjectArgs = {
  data: DeleteProjectInput;
};


export type MutationDeleteProjectBidPermissionsArgs = {
  data: DeleteProjectBidPermissionsInput;
};


export type MutationDeleteProjectDesignArgs = {
  data: DeleteProjectDesignInput;
};


export type MutationDeleteProjectPermissionsArgs = {
  data: DeleteProjectPermissionsInput;
};


export type MutationDeletePurchaseOrderArgs = {
  data: DeletePurchaseOrderInput;
};


export type MutationInviteUsersArgs = {
  data: Array<InviteUserInput>;
};


export type MutationRequestToJoinArgs = {
  data: RequestToJoinInput;
};


export type MutationResetArgs = {
  t?: InputMaybe<Scalars['Int']>;
};


export type MutationResetPasswordArgs = {
  data: ResetPasswordInput;
};


export type MutationResubmitProjectBidArgs = {
  data: ResubmitProjectBidInput;
};


export type MutationSendPasswordResetLinkArgs = {
  data: SendPasswordResetLinkInput;
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


export type MutationUpdateGuestProjectArgs = {
  data: UpdateGuestProjectInput;
};


export type MutationUpdateProjectArgs = {
  data: UpdateProjectInput;
};


export type MutationUpdateProjectBidArgs = {
  data: UpdateProjectBidInput;
};


export type MutationUpdateProjectBidComponentsArgs = {
  data: Array<UpdateProjectBidComponentInput>;
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
  data: Array<UpdateUserPowerInput>;
};


export type MutationUpdateVendorInfoArgs = {
  data: UpdateVendorInfoInput;
};


export type MutationUploadBidRemarkArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadInvoiceArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadProjectDesignArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadPurchaseOrderArgs = {
  file: Scalars['Upload'];
};

export type PermissionedCompany = {
  __typename?: 'PermissionedCompany';
  companyUrl: Scalars['String'];
  contactEmail: Scalars['String'];
  country: Scalars['String'];
  createdAt: Scalars['Date'];
  fax: Scalars['String'];
  id: Scalars['String'];
  isActive: Scalars['Boolean'];
  isVendor: Scalars['Boolean'];
  isVerified: Scalars['Boolean'];
  leadTime?: Maybe<Scalars['Int']>;
  locations?: Maybe<Array<Scalars['String']>>;
  logo: Scalars['String'];
  moq?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  phone: Scalars['String'];
  planInfo: CompanyPlan;
  power: UserPower;
  products?: Maybe<Array<Scalars['String']>>;
  updatedAt: Scalars['Date'];
};

export type PermissionedProject = ProjectInterface & {
  __typename?: 'PermissionedProject';
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  guestEmail?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type PermissionedProjectBid = ProjectBidInterface & {
  __typename?: 'PermissionedProjectBid';
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  permission: ProjectPermission;
  projectId: Scalars['String'];
  remarkFile?: Maybe<BidRemark>;
  status: BidStatus;
  updatedAt: Scalars['Date'];
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
  Premium = 'PREMIUM',
  Test = 'TEST'
}

export type PoDetailCustomerInfo = {
  __typename?: 'PoDetailCustomerInfo';
  companyId: Scalars['String'];
  companyName: Scalars['String'];
};

export type PoDetailVendorInfo = {
  __typename?: 'PoDetailVendorInfo';
  companyId: Scalars['String'];
  companyName: Scalars['String'];
};

export type PostProcessDetail = {
  __typename?: 'PostProcessDetail';
  color?: Maybe<Scalars['String']>;
  estimatedArea?: Maybe<ProductDimension>;
  fontSize?: Maybe<Scalars['String']>;
  isInside?: Maybe<Scalars['Boolean']>;
  numberOfColors?: Maybe<PostProcessPrintingNumberOfColors>;
  postProcessName: Scalars['String'];
  printingMethod?: Maybe<Scalars['String']>;
};

export type PostProcessDetailInput = {
  color?: InputMaybe<Scalars['String']>;
  estimatedArea?: InputMaybe<ProductDimensionInput>;
  fontSize?: InputMaybe<Scalars['String']>;
  isInside?: InputMaybe<Scalars['Boolean']>;
  numberOfColors?: InputMaybe<PostProcessPrintingNumberOfColorsInput>;
  postProcessName: Scalars['String'];
  printingMethod?: InputMaybe<Scalars['String']>;
};

export type PostProcessPrintingNumberOfColors = {
  __typename?: 'PostProcessPrintingNumberOfColors';
  c: Scalars['String'];
  t: Scalars['String'];
};

export type PostProcessPrintingNumberOfColorsInput = {
  c: Scalars['String'];
  t: Scalars['String'];
};

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

export type ProductAndMoq = {
  __typename?: 'ProductAndMoq';
  moq: Scalars['String'];
  product: Scalars['String'];
};

export type ProductAndMoqInput = {
  moq: Scalars['String'];
  product: Scalars['String'];
};

export type ProductDimension = {
  __typename?: 'ProductDimension';
  x: Scalars['String'];
  y: Scalars['String'];
  z?: Maybe<Scalars['String']>;
};

export type ProductDimensionInput = {
  x: Scalars['String'];
  y: Scalars['String'];
  z?: InputMaybe<Scalars['String']>;
};

export type Project = ProjectInterface & {
  __typename?: 'Project';
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  guestEmail?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectBid = ProjectBidInterface & {
  __typename?: 'ProjectBid';
  companyId: Scalars['String'];
  components: Array<ProjectBidComponent>;
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  projectId: Scalars['String'];
  remarkFile?: Maybe<BidRemark>;
  status: BidStatus;
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectBidComponent = {
  __typename?: 'ProjectBidComponent';
  id: Scalars['String'];
  projectBidId: Scalars['String'];
  projectComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPrice>;
  samplingFee: Scalars['Int'];
  toolingFee?: Maybe<Scalars['Int']>;
};

export type ProjectBidForPo = {
  __typename?: 'ProjectBidForPo';
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  projectBidId: Scalars['String'];
};

export type ProjectBidInterface = {
  companyId: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['String'];
  projectId: Scalars['String'];
  status: BidStatus;
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectChangelog = {
  __typename?: 'ProjectChangelog';
  changedAt: Scalars['Date'];
  changes: Array<ProjectPropertyChange>;
  projectId: Scalars['String'];
};

export type ProjectComponent = {
  __typename?: 'ProjectComponent';
  componentSpec: ProjectComponentSpec;
  designs?: Maybe<Array<ProjectDesign>>;
  id: Scalars['String'];
  name: Scalars['String'];
  projectId: Scalars['String'];
};

export type ProjectComponentChangelog = {
  __typename?: 'ProjectComponentChangelog';
  changedAt: Scalars['Date'];
  changes: Array<ProjectComponentPropertyChange>;
  projectComponentId: Scalars['String'];
};

export type ProjectComponentPropertyChange = {
  __typename?: 'ProjectComponentPropertyChange';
  newValue?: Maybe<Scalars['JSON']>;
  oldValue?: Maybe<Scalars['JSON']>;
  projectComponentSpecId?: Maybe<Scalars['String']>;
  propertyName: Scalars['String'];
};

export type ProjectComponentSpec = {
  __typename?: 'ProjectComponentSpec';
  boxStyle?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  dimension: ProductDimension;
  finish?: Maybe<Scalars['String']>;
  flute?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  includeArtworkInQuote?: Maybe<Scalars['Boolean']>;
  insideColor?: Maybe<Scalars['String']>;
  insideFinish?: Maybe<Scalars['String']>;
  insideMaterial?: Maybe<Scalars['String']>;
  insideMaterialSource?: Maybe<Scalars['String']>;
  manufacturingProcess?: Maybe<Scalars['String']>;
  material?: Maybe<Scalars['String']>;
  materialSource?: Maybe<Scalars['String']>;
  numberOfPages?: Maybe<Scalars['String']>;
  outsideColor?: Maybe<Scalars['String']>;
  outsideFinish?: Maybe<Scalars['String']>;
  outsideMaterial?: Maybe<Scalars['String']>;
  outsideMaterialSource?: Maybe<Scalars['String']>;
  postProcess?: Maybe<Array<PostProcessDetail>>;
  productName: Scalars['String'];
  purpose?: Maybe<Scalars['String']>;
  shape?: Maybe<Scalars['String']>;
  style?: Maybe<Scalars['String']>;
  thickness?: Maybe<Scalars['String']>;
};

export enum ProjectCreationMode {
  Advanced = 'ADVANCED',
  Guided = 'GUIDED'
}

export type ProjectDesign = FileInterface & {
  __typename?: 'ProjectDesign';
  fileId: Scalars['String'];
  filename: Scalars['String'];
  url: Scalars['String'];
};

export type ProjectInterface = {
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type ProjectOverview = {
  __typename?: 'ProjectOverview';
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  products: Array<Scalars['String']>;
  targetPrice: Scalars['String'];
};

export enum ProjectPermission {
  Editor = 'EDITOR',
  Owner = 'OWNER',
  Viewer = 'VIEWER'
}

export type ProjectPropertyChange = {
  __typename?: 'ProjectPropertyChange';
  newValue?: Maybe<Scalars['JSON']>;
  oldValue?: Maybe<Scalars['JSON']>;
  propertyName: Scalars['String'];
};

export enum ProjectStatus {
  Closed = 'CLOSED',
  Completed = 'COMPLETED',
  Incomplete = 'INCOMPLETE',
  InProgress = 'IN_PROGRESS',
  Open = 'OPEN',
  Overdue = 'OVERDUE'
}

export type PurchaseOrder = FileInterface & {
  __typename?: 'PurchaseOrder';
  fileId: Scalars['String'];
  filename: Scalars['String'];
  status: PurchaseOrderStatus;
  url: Scalars['String'];
};

export enum PurchaseOrderStatus {
  Accepted = 'ACCEPTED',
  Open = 'OPEN',
  Outdated = 'OUTDATED',
  Rejected = 'REJECTED',
  Void = 'VOID'
}

export type QuantityPrice = {
  __typename?: 'QuantityPrice';
  price: Scalars['String'];
  quantity: Scalars['Int'];
};

export type QuantityPriceInput = {
  price: Scalars['String'];
  quantity: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  checkCompanyName: Scalars['Boolean'];
  checkUserEmail: Scalars['Boolean'];
  getAllPendingJoinRequests: Array<Scalars['String']>;
  getAllPlans: Array<Plan>;
  getAllUsersWithinCompany: Array<GenericUser>;
  getCompanyDetail?: Maybe<CompanyDetail>;
  getCompanyPlanDetail: CompanyPlanDetail;
  getCustomerDetail: CustomerDetail;
  getCustomerPos: Array<CustomerPo>;
  getCustomerProject: CustomerProject;
  getCustomerProjects: Array<CustomerProjectOverview>;
  getGuestProjectDetail?: Maybe<Project>;
  getInvoice?: Maybe<Invoice>;
  getPlan: Plan;
  getProjectBid?: Maybe<ProjectBid>;
  getProjectBidUsers: Array<UserProjectPermission>;
  getProjectBidsForPo: Array<ProjectBidForPo>;
  getProjectChangelog: Array<ProjectChangelog>;
  getProjectComponentChangelog: Array<ProjectComponentChangelog>;
  getProjectDetail?: Maybe<Project>;
  getProjectUsers: Array<UserProjectPermission>;
  getPurchaseOrder?: Maybe<PurchaseOrder>;
  getStatementsLink: Scalars['String'];
  getUser: GenericUser;
  getVendorDetail?: Maybe<VendorDetail>;
  getVendorGuestProject?: Maybe<VendorGuestProject>;
  getVendorGuestProjects: Array<VendorGuestProjectOverview>;
  getVendorPos: Array<VendorPo>;
  getVendorProject?: Maybe<VendorProject>;
  getVendorProjects: Array<VendorProjectOverview>;
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


export type QueryGetAllPendingJoinRequestsArgs = {
  data: GetAllPendingJoinRequestsInput;
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


export type QueryGetCustomerPosArgs = {
  data: GetCustomerPosInput;
};


export type QueryGetCustomerProjectArgs = {
  data: GetCustomerProjectInput;
};


export type QueryGetCustomerProjectsArgs = {
  data: GetCustomerProjectsInput;
};


export type QueryGetGuestProjectDetailArgs = {
  data: GetGuestProjectDetailInput;
};


export type QueryGetInvoiceArgs = {
  data: GetInvoiceInput;
};


export type QueryGetPlanArgs = {
  data: GetPlanInput;
};


export type QueryGetProjectBidArgs = {
  data: GetProjectBidInput;
};


export type QueryGetProjectBidUsersArgs = {
  data: GetProjectBidUsersInput;
};


export type QueryGetProjectBidsForPoArgs = {
  data: GetProjectBidsForPoInput;
};


export type QueryGetProjectChangelogArgs = {
  data: GetProjectChangelogInput;
};


export type QueryGetProjectComponentChangelogArgs = {
  data: GetProjectComponentChangelogInput;
};


export type QueryGetProjectDetailArgs = {
  data: GetProjectDetailInput;
};


export type QueryGetProjectUsersArgs = {
  data: GetProjectUsersInput;
};


export type QueryGetPurchaseOrderArgs = {
  data: GetPurchaseOrderInput;
};


export type QueryGetStatementsLinkArgs = {
  data: GetStatementsLinkInput;
};


export type QueryGetUserArgs = {
  data: GetUserInput;
};


export type QueryGetVendorDetailArgs = {
  data?: InputMaybe<GetVendorDetailInput>;
};


export type QueryGetVendorGuestProjectArgs = {
  data: GetVendorGuestProjectInput;
};


export type QueryGetVendorGuestProjectsArgs = {
  data: GetVendorGuestProjectsInput;
};


export type QueryGetVendorPosArgs = {
  data: GetVendorPosInput;
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

export type RequestToJoinInput = {
  companyName: Scalars['String'];
  email: Scalars['String'];
};

export type ResetPasswordInput = {
  password: Scalars['String'];
  token: Scalars['String'];
  userId: Scalars['String'];
};

export type ResubmitProjectBidInput = {
  projectBidId: Scalars['String'];
};

export type SearchCustomerProjectInput = {
  deliveryDate?: InputMaybe<Scalars['String']>;
  orderQuantities?: InputMaybe<Array<Scalars['String']>>;
  targetPrice?: InputMaybe<Scalars['String']>;
  userInput: Scalars['String'];
};

export type SearchVendorCompanyInput = {
  countries?: InputMaybe<Array<Scalars['String']>>;
  factoryLocations?: InputMaybe<Array<Scalars['String']>>;
  leadTime?: InputMaybe<Scalars['String']>;
  moqMax?: InputMaybe<Scalars['String']>;
  moqMin?: InputMaybe<Scalars['String']>;
  userInput: Scalars['String'];
};

export type SendPasswordResetLinkInput = {
  email: Scalars['String'];
};

export type StripeCustomerInfo = {
  customerId: Scalars['String'];
  subscriptionId: Scalars['String'];
};

export type StripePaymentIntent = {
  __typename?: 'StripePaymentIntent';
  clientSecret: Scalars['String'];
  customerId: Scalars['String'];
  subscriptionId: Scalars['String'];
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

export type UpdateGuestProjectInput = {
  componentIdsToDelete: Array<Scalars['String']>;
  componentsForCreate: Array<CreateProjectComponentInput>;
  componentsForUpdate: Array<UpdateProjectComponentData>;
  projectData: UpdateProjectData;
};

export type UpdateProjectBidComponentInput = {
  bidComponentId: Scalars['String'];
  quantityPrices: Array<QuantityPriceInput>;
  samplingFee: Scalars['Int'];
  toolingFee?: InputMaybe<Scalars['Int']>;
};

export type UpdateProjectBidInput = {
  bidRemarkFileId?: InputMaybe<Scalars['String']>;
  projectBidId: Scalars['String'];
  projectId: Scalars['String'];
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

export type UpdateProjectComponentData = {
  componentId: Scalars['String'];
  componentSpec: UpdateProjectComponentSpecData;
  designIds: Array<Scalars['String']>;
  name: Scalars['String'];
};

export type UpdateProjectComponentSpecData = {
  boxStyle?: InputMaybe<Scalars['String']>;
  color?: InputMaybe<Scalars['String']>;
  componentSpecId: Scalars['String'];
  dimension: ProductDimensionInput;
  finish?: InputMaybe<Scalars['String']>;
  flute?: InputMaybe<Scalars['String']>;
  includeArtworkInQuote?: InputMaybe<Scalars['Boolean']>;
  insideColor?: InputMaybe<Scalars['String']>;
  insideFinish?: InputMaybe<Scalars['String']>;
  insideMaterial?: InputMaybe<Scalars['String']>;
  insideMaterialSource?: InputMaybe<Scalars['String']>;
  manufacturingProcess?: InputMaybe<Scalars['String']>;
  material?: InputMaybe<Scalars['String']>;
  materialSource?: InputMaybe<Scalars['String']>;
  numberOfPages?: InputMaybe<Scalars['String']>;
  outsideColor?: InputMaybe<Scalars['String']>;
  outsideFinish?: InputMaybe<Scalars['String']>;
  outsideMaterial?: InputMaybe<Scalars['String']>;
  outsideMaterialSource?: InputMaybe<Scalars['String']>;
  postProcess?: InputMaybe<Array<PostProcessDetailInput>>;
  productName: Scalars['String'];
  purpose?: InputMaybe<Scalars['String']>;
  shape?: InputMaybe<Scalars['String']>;
  style?: InputMaybe<Scalars['String']>;
  thickness?: InputMaybe<Scalars['String']>;
};

export type UpdateProjectData = {
  category: Scalars['String'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  projectId: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
};

export type UpdateProjectInput = {
  componentIdsToDelete: Array<Scalars['String']>;
  componentsForCreate: Array<CreateProjectComponentInput>;
  componentsForUpdate: Array<UpdateProjectComponentData>;
  projectData: UpdateProjectData;
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
  power: UserPower;
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
  name: Scalars['String'];
  phone: Scalars['String'];
  productsAndMoq: Array<ProductAndMoqInput>;
};

export type UserInterface = {
  companyId: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['String'];
  isVendor: Scalars['Boolean'];
  name: Scalars['String'];
  power: UserPower;
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export enum UserPower {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UserProjectPermission = {
  __typename?: 'UserProjectPermission';
  email: Scalars['String'];
  name: Scalars['String'];
  permission: ProjectPermission;
  userId: Scalars['String'];
};

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

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
  name: Scalars['String'];
  phone: Scalars['String'];
  productsAndMoq: Array<ProductAndMoq>;
};

export type VendorGuestProject = ProjectInterface & {
  __typename?: 'VendorGuestProject';
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  guestEmail: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type VendorGuestProjectOverview = {
  __typename?: 'VendorGuestProjectOverview';
  category: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  guestEmail: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
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
  name: Scalars['String'];
  products: Array<Scalars['String']>;
};

export type VendorPo = {
  __typename?: 'VendorPo';
  permission: ProjectPermission;
  poDetails: Array<VendorPoDetail>;
  projectInfo: VendorPoProjectInfo;
};

export type VendorPoDetail = {
  __typename?: 'VendorPoDetail';
  customerInfo: PoDetailCustomerInfo;
  invoiceFile?: Maybe<Invoice>;
  poFile: PurchaseOrder;
  projectBidId: Scalars['String'];
};

export type VendorPoProjectInfo = {
  __typename?: 'VendorPoProjectInfo';
  projectId: Scalars['String'];
  projectName: Scalars['String'];
};

export type VendorProject = ProjectInterface & {
  __typename?: 'VendorProject';
  bidInfo: PermissionedProjectBid;
  category: Scalars['String'];
  companyId: Scalars['String'];
  companyName: Scalars['String'];
  components: Array<ProjectComponent>;
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: ProjectStatus;
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

export type VendorProjectOverview = {
  __typename?: 'VendorProjectOverview';
  bidId: Scalars['String'];
  bidStatus: BidStatus;
  category: Scalars['String'];
  companyName: Scalars['String'];
  createdAt: Scalars['Date'];
  deliveryAddress: Scalars['String'];
  deliveryDate: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  orderQuantities: Array<Scalars['Int']>;
  permission: ProjectPermission;
  status: Scalars['String'];
  targetPrice: Scalars['String'];
  totalWeight: Scalars['String'];
  updatedAt: Scalars['Date'];
  userId: Scalars['String'];
};

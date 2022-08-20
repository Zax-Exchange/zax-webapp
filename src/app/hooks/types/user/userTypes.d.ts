// for useUserData hook
export interface GetUserData {
  getUserWithUserId: UserOverview
}
export interface UserOverview {
  id: string;
  name: string;
  email: string;
  companyId: string;
  isActive: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    companyId: string;
    isVendor: boolean;
    isAdmin: boolean;
    isActive: boolean;
  }

export interface LoggedInUser extends User {
  token: string;
  notificationToken?: string;
  chatToken?: string;
}

export interface UserLoginInput {
  email: string;
  password: string;
}

export interface UserRegisterInput {
  name: string;
  email: string;
  password: string;
  companyId: string;
}
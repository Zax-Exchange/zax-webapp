import { File } from "../common/file";
import * as enums from "../common/enums";

export interface ProjectUserData {
  userId: string;
  email: string;
  name: string;
  permission: enums.ProjectPermission;
}

export interface QuantityPrice {
  quantity: number;
  price: number;
}

// project for public view
export interface ProjectOverview {
  id: string;
  companyName: string;
  companyId: string;
  name: string;
  deliveryDate: string;
  deliveryAddress: string;
  budget: number;
  materials: string[];
  createdAt: Date;
}

export interface Project extends ProjectOverview {
  userId: string;
  status: enums.ProjectStatus;
  design?: File;
  components: ProjectComponent[];
  updatedAt: Date;
}

export interface PermissionedProject extends Project {
  permission: enums.ProjectPermission;
}

export interface VendorProject extends PermissionedProject {
  customerName: string;
  bidInfo: PermissionedProjectBid;
}

export interface CustomerProject extends PermissionedProject {
  bids: ProjectBid[] | [];
}

export interface ProjectComponent {
  id: string;
  projectId: string;
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBid {
  id: string;
  userId: string;
  companyId: string;
  projectId: string;
  components: ProjectBidComponent[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectBidComponent {
  id: string;
  projectComponentId: string;
  quantityPrices: QuantityPrice[];
}

export interface PermissionedProjectBid extends ProjectBid{
  permission: enums.ProjectPermission;

}

export interface SearchProjectInput {
  userInput: string; // should contain material names
  deliveryCountries?: string[];
  deliveryCities?: string[];
  budget?: number; // <= 10000, <= 30000, <= 50000, <= 100000
  leadTime?: number; // 3, 6, 9, 12
}
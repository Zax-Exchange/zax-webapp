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

export interface VendorProject extends Project {
  customerName: string;
  bidInfo: PermissionedProjectBid;
}

export interface CustomerProject extends Project {
  permission: enums.ProjectPermission;
  bids: ProjectBid[] | [];
}

export interface ProjectComponent {
  id: string;
  projectId: string;
  name: string;
  materials: string[];
  dimension: string;
  postProcess: string;
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

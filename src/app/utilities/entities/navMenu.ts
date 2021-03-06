export interface NavMenuItem {
  name: string;
  id: string;
  icon?: string;
  checkIcon?: string;
  selected?: boolean;
  route?: string;
  children?: NavMenuItem[];
  isShow?: boolean;
  breadcrumbList?:string[];
  isopen?:boolean;
}

export declare type NavMenu = NavMenuItem[];

export interface TreeNodeInterface {
  id: number;
  name: string;
  code: string;
  level: number;
  parentId: number;
  expand: boolean;
  children?: TreeNodeInterface[];
}

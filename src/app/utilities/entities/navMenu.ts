export interface NavMenuItem {
    name: string;
    id: string;
    icon?: string;
    checkIcon?: string;
    selected?: boolean;
    route?: string;
    children?: NavMenuItem[];
}

export declare type NavMenu = NavMenuItem[];
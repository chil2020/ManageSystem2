export interface EmployeeBasic {
    id: number;
    name: string;
    position: string;
    profession: string;
    dept: string;
    company: string;
    updateTime: string;
    deleted: boolean;
    image: File;
    imagePath: string;
}

export interface EmployeeContact {
    id: number;
    address: string;
    phone: string;
    email: string;
    employeeBasic: EmployeeBasic;
    deleted: boolean;
}

export interface EmployeeEducation {
    id: number;
    school: string;
    education: string;
    department: string;
    status: string;
    region: string;
    employeeBasic: EmployeeBasic;
    deleted: boolean;
}

export interface EmployeeExperience {
    id: number;
    institution: string;
    unit: string;
    position: string;
    during: string;
    employeeBasic: EmployeeBasic;
    deleted: boolean;
}

export interface EmployeePosition {
    id: number;
    institution: string;
    unit: string;
    position: string;
    employeeBasic: EmployeeBasic;
    deleted: boolean;
}

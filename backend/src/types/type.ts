export type LoggerType ={
    level: string;
    message: string;
    label: string;
    timestamp: string;
}

export type mailerType={
    toMail:string;
    subject:string;
    text:string;
    body:string
}


export type SupportedMimeType = 'png' | 'heic' | 'jpg' | 'gif' | 'svg' | 'jpeg';

// Define Task schema
export interface ITask  {
    name: string;
    category:string;
    description:string;

    
}

// Define Performance schema
export interface IPerformance  {
    level:string;
    rating:string;
    details:string
}

// Define Employee schema
export interface IEmployee {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    role:EmployeeRole;
    otp: string;
    status: EmployeeStatus;
}

// Define enum for employee status
 enum EmployeeStatus {
    Pending = 'Pending',
    Active = 'Active',
    Inactive = 'Inactive',
}

enum EmployeeRole{
    Admin="Admin",
    Employee="Employee",
    SuperAdmin="SuperAdmin"
}
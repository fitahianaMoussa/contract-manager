interface Timestamp {
    created_at: string;
    updated_at?: string;
}

export interface User extends Timestamp {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    email_verified_at: string;
    can: Record<string, any>;
    role:
        | "ROLE_ADMIN"
        | "ROLE_COLLABORATOR"
        | "ROLE_BROKER"
        | "ROLE_BROKER_COLLABORATOR"
        | "ROLE_BROKER_MANAGER"
        | "ROLE_SUPERUSER";
    is_active: boolean;
    phone?: string;
    firm_name?: string;
    firm_address?: string;
    clients?: Array<Client>;
}

export interface Collaborator extends User {
    role: "ROLE_COLLABORATOR";
}

export interface Broker extends User {
    role: "ROLE_BROKER";
    broker_id?: number;
}

export interface BrokerCollaborator extends User {
    role: "ROLE_BROKER_COLLABORATOR";
    broker_id?: number;
}

export interface BrokerManager extends User {
    role: "ROLE_BROKER_MANAGER";
    broker_id?: number;
}

export interface Client extends Timestamp {
    id: number;
    broker: Broker;
    first_name: string;
    last_name: string;
    date_of_birth: Date;
    social_security_number: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    zip_code: string;
    spouse_first_name?: string;
    spouse_last_name?: string;
    spouse_date_of_birth?: string;
    spouse_social_security_number?: string;
    spouse_email?: string;
    spouse_phone?: string;
    bank_details?: string;
    insured_person: InsuredPerson;
    regime: Regime;
}

export interface Company extends Timestamp {
    id: number;
    broker: Broker;
    products: Array<any>;
    name: string;
    email: string;
    phone: string;
    street: string;
    city: string;
    country: string;
    description: string;
    zip_code: string;
}

export interface Product extends Timestamp {
    id: number;
    name: string;
    description: string;
    company: Company;
}

export interface Contract extends Timestamp {
    id: number;
    client: Client;
    product: Product;
    status: "active" | "cancelled" | "suspended";
    payment_frequency: "monthly" | "quaterly" | "annual";
    start_date: Date;
    end_date: Date;
    due_date: Date;
    amount: string;
    administration_fees?: string;
    reference?: string;
    description: string;
    attachments?: File[];
}

export interface Zone extends Timestamp {
    id: number;
    broker: Broker;
    name: string;
}

export interface Option extends Timestamp {
    id: number;
    broker: Broker;
    name: string;
}

export interface Age extends Timestamp {
    id: number;
    broker: Broker;
    value: number;
}

export interface Location extends Timestamp {
    id: number;
    zone: Zone;
    broker: Broker;
    name: string;
    zip_code: string;
    country: string;
}

export interface Price extends Timestamp {
    id: number;
    broker: Broker;
    zone: Zone;
    option: Option;
    age: Age;
    value: number;
}
export interface Regulation {
    id: number;
    title: string;
    content: string;
}
export interface Prospect {
    id: number;
    broker: Broker;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    description: string;
    status: "qualified" | "unqualified" | "converted";
    phone: string;
    address: string;
    city: string;
    country: string;
    postal_code: string;
    social_security_number: string;
    street: string;
}
export type ResponseResource<T> = {
    data: Array<T>;
    links: Record<string, any>;
    meta: Record<string, any>;
};

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    flash: {
        message?: {
            type: "info" | "success" | "warning" | "error";
            content: string;
            status?: number;
            context?: string;
        };
    };
};

export type AuthProps = {
    auth: {
        user: User;
    };
};

export type ColumnsProps<T> = {
    onEdit: (data: T) => void;
    onDelete: (data: T) => void;
};
export type Regime =
    | "independent"
    | "farmer"
    | "retired_employee"
    | "retired_self_employed"
    | "student"
    | "unemployed"
    | "civil_servant"
    | "agricultural_worker";
export type InsuredPerson =
    | "client"
    | "spouse"
    | "child"
    | "client_and_spouse"
    | "client_and_child"
    | "client_and_spouse_and_child";

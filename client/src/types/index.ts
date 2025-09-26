// Describes the structure of a single user object from the API
export interface User {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
    phone?: string;
    job_title?: string;
    company?: string;
    city?: string;
    country?: string;
    website?: string;
    bio?: string;
}

// Describes the response object from the login endpoint
export interface AuthResponse {
    _id: string;
    email: string;
    first_name: string;
    last_name: string;
    token: string;
}


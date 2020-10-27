 export interface IUser {
    id: number;
    email: string;
    password?: string;
    role?: 'student' | 'teacher';
    name?: string;
    score?: number;
    description?: string;
}

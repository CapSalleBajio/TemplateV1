 export interface IUser {
    id?: number;
    _id?: string;
    email: string;
    password?: string;
    role?: 'student' | 'teacher';
    name?: string;
    score?: number;
    description?: string;
    profilePicture?: string;
}

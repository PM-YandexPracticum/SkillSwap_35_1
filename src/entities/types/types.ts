export interface ISkill {
    category: string;
    subcategory: string;
    title: string;
    description: string;
    images?: string[];
};

export interface IDesiredSkill {
    category: string;
    subcategory: string;
}

export interface IUser {
    id: string;
    email: string;
    password: string;
    name: string;
    about: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    city: string;
    image?: string;
    can: ISkill;
    want: IDesiredSkill[];
    likeCount: number;
    createdAt: string;
};

export interface IUserPublic extends Omit<IUser, 'email' | 'password'> {};
export const API_BASE_URL = 'https://bad-api.tannergriffin.com/';

export interface Post {
    title: string;
    description: string;
    id?: number;
    votes?: number;
}
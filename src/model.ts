export const API_BASE_URL = 'http://ec2-3-139-93-164.us-east-2.compute.amazonaws.com:3000';

export interface Post {
    title: string;
    description: string;
    id?: number;
    votes?: number;
}
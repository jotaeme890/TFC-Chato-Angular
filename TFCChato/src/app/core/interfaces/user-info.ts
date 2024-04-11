import { Photo } from "./data";

export interface UserCredentials{
    email:string,
    password:string
}

export interface User {
    name: string;
    surname: string;
    picture?: Photo;
    email: string;
    role: string;
    username: string;
    uuid?: string;
}

export interface UserRegisterInfo{
    name: string;
    surname: string;
    username: string;
    email: string;
    password:string;
    role: string;
}
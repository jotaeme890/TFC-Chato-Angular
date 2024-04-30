import { Photo } from "./data";

export interface UserCredentials{
    email:string,
    password:string
}

export interface UserInfo {
    name: string;
    surname: string;
    picture?: string;
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
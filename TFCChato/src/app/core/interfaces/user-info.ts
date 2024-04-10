import { Photo } from "./data";

export interface UserCredentials{
    email:string,
    password:string
}

export interface User {
    name: string;
    firstSurname: string,
    secondSurname: string,
    picture?: Photo;
    email?: string;
    uuid?: string;
    role: string
}

export interface UserRegisterInfo{
    name: string,
    firstSurname: string,
    secondSurname: string,
    email: string,
    password:string,
    role: string
}
import { Photo } from "./data";

export interface UserCredentials{
    username:string,
    password:string
}

export interface User {
    name?: string;
    firtsSurname: string,
    secondSurname: string,
    picture?: Photo;
    email?: string;
    uuid?: string
}
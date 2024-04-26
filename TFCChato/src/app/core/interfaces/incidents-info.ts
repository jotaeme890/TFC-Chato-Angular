import { Photo } from "./data";

export interface incidentInfo {
    checked: boolean,
    date: Date,
    description: string,
    image: Photo,
    resolved: boolean,
    title: string,
    userName: string,
    uuid: string
}
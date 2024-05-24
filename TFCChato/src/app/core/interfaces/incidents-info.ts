import { Timestamp } from "firebase/firestore";
import { Photo } from "./data";

export interface incidentInfo {
    checked: boolean,
    date: Timestamp,
    description: string,
    image: Photo,
    resolved: boolean,
    title: string,
    userId: string,
    uuid: string,
    categoryName: string
}
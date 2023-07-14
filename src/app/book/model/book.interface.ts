import { Time } from "@angular/common";

export interface Book { //desativar pois é igual ao details
    id: number;
    userId: number;
    userName: string;
    dateBook: Date;
    startTimeBook: string;
    finishTimeBook: string;
}

export interface BookAvailableResponse {
    [key: string]: BookAvailableDTO;
}

export interface BookAvailableDTO {
    dateBook: Date;
    startTimeBook: Time;
    finishTimeBook: Time;
    bookDetails: BookDetailsDTO[];
}

export interface BookDetailsDTO {
    id: number;
    userId: number;
    userName: string;
    dateBook: Date;
    startTimeBook: string;
    finishTimeBook: string;
}
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { Availability } from './../../availability/models/availability.interface';
import { Time } from "@angular/common";
import { User } from 'src/app/user/models/user.interface';

export interface Book { 
    id: number;
    // availability: Availability;
    // treatment : Treatment;
    //availabilityId: number;
    treatmentId:  number;
    dateBook: Date;
    startTimeBook: string;
    finishTimeBook: string;
    workerUserId: number;
    //clientUser: User;
    treatmentName: string;
    workerUserFirstName: string;
    clientUserId: number | null;
    clientUserFirstName: string | null;
    status: string;
    observation: string | null;
    createdDate: string | null;


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


export interface BookWithIndex extends Book {
    [key: string]: any;
  }
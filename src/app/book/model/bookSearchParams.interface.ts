import { Treatment } from "src/app/treatment/models/treatment.interface";
import { User } from "src/app/user/models/user.interface";

export interface BookSearchParams {
    user:User | null;
    treatment: Treatment;
    dateBook: string;
}    


export interface BookFilterParams {
    dateBook: string | null;
    status: string | null;
    clientId: number | null;
    workerId: number | null;
}
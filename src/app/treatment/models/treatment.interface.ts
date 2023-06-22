import { TreatmentType } from "./treatment-type.interface";

export interface Treatment{
    id: number;
    name:string;
    description:string;
    price: number;
    type:TreatmentType;
}
import { Treatment } from "src/app/treatment/models/treatment.interface";
import { User } from "src/app/user/models/user.interface"

export interface Availability{
  id: number;
  // monday: boolean;
  // tuesday: boolean;
  // wednesday: boolean;
  // thursday: boolean;
  // friday: boolean;
  // saturday: boolean;
  // sunday: boolean;
  user: User;
  startDate: Date;
  finishDate: Date;
  treatments: Treatment[];
  hourStartTime:string;
  hourFinishTime:string;

}
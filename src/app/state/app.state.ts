import { BookState } from './../book/state/book.reducers';
import { AvailabilityState } from './../availability/state/availability.reducers';
import { TreatmentState } from './../treatment/state/treatment.reducers';
import { UserState } from "../user/state/user.reducers";
import { TreatmentTypeState } from '../treatment-type/state/treatment-type.reducers';

export interface AppState{
    userState : UserState,
    treatmentState: TreatmentState,
    treatmentTypeState: TreatmentTypeState,
    availabilityState: AvailabilityState,
    BookState: BookState,
}
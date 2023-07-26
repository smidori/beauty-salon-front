import { InvoiceState } from '../invoice/state/invoice.reducers';
import { TreatmentTypeState } from '../treatment-type/state/treatment-type.reducers';
import { UserState } from "../user/state/user.reducers";
import { AvailabilityState } from './../availability/state/availability.reducers';
import { BookState } from './../book/state/book.reducers';
import { TreatmentState } from './../treatment/state/treatment.reducers';

export interface AppState{
    userState : UserState,
    treatmentState: TreatmentState,
    treatmentTypeState: TreatmentTypeState,
    availabilityState: AvailabilityState,
    BookState: BookState,
    InvoiceState: InvoiceState
}
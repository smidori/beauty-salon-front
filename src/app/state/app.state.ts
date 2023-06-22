import { TreatmentState } from './../treatment/state/treatment.reducers';
import { UserState } from "../user/state/user.reducers";

export interface AppState{
    userState : UserState,
    treatmentState: TreatmentState
}
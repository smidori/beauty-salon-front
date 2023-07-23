import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Availability } from '../../models/availability.interface';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { TreatmentActions } from 'src/app/treatment/state/treatment.actions';
import { AvailabilityActions } from '../../state/availability.action';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { selectAvailabilities, selectAvailability } from '../../state/availability.selectors';
import { selectTreatments } from 'src/app/treatment/state/treatment.selectors';
import { selectUsers } from 'src/app/user/state/user.selectors';
import { User } from 'src/app/user/models/user.interface';
import { UserActions } from 'src/app/user/state/user.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  //properties
  menuTitle: string = 'Create Availability';
  availability$: Observable<Availability | undefined>;
  availability: Availability | null = null;


  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());

  test$ = this.store.select(selectAvailabilities());

  users: ReadonlyArray<User> = [];
  users$ = this.store.select(selectUsers());

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) {

    //properties
    const id = this.acRouter.snapshot.params['id'];
    this.availability$ = this.store.select(selectAvailability(id));

    //subscribe the availability$
    this.availability$.subscribe(data => {
      if (data) {
        this.menuTitle = "Update Availability";
        this.availability = data;
      }
    });
  }


  ngOnInit(): void {
    //GET TREATMENT LIST - dispatch the action
    this.store.dispatch({ type: TreatmentActions.GET_TREATMENT_LIST });
    this.treatments$.subscribe((data) => {
      this.treatments = data;
    });

    //GET USERS LIST - dispatch the action
    this.store.dispatch({ type: UserActions.GET_USER_LIST });
    this.users$.subscribe((data) => {
      this.users = data;
    })
  }

  //actions that can be executed
  formAction(data: { value: Availability, action: string }) {
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: AvailabilityActions.ADD_AVAILABILITY_API, payload: data.value });
        return;
      }
      case "Update": {
        this.store.dispatch({ type: AvailabilityActions.UPDATE_AVAILABILITY_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

  //navigate to the page
  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["availabilities", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["availabilities", "list"]);
        return;
      }
      default: ""
    }
  }


}


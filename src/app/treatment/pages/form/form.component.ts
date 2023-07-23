import { Component, OnInit } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Treatment } from '../../models/treatment.interface';
import { selectTreatment, selectTreatments } from '../../state/treatment.selectors';
import { TreatmentActions } from '../../state/treatment.actions';
import { TreatmentType } from '../../models/treatment-type.interface';
import { selectTreatmentTypes } from 'src/app/treatment-type/state/treatment-type.selectors';
import { TreatmentTypeActions, getTreatmentTypeList } from 'src/app/treatment-type/state/treatment-type.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  menuTitle: string = 'Create Treatment';
  treatment$: Observable<Treatment | undefined>;
  treatment: Treatment | null = null;

  treatmentTypes: ReadonlyArray<TreatmentType> = [];
  treatmentTypes$ = this.store.select(selectTreatmentTypes());


  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) {

    //get id from the url
    const id = this.acRouter.snapshot.params['id'];

    //use the selector to get the object from store
    this.treatment$ = this.store.select(selectTreatment(id));

    //assign the value to this.treatment
    this.treatment$.subscribe(data => {
      if (data) {
        this.menuTitle = "Update Treatment";
        this.treatment = data;
      }
    });
  }


  ngOnInit(): void {
    //dispatch the action
    this.store.dispatch({ type: TreatmentTypeActions.GET_TREATMENT_TYPE_LIST });

    //subscribe the treatmentTypes$
    this.treatmentTypes$.subscribe((data) => {
      this.treatmentTypes = data;
    })
  }


  //actions that can be executed
  formAction(data: { value: Treatment, action: string }) {
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: TreatmentActions.ADD_TREATMENT_API, payload: data.value });
        return;
      }
      case "Update": {
        this.store.dispatch({ type: TreatmentActions.UPDATE_TREATMENT_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

  //navigate to the page
  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["treatments", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["treatments", "list"]);
        return;
      }
      default: ""
    }
  }

}

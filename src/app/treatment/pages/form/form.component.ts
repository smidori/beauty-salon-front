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
  treatment$: Observable<Treatment | undefined>;
  treatment: Treatment | null = null;
  
  
  treatmentTypes: ReadonlyArray<TreatmentType> = [];
  treatmentTypes$ = this.store.select(selectTreatmentTypes());
  

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) {
    const id = this.acRouter.snapshot.params['id'];
    this.treatment$ = this.store.select(selectTreatment(id));
    this.treatment$.subscribe(d => {
      if (d) {
        this.treatment = d;
      }
    });
  }


  ngOnInit(): void {
    
    this.store.dispatch({type: TreatmentTypeActions.GET_TREATMENT_TYPE_LIST});
    this.treatmentTypes$.subscribe((data) => {
      this.treatmentTypes = data;
    })
  }


  formAction(data: { value: Treatment, action: string }) {
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: TreatmentActions.ADD_TREATMENT_API, payload: data.value });
        return;
      }
      case "Update": {
        console.log("*********** update treatment => " + JSON.stringify(data.value));
        this.store.dispatch({ type: TreatmentActions.UPDATE_TREATMENT_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

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
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }


}

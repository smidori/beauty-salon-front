import { Component, OnInit } from '@angular/core';
import { TreatmentType } from '../../models/treatment-type.interface';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { TreatmentTypeActions } from '../../state/treatment-type.actions';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { selectTreatmentType } from '../../state/treatment-type.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  treatmentType$: Observable<TreatmentType | undefined>;
  treatmentType: TreatmentType | null = null;
  
  
  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) {
    const id = this.acRouter.snapshot.params['id'];
    this.treatmentType$ = this.store.select(selectTreatmentType(id));
    this.treatmentType$.subscribe(d => {
      if (d) {
        this.treatmentType = d;
      }
    });   
  }


  ngOnInit(): void {
    
    
  }


  formAction(data: { value: TreatmentType, action: string }) {
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: TreatmentTypeActions.ADD_TREATMENT_TYPE_API, payload: data.value });
        return;
      }
      case "Update": {
        this.store.dispatch({ type: TreatmentTypeActions.UPDATE_TREATMENT_TYPE_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["treatment-types", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["treatment-types", "list"]);
        return;
      }
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }


}
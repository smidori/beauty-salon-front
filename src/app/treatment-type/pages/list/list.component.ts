import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { TreatmentType } from '../../models/treatment-type.interface';
import { selectTreatmentTypes } from '../../state/treatment-type.selectors';
import { TreatmentTypeActions } from '../../state/treatment-type.actions';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { TreatmentTypeService } from '../../services/treatment-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  treatmentTypes: ReadonlyArray<TreatmentType> = [];
  treatmentTypes$ = this.store.select(selectTreatmentTypes());

  headers: { headerName: string, fieldName: keyof TreatmentType, treatmentTypeName?: keyof TreatmentType }[] = [
    //{ headerName: "Id", fieldName: "id" },
    { headerName: "Name", fieldName: "name" },
  ];
  

  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private treatmentTypeService: TreatmentTypeService,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.store.dispatch({type: TreatmentTypeActions.GET_TREATMENT_TYPE_LIST})
    this.assignTreatmentTypes();
    this.treatmentTypeService.onError().subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
        });
      }
    });
  }

  assignTreatmentTypes() {
    this.treatmentTypes$.subscribe((data) => {
      this.treatmentTypes = data;
    })
  }

  
  selectTreatmentType(data: {treatmentType: TreatmentType, action : TableActions}){
    switch(data.action){
      case TableActions.View :{
        this.router.navigate(['treatment-types', 'form', data.treatmentType.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: TreatmentTypeActions.DELETE_TREATMENT_TYPE_API, payload: data.treatmentType.id});
        return;
      }
      default: ""
    }
  }

  

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["treatment-types","form"]);
        return;
      }
      case CommandBarActions.List :{
        this.router.navigate(["treatment-types","list"]);
        return;
      }
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }

   

}

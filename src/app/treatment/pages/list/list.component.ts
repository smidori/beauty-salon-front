import { selectTreatment, selectTreatments } from './../../state/treatment.selectors';
import { Component, OnInit } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { TreatmentActions } from '../../state/treatment.actions';
import { TableActions } from '../../enums/table-actions.enum';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { TreatmentType } from '../../models/treatment-type.interface';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { UserService } from 'src/app/user/services/user.service';
import { TreatmentService } from '../../services/treatment.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());
  isVisibleCreate = false;
  isVisibleList = false;

  //headers used to show in the list 
  headers: { headerName: string, fieldName: keyof Treatment, treatmentTypeName?: keyof TreatmentType }[] = [
    { headerName: "Name", fieldName: "name" },
    { headerName: "Description", fieldName: "description" },
    { headerName: "Price", fieldName: "price" },
    { headerName: "Type", fieldName: "type", treatmentTypeName: "name" },
    { headerName: "Duration(min)", fieldName: "duration" }
  ];
  

  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private authService: AuthenticateService,
    private treatmentService: TreatmentService,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.store.dispatch({type: TreatmentActions.GET_TREATMENT_LIST})
    this.assignTreatments();

    this.treatmentService.onError().subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
        });
      }
    });

    this.isVisibleCreate = this.authService.isAdmin();
    this.isVisibleList = this.authService.isAdmin();
  }

  //assign the treatments from the service to the variable
  assignTreatments() {
    this.treatments$.subscribe((data) => {
      this.treatments = data;
      // if (this.treatments && this.treatments.length > 0) {
      //   console.log("data treatments => " + JSON.stringify(data));
      // }
    })
  }

  //select treatment from the list
  selectTreatment(data: {treatment: Treatment, action : TableActions}){
    switch(data.action){
      case TableActions.View :{
        this.router.navigate(['treatments', 'form', data.treatment.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: TreatmentActions.DELETE_TREATMENT_API, payload: data.treatment.id});
        return;
      }
      default: ""
    }
  }

  
  //navigate to the page
  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["treatments","form"]);
        return;
      }
      case CommandBarActions.List :{
        this.router.navigate(["treatments","list"]);
        return;
      }
      default: ""
    }
  }

   

}

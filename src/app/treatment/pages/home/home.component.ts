import { Component, OnInit } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { TreatmentActions } from '../../state/treatment.actions';
import { TableActions } from '../../enums/table-actions.enum';
import { selectTreatments } from '../../state/treatment.selectors';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());
  headers:{headerName: string, fieldName: keyof Treatment}[] = [
    {headerName: "Name", fieldName: "name"},
    {headerName: "Description", fieldName: "description"},
    {headerName: "Price", fieldName: "price"}    
  ]

  constructor(
    private router: Router, 
    private store: Store<AppState>){}

  ngOnInit(): void {
    this.store.dispatch({type: TreatmentActions.GET_TREATMENT_LIST})
    this.assignTreatments();
  }

  
  selectTreatment(data: {treatment: Treatment, action : TableActions}){
    switch(data.action){
      case TableActions.View :{
        this.router.navigate(['treatments', 'form', data.treatment.id]);
        return;
      }
      default: ""
    }
  }

  assignTreatments() {
    this.treatments$.subscribe((data) => {
      this.treatments = data;
    })
  }

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
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }
}

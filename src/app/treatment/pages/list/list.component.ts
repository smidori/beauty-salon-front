import { selectTreatment, selectTreatments } from './../../state/treatment.selectors';
import { Component, OnInit } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { TreatmentActions } from '../../state/treatment.actions';
import { TableActions } from '../../enums/table-actions.enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
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
    console.log("==================> list components ngOnInit");
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

  // executeCommandBarAction(action: CommandBarActions){
  //   switch(action){
  //     case CommandBarActions.Create :{
  //       this.router.navigate(["users","form"]);
  //       return;
  //     }
  //     // case CommandBarActions.DeleteAll :{
  //     //   return;
  //     // }
  //     default: ""
  //   }
  // }

   

}

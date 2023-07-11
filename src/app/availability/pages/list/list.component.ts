import { Component, OnInit } from '@angular/core';
import { Availability } from '../../models/availability.interface';
import { selectAvailabilities } from '../../state/availability.selectors';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { AvailabilityActions } from '../../state/availability.action';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { User } from 'src/app/user/models/user.interface';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  availabilities: ReadonlyArray<Availability> = [];
  availabilities$ = this.store.select(selectAvailabilities());
  
  
  headers: { headerName: string, fieldName: keyof Availability, userName?: (keyof User)[] }[] = [
    { headerName: "User", fieldName: "user", userName: ["firstName", "lastName"] },
    //{ headerName: "Id", fieldName: "id" },
    // { headerName: "Sunday", fieldName: "sunday" },
    // { headerName: "Monday", fieldName: "monday" },
    // { headerName: "Tuesday", fieldName: "tuesday" },
    // { headerName: "Wednesday", fieldName: "wednesday" },
    // { headerName: "Thursday", fieldName: "thursday" },
    // { headerName: "Friday", fieldName: "friday" },
    // { headerName: "Saturday", fieldName: "saturday" },
    { headerName: "S", fieldName: "sunday" },
    { headerName: "M", fieldName: "monday" },
    { headerName: "T", fieldName: "tuesday" },
    { headerName: "W", fieldName: "wednesday" },
    { headerName: "T", fieldName: "thursday" },
    { headerName: "F", fieldName: "friday" },
    { headerName: "S", fieldName: "saturday" },
    
    { headerName: "Start Date", fieldName: "startDate" },
    //{ headerName: "Finish Date", fieldName: "finishDate" }, //não exibir na list para ter sempre 1 nulo que é o atual
    { headerName: "Treatments", fieldName: "treatments" },

  ];
  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
  ){console.log("availability constructor");}

  ngOnInit(): void {  
    console.log("availability ngOnInit");
    this.store.dispatch({ type: AvailabilityActions.GET_AVAILABILITY_LIST});
    this.assignAvailabilities();
  }

  assignAvailabilities() {
    this.availabilities$.subscribe((data) => {
      this.availabilities = data;
    });
  }

  selectAvailability(data: {availability: Availability, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        this.router.navigate(['availabilities', 'form', data.availability.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: AvailabilityActions.DELETE_AVAILABILITY_API, payload: data.availability.id});
        return;
      }
      default: ""
    }

    //this.router.navigate(['users', 'form', data.user.id]);
  }

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["availabilities","form"]);
        return;
      }
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }
}

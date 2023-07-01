import { Component, OnInit } from '@angular/core';
import { Availability } from '../../models/availability.interface';
import { selectAvailabilities } from '../../state/availability.selectors';
import { Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { AvailabilityActions } from '../../state/availability.action';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  availabilities: ReadonlyArray<Availability> = [];
  availabilities$ = this.store.select(selectAvailabilities());
  
  headers:{headerName: string, fieldName: keyof Availability}[] = [
    {headerName: "Id", fieldName: "id"},
    {headerName: "monday", fieldName: "monday"},
    {headerName: "tuesday", fieldName: "tuesday"},
  ]  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {  
    this.store.dispatch({ type: AvailabilityActions.GET_AVAILABILITY_LIST});
    this.assignAvailabilities();
  }

  assignAvailabilities() {
    this.availabilities$.subscribe((data) => {
      this.availabilities = data;
    });
  }

  // selectUser(data: {user: Availability, action: TableActions}) {
  //   switch(data.action) {
  //     case TableActions.View: {
  //       this.router.navigate(['users', 'form', data.user.id]);
  //       return;
  //     }
  //     case TableActions.Delete: {
  //       this.store.dispatch({type: UserActions.DELETE_USER_API, payload: data.user.id});
  //       return;
  //     }
  //     default: ""
  //   }

  //   //this.router.navigate(['users', 'form', data.user.id]);
  // }

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

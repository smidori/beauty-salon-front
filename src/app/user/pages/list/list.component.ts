import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { Router } from '@angular/router';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { selectUsers } from '../../state/user.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserActions } from '../../state/user.actions';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  users: ReadonlyArray<User> = [];
  users$ = this.store.select(selectUsers());
  
  headers:{headerName: string, fieldName: keyof User}[] = [
    {headerName: "Id", fieldName: "id"},
    {headerName: "First Name", fieldName: "firstName"},
    {headerName: "Last Name", fieldName: "lastName"},
    {headerName: "E-mail", fieldName: "email"},
    {headerName: "Gender", fieldName: "gender"},
  ]  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {  
    this.store.dispatch({ type: UserActions.GET_USER_LIST});
    this.assignUsers();
  }

  assignUsers() {
    this.users$.subscribe((data) => {
      this.users = data;
    });
  }

  selectUser(data: {user: User, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        console.log("navigate to users form " +  data.user.id);
        this.router.navigate(['users', 'form', data.user.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: UserActions.DELETE_USER_API, payload: data.user.id});
        return;
      }
      default: ""
    }

    //this.router.navigate(['users', 'form', data.user.id]);
  }

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["users","form"]);
        return;
      }
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }
}

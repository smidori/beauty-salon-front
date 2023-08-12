import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { Router } from '@angular/router';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { selectUsers } from '../../state/user.selectors';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { UserActions } from '../../state/user.actions';
import { UserService } from '../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: ReadonlyArray<User> = [];
  users$ = this.store.select(selectUsers());
  
  isVisibleCreate = false;
  isVisibleList = false;
  menuTitle = "My Account";

  headers: { headerName: string, fieldName: keyof User }[] = [
    // { headerName: "Id", fieldName: "id" },
    { headerName: "First Name", fieldName: "firstName" },
    { headerName: "Last Name", fieldName: "lastName" },
    { headerName: "Email", fieldName: "email" },
    { headerName: "Role", fieldName: "role" },
    { headerName: "Gender", fieldName: "gender" },
    { headerName: "Mobile Phone", fieldName: "mobilePhone" },
  ]

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private auth: AuthenticateService
  ) { 
    if(auth.isAdmin()){
      this.isVisibleCreate = true;
      this.isVisibleList = true;
      this.menuTitle = "Users"
    }
  }

  ngOnInit(): void {
    this.store.dispatch({ type: UserActions.GET_USER_LIST });
    this.assignUsers();
    this.userService.onError().subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
        });
      }
    });
  }

  assignUsers() {
    if(this.auth.isAdmin()){
      this.users$.subscribe((data) => {
        this.users = data;
      });
    }else{
      this.users$.pipe(
        map((users) => users.filter((user) => user.id === this.auth.userId()))
      ).subscribe((filteredUsers) => {
        this.users = filteredUsers;
      });
    }
    
  }

  selectUser(data: { user: User, action: TableActions }) {
    switch (data.action) {
      case TableActions.View: {
        this.router.navigate(['users', 'form', data.user.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({ type: UserActions.DELETE_USER_API, payload: data.user.id });
        return;
      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["users", "form"]);
        return;
      }
      default: ""
    }
  }
}

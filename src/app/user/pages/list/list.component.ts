import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { Router } from '@angular/router';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  // users: User[] = [{
  //   id: 100,
  //   name: "Silvia",
  //   email: "smidori@gmail.com"
  // }];

  users: User[] = [];
  
  headers:{headerName: string, fieldName: keyof User}[] = [
    {headerName: "Name", fieldName: "name"},
    {headerName: "E-mail", fieldName: "email"}
  ]  

  constructor(private router: Router, private userService: UserService){}

  ngOnInit(): void {
    
  }

  assignAntiHeroes() {
    // this.users$.subscribe((data: User[]) => {
    //   this.users = data;
    // });
    //this.users = this.userService.getUsers();
  }

  //selectUser(user: User, action:TableActions){}
  //selectUser(user: User){}
  selectUser(data: {user: User, action: TableActions}) {
    this.router.navigate(['users', 'form', data.user.id]);
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

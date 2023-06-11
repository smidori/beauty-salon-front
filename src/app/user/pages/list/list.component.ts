import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  users: User[] = [{
    id: 100,
    name: "Silvia",
    email: "smidori@gmail.com"
  }]

  headers:{headerName: string, fieldName: keyof User}[] = [
    {headerName: "Name", fieldName: "name"},
    {headerName: "E-mail", fieldName: "email"}
  ]  

  constructor(private router: Router){}

  ngOnInit(): void {
    
  }
  //selectUser(user: User, action:TableActions){}
  //selectUser(user: User){}
  selectUser(data: {user: User, action: TableActions}) {
    this.router.navigate(['users', 'form', data.user.id]);
  }
}

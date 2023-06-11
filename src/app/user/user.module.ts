import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './pages/form/form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
//import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    FormComponent, 
    ListComponent,
    UserListComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule
    //UserRoutingModule
  ],
  exports:[
    FormComponent, 
    ListComponent,
    UserListComponent,
    UserFormComponent
  ]
})
export class UserModule { }

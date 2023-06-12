import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './pages/form/form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
//import { UserRoutingModule } from './user-routing.module';
import { ListComponent } from './pages/list/list.component';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { UserCommandBarComponent } from './components/user-command-bar/user-command-bar.component';


@NgModule({
  declarations: [
    FormComponent, 
    ListComponent,
    UserListComponent,
    UserFormComponent,
    UserCommandBarComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
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

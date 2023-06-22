import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { FormComponent } from './pages/form/form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { UserCommandBarComponent } from './components/user-command-bar/user-command-bar.component';
import { ListComponent } from './pages/list/list.component';
import { UserEffects } from './state/user.effects';
import { userReducer } from './state/user.reducers';
import { UserRoutingModule } from './user-routing.module';


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
    MaterialModule,
    ReactiveFormsModule,
    UserRoutingModule,
    StoreModule.forFeature('userState', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
})
export class UserModule { }

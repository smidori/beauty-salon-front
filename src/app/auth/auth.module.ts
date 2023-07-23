import { NgModule } from '@angular/core';

import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { RegisterComponent } from './page/register/register.component';
import { LoginComponent } from './page/login/login.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './state/auth.effects';
import { authReducer } from './state/auth.reducers';


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  console.log("************ localStorageSyncReducer....")
  return localStorageSync({keys: ['token', 'userDetails']})(reducer);
}


const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    AuthFormComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    StoreModule.forFeature('authState', authReducer, {metaReducers}),
    EffectsModule.forFeature([AuthEffects]),
  ]
})
export class AuthModule { }
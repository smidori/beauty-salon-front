// import { CommonModule } from '@angular/common';
// import { NgModule } from '@angular/core';
// import { AvailabilityFormComponent } from './components/availability-form/availability-form.component';
// import { AvailabilityListComponent } from './components/availability-list/availability-list.component';
// import { FormComponent } from './pages/form/form.component';
// import { MaterialModule } from '../material/material.module';
// import { ReactiveFormsModule } from '@angular/forms';
// import { AvailabilityRoutingModule } from './availability-routing.module';
// import { availabilityReducer } from './state/availability.reducers';
// import { AvailabilityEffects } from './state/availability.effects';
// import { StoreModule } from '@ngrx/store';
// import { EffectsModule } from '@ngrx/effects';
// import { ListComponent } from './pages/list/list.component';

import { NgModule } from "@angular/core";
import { ListComponent } from "./pages/list/list.component";
import { FormComponent } from "./pages/form/form.component";
import { AvailabilityListComponent } from "./components/availability-list/availability-list.component";
import { AvailabilityFormComponent } from "./components/availability-form/availability-form.component";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "../material/material.module";
import { ReactiveFormsModule } from "@angular/forms";
import { AvailabilityRoutingModule } from "./availability-routing.module";
import { StoreModule } from "@ngrx/store";
import { availabilityReducer } from "./state/availability.reducers";
import { EffectsModule } from "@ngrx/effects";
import { AvailabilityEffects } from "./state/availability.effects";
import { SharedModule } from "../shared/shared.module";



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    AvailabilityListComponent,
    AvailabilityFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    AvailabilityRoutingModule,
    SharedModule,
    StoreModule.forFeature('availabilityState', availabilityReducer),
    EffectsModule.forFeature([AvailabilityEffects])

  ]
})
export class AvailabilityModule { }

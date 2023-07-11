import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { TreatmentTypeListComponent } from './components/treatment-type-list/treatment-type-list.component';
import { TreatmentTypeFormComponent } from './components/treatment-type-form/treatment-type-form.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TreatmentTypeEffects } from './state/treatment-type.effects';
import { treatmentTypeReducer } from './state/treatment-type.reducers';
import { TreatmentTypeRoutingModule } from './treatment-type-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    TreatmentTypeListComponent,
    TreatmentTypeFormComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TreatmentTypeRoutingModule,
    StoreModule.forFeature('treatmentTypeState', treatmentTypeReducer),
    EffectsModule.forFeature([TreatmentTypeEffects]),
    FormsModule,
    SharedModule
  ]
})
export class TreatmentTypeModule { }

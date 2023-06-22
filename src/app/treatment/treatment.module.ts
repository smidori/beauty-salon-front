import { treatmentReducer } from './state/treatment.reducers';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { TreatmentFormComponent } from './components/treatment-form/treatment-form.component';
import { TreatmentListComponent } from './components/treatment-list/treatment-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TreatmentRoutingModule } from './treatment-routing.module';
import { TreatmentEffects } from './state/treatment.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    TreatmentFormComponent,
    TreatmentListComponent,    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TreatmentRoutingModule,
    StoreModule.forFeature('treatmentState', treatmentReducer),
    EffectsModule.forFeature([TreatmentEffects])
  ]
})
export class TreatmentModule { }

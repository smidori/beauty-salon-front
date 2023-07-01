import { treatmentReducer } from './state/treatment.reducers';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { TreatmentFormComponent } from './components/treatment-form/treatment-form.component';
import { TreatmentListComponent } from './components/treatment-list/treatment-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TreatmentRoutingModule } from './treatment-routing.module';
import { TreatmentEffects } from './state/treatment.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HomeComponent } from './pages/home/home.component';
import { TreatmentHomeComponent } from './components/treatment-home/treatment-home.component';
import { TreatmentCommandBarComponent } from './components/treatment-command-bar/treatment-command-bar.component';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    TreatmentFormComponent,
    TreatmentListComponent,
    HomeComponent,
    TreatmentHomeComponent,
    TreatmentCommandBarComponent,    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TreatmentRoutingModule,
    StoreModule.forFeature('treatmentState', treatmentReducer),
    EffectsModule.forFeature([TreatmentEffects]),
    FormsModule
  ]
})
export class TreatmentModule { }

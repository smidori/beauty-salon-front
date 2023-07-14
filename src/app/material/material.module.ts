import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatRadioModule } from '@angular/material/radio';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

//import { MAT_DATE_LOCALE } from '@angular/material/core'

//import { MatDatepickerModule} from '@angular/material/datepicker';
//import { MAT_DATE_FORMATS } from '@angular/material/core';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonToggleModule,

  ],
  exports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatRadioModule,
    MatMenuModule,
    MatButtonToggleModule
  ],
  providers: [
    //{ provide: MAT_DATE_LOCALE, useValue: 'en-IE' }
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})
export class MaterialModule { }
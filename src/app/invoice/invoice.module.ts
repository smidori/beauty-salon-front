import { InvoiceEffects } from './state/invoice.effects';
import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { invoiceReducer } from './state/invoice.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { PdfComponent } from './pages/pdf/pdf.component';
import { InvoicePdfComponent } from './components/invoice-pdf/invoice-pdf.component';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    CommandBarComponent,
    PdfComponent,
    InvoicePdfComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
    StoreModule.forFeature('invoiceState', invoiceReducer),
    EffectsModule.forFeature([InvoiceEffects])
  ]
})
export class InvoiceModule { }

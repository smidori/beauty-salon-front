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



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    CommandBarComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    InvoiceRoutingModule,
  ]
})
export class InvoiceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { PdfComponent } from './pages/pdf/pdf.component';

const routes: Routes = [
  {
    path:"",
    component: ListComponent,
  },
  {
    path:"list",
    component: ListComponent,
  },
  {
    path:"pdf/:id",
    component: PdfComponent,
  },
  {
    path:"form",
    children: [
      {
        path: "",
        component: FormComponent
      },
      {
        path: ":id",
        component: FormComponent
      }
    ]
    
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class InvoiceRoutingModule { }

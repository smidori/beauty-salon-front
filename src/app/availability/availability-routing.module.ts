import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';


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
    
  },

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[RouterModule]
})
export class AvailabilityRoutingModule { }

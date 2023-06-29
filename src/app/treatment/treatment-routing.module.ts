import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';


const routes: Routes = [
  {
    path:"",
    component: HomeComponent,
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
    
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
  ],
  exports:[RouterModule]
})
export class TreatmentRoutingModule { }

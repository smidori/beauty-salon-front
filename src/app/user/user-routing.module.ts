import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';

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
    
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    //CommonModule
  ],
  exports:[RouterModule]
})
export class UserRoutingModule { }

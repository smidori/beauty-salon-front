import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path:"",
    component: ListComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[RouterModule]
})
export class AvailabilityRoutingModule { }

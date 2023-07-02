import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "-",
    redirectTo: "treatments",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  }, 
  {
    path:"treatments",
    loadChildren: () => import("./treatment/treatment.module").then((m) => m.TreatmentModule)
  },
  {
    path:"treatment-types",
    loadChildren: () => import("./treatment-type/treatment-type.module").then((m) => m.TreatmentTypeModule)
  },  
  {
    path:"users",
    loadChildren: () => import("./user/user.module").then((m) => m.UserModule)
  },  
  {
    path:"availabilities",
    loadChildren: () => import("./availability/availability.module").then((m) => m.AvailabilityModule)
  }
  // {
  //   path:"availabilities",
  //   loadChildren: () => import("./availability/availability.module").then((m) => m.AvailabilityModule)
  // }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

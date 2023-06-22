import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {
  //   path:"",
  //   redirectTo:"users",
  //   pathMatch:"full"
  // },
  // {
  //   path:"users",
  //   loadChildren: () => import("./user/user.module").then((m) => m.UserModule)
  // }

  // {
  //   path:"",
  //   redirectTo:"treatments",
  //   pathMatch:"full"
  // },


  {
    path: "",
    redirectTo: "login",
    pathMatch: "full",
  },
  {
    path: "login",
    loadChildren: () =>
    import("./auth/auth.module").then((m) => m.AuthModule),
  },
  
  {
    path:"treatments",
    loadChildren: () => import("./treatment/treatment.module").then((m) => m.TreatmentModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

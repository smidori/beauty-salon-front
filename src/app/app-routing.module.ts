import { Book } from './book/model/book.interface';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "-",
    redirectTo: "treatments/home",
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
  },  
  {
    path:"books",
    loadChildren: () => import("./book/book.module").then((m) => m.BookModule)
  },  
  {
    path:"invoices",
    loadChildren: () => import("./invoice/invoice.module").then((m) => m.InvoiceModule)
  },  
  {
    path:"products",
    loadChildren: () => import("./product/product.module").then((m) => m.ProductModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

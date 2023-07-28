import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { FormComponent } from './pages/form/form.component';
import { ListComponent } from './pages/list/list.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductEffects } from './state/product.effects';
import { productReducer } from './state/product.reducers';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    ProductListComponent,
    ProductFormComponent,
    CommandBarComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    ProductRoutingModule,
    SharedModule,
    StoreModule.forFeature('productState', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    FormsModule,
    SharedModule
  ]
})
export class ProductModule { }

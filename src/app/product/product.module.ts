import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
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
    FormsModule
  ]
})
export class ProductModule { }

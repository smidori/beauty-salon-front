import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './pages/list/list.component';
import { FormComponent } from './pages/form/form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { SharedModule } from '../shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookEffects } from './state/book.effects';
import { bookReducer } from './state/book.reducers';



@NgModule({
  declarations: [
    ListComponent,
    FormComponent,
    BookListComponent,
    BookFormComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    BookRoutingModule,
    SharedModule,
    StoreModule.forFeature('bookState', bookReducer),
    EffectsModule.forFeature([BookEffects])
  ]
})
export class BookModule { }

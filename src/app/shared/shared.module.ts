import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommandBarComponent } from './components/command-bar/command-bar.component';
import { MaterialModule } from '../material/material.module';
import { DecimalSeparatorDirective } from './directives/decimal-separator.directive';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CommandBarComponent,
    DecimalSeparatorDirective
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CommandBarComponent,
    DecimalSeparatorDirective

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MaterialModule
  ]
})
export class SharedModule { }

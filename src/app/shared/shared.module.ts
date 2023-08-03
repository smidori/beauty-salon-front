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
import { UserRoutingModule } from '../user/user-routing.module';
import { PhoneNumberDirective } from './directives/phone-number.directive';
import { DialogConfirmComponent } from './components/dialog-confirm/dialog-confirm.component';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CommandBarComponent,
    DecimalSeparatorDirective,
    PhoneNumberDirective,
    DialogConfirmComponent
  ],
  exports: [
    NavbarComponent,
    FooterComponent,
    CommandBarComponent,
    DecimalSeparatorDirective,
    PhoneNumberDirective,
    DialogConfirmComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MaterialModule,
    MatDialogModule,
    MatButtonModule,
  ]
})
export class SharedModule { }

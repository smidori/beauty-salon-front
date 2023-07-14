import { AvailabilityModule } from './availability/availability.module';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { TreatmentModule } from './treatment/treatment.module';
import { HeaderInterceptor } from './core/interceptors/header.interceptors';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@auth0/angular-jwt';
import { TreatmentTypeModule } from './treatment-type/treatment-type.module';
import { BookModule } from './book/book.module';


export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    TreatmentModule,
    AuthModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    FormsModule,
    TreatmentTypeModule,
    AvailabilityModule,
    BookModule,
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
    JwtModule.forRoot({ config: { tokenGetter } })//for jwt service
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

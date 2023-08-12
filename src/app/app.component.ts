import { Component, OnInit } from '@angular/core';
import { InactivityService } from './core/services/inactivity.service';
import { AuthenticateService } from './core/services/authenticate.service';
import { AppState } from './state/app.state';
import { Store } from '@ngrx/store';
import { logout } from './auth/state/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  title = 'beauty-salon';
  constructor(private inactivityService: InactivityService, private authService: AuthenticateService,private store: Store<AppState>) {}
  ngOnInit(): void {
    this.inactivityService.getInactivityStream().subscribe(() => {
      console.log("********** token deleted for inactivity **********")
      //Do the logout automatically
      this.store.dispatch(logout());
      this.authService.logout();
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/state/auth.actions';
import { selectIsAuthenticated, selectUserDetails } from 'src/app/auth/state/auth.selectors';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  //isAuthenticated$: Observable<boolean>;
  userDetails$ = this.store.select(selectUserDetails);
  name = '';
  isAuthenticated = false;
  isAdmin = false;

  constructor(private auth: AuthenticateService, private router: Router, private store: Store<AppState>) {
    console.log("constructor navbar");
  }

  ngOnInit() {
    console.log("ngOnInit navbar");
    
    // Subscribe in the event to update the values of isAuthenticated e isAdmin
    this.auth.onAuthenticationChange().subscribe((isAuthenticated) => {
      this.isAuthenticated = this.auth.isAuthenticated();
      this.isAdmin = this.auth.isAdmin();
    });

    // default values of isAuthenticated e isAdmin
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.name = this.auth.name();
    console.log("ngOnInit => isAdmin " + this.isAdmin)
    
  }

  logout() {
    this.store.dispatch(logout());
    this.auth.logout();
  }

  isUserLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

}

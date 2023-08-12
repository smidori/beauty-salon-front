import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/state/auth.actions';
import { selectIsAuthenticated, selectUserDetails } from 'src/app/auth/state/auth.selectors';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { ScrollService } from 'src/app/core/services/scroll-service.service';
import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/user/models/user.interface';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  name = '';
  isAuthenticated = false;
  isAdmin = false;
  isWorker = false;
  isClient = false;

  constructor(private auth: AuthenticateService, private router: Router, private store: Store<AppState>,
    private scrollService: ScrollService) {
  }

  onAnchorClick(section: string) {
    this.scrollService.scrollToSection(section);
  }

  ngOnInit() {
    // Subscribe in the event to update the values of isAuthenticated e isAdmin
    this.auth.onAuthenticationChange().subscribe((isAuthenticated) => {
      this.isAuthenticated = this.auth.isAuthenticated();
      this.isAdmin = this.auth.isAdmin();
      this.isWorker = this.auth.isWorker();
      this.isClient = this.auth.isClient();
      this.name = this.auth.name();
    });

    // default values of isAuthenticated e isAdmin
    this.isAuthenticated = this.auth.isAuthenticated();
    this.isAdmin = this.auth.isAdmin();
    this.isWorker = this.auth.isWorker();
    this.isClient = this.auth.isClient();
    this.name = this.auth.name();

  }

  logout() {
    this.store.dispatch(logout());
    this.auth.logout();
  }

  isUserLoggedIn(): boolean {
    return this.auth.isAuthenticated();
  }

  editUserDetails() {
    const userId = this.auth.userId();
    this.router.navigate(['users', 'form', userId]);
    return;
  }

}

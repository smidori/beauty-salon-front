import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from 'src/app/auth/state/auth.actions';
import { selectIsAuthenticated } from 'src/app/auth/state/auth.selectors';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { AppState } from 'src/app/state/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
   isAuthenticated$: Observable<boolean>;


   ngOnInit() {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }


  constructor(private auth: AuthenticateService, private router: Router, private store: Store<AppState>){
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  logout(){
    this.auth.logout();
    this.store.dispatch(logout());
  }

}



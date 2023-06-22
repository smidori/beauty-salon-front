//import { UserService } from './services/user.service';
import { User } from './user/models/user.interface';


import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {}
  title = 'beauty-salon';
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../models/user.interface';
import { Store } from '@ngrx/store';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
//import { AppState } from 'src/app/state/app.state';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  //id = "";
  //user$: Observable<User | undefined>
  ;
  user: User | null = null;

  constructor(private activateRoute: ActivatedRoute, private router: Router){
    const id = this.activateRoute.snapshot.params['id'];
    //this.user$ = selectUser(id)
    //this.user$ = undefined
    
  }

  ngOnInit(): void {
    //this.id = this.router.snapshot.params['id'];  
  }


  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.List :{
        //this.router.navigate(["users","list"]);
        this.router.navigate(['../']);
        return;
      }
      // case CommandBarActions.DeleteAll :{
      //   return;
      // }
      default: ""
    }
  }
}

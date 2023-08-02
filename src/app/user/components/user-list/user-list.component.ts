import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';


@Component({
  selector: 'users-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input() headers: Array<{ headerName: string, fieldName: keyof User }> = []
  @Input() users: ReadonlyArray<User> = [];
  @Output() user = new EventEmitter<{user: User, action:TableActions}>();
  headerFields:string[] = [];
  loggedUserId: number | null;

  constructor(auth: AuthenticateService) {
    this.loggedUserId = auth.userId();
  }
  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectUser(user: User, action:TableActions) {
    this.user.emit({user,action})
  }

}

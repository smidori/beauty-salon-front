import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';

@Component({
  selector: 'delete-app-user-command-bar',
  templateUrl: './user-command-bar.component.html',
  styleUrls: ['./user-command-bar.component.css']
})

export class UserCommandBarComponent implements OnInit{
  @Output() action = new EventEmitter<CommandBarActions>();
  

  ngOnInit(): void {
  }
  emitAction(action: CommandBarActions){
    this.action.emit(action);
  }

}

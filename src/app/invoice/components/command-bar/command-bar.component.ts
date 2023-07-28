import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';

@Component({
  selector: 'delete-command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit{
  @Output() action = new EventEmitter<CommandBarActions>();
  

  ngOnInit(): void {
  }
  emitAction(action: CommandBarActions){
    this.action.emit(action);
  }

}
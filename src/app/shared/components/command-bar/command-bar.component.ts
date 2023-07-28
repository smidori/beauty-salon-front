import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';

@Component({
  selector: 'command-bar',
  templateUrl: './command-bar.component.html',
  styleUrls: ['./command-bar.component.css']
})
export class CommandBarComponent implements OnInit{
  @Output() action = new EventEmitter<CommandBarActions>();
  @Input() menuTitle = '';
  @Input() isVisibleCreate = true;
  @Input() isVisibleList = true;
  

  ngOnInit(): void {
  }
  emitAction(action: CommandBarActions){
    this.action.emit(action);
  }

}
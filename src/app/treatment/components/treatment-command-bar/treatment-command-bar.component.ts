import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';

@Component({
  selector: 'treatment-command-bar',
  templateUrl: './treatment-command-bar.component.html',
  styleUrls: ['./treatment-command-bar.component.css']
})
export class TreatmentCommandBarComponent implements OnInit{
  @Output() action = new EventEmitter<CommandBarActions>();
  

  ngOnInit(): void {
  }
  emitAction(action: CommandBarActions){
    this.action.emit(action);
  }

}

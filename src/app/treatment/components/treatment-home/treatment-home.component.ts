import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { TreatmentType } from '../../models/treatment-type.interface';

@Component({
  selector: 'treatment-home',
  templateUrl: './treatment-home.component.html',
  styleUrls: ['./treatment-home.component.css']
})
export class TreatmentHomeComponent implements OnInit {
  @Input() headers: Array<{ headerName: string, fieldName: keyof Treatment}> = []
  @Input() treatments: ReadonlyArray<Treatment> = [];
  @Output() treatment = new EventEmitter<{treatment: Treatment, action:TableActions}>();
  headerFields:string[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    //this.headerFields.push("actions");
  }

  selectTreatment(treatment: Treatment, action:TableActions) {
    this.treatment.emit({treatment,action})
  }
}

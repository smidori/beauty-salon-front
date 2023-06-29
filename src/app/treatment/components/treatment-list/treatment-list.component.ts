import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { TableActions } from 'src/app/user/enums/table-actions.enum';
import { TreatmentType } from '../../models/treatment-type.interface';

@Component({
  selector: 'treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit{
  @Input() headers: Array<{ headerName: string, fieldName: keyof Treatment, treatmentTypeName?: keyof TreatmentType }> = []
  @Input() treatments: ReadonlyArray<Treatment> = [];
  @Output() treatment = new EventEmitter<{treatment: Treatment, action:TableActions}>();
  headerFields:string[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectTreatment(treatment: Treatment, action:TableActions) {
    this.treatment.emit({treatment,action})
  }
}

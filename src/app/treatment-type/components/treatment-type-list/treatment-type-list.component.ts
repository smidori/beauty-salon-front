import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreatmentType } from '../../models/treatment-type.interface';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';

@Component({
  selector: 'treatment-type-list',
  templateUrl: './treatment-type-list.component.html',
  styleUrls: ['./treatment-type-list.component.css']
})
export class TreatmentTypeListComponent implements OnInit{
  @Input() headers: Array<{ headerName: string, fieldName: keyof TreatmentType}> = []
  @Input() treatmentTypes: ReadonlyArray<TreatmentType> = [];
  @Output() treatmentType = new EventEmitter<{treatmentType: TreatmentType, action:TableActions}>();
  headerFields:string[] = [];

  constructor() {}
  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectTreatmentType(treatmentType: TreatmentType, action:TableActions) {
    this.treatmentType.emit({treatmentType,action})
  }
}


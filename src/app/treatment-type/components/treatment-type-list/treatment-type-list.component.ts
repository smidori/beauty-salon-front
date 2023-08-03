import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TreatmentType } from '../../models/treatment-type.interface';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';

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

  constructor(public dialog: MatDialog) {}
  
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

  //modal delete confirmation
  openDeleteConfirmationDialog(treatmentType: TreatmentType, action:TableActions): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: 'Are you sure you want to delete this item?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectTreatmentType(treatmentType, action)
      }
    });
  }
}


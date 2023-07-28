import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { TableActions } from 'src/app/user/enums/table-actions.enum';
import { TreatmentType } from '../../models/treatment-type.interface';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';

@Component({
  selector: 'treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit{
  //get the values from input
  @Input() headers: Array<{ headerName: string, fieldName: keyof Treatment, treatmentTypeName?: keyof TreatmentType }> = []
  @Input() treatments: ReadonlyArray<Treatment> = [];

  //send the treatment
  @Output() treatment = new EventEmitter<{treatment: Treatment, action:TableActions}>();
  
  //variables
  headerFields:string[] = [];
  isAdmin = false;
  isClient = false;

  constructor(private auth:AuthenticateService) {}
  
  ngOnInit(): void {
    this.getHeaderFields();
    this.isAdmin = this.auth.isAdmin();
    this.isClient = this.auth.isClient();
  }

  //assign the values to the header fields and the actions
  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  //get the treatment that was selected
  selectTreatment(treatment: Treatment, action:TableActions) {
    this.treatment.emit({treatment,action})
  }
}

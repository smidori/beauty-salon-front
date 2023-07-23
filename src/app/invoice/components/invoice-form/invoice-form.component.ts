import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';
import { Invoice } from '../../model/invoice.interface';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  //get data from input
  @Input() selectedInvoice: Invoice | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatments: ReadonlyArray<Treatment> = [];
  @Input() users: ReadonlyArray<User> = [];
  
  //send data to page
  @Output() action = new EventEmitter();
  
  //properties
  form: FormGroup;
  selectedTreatment: Treatment | null = null;
  
  //constructor
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      client: [null],
      observation: [null],
      total: [0],
      date:[null],
      items: [[]],
    });
  }


  ngOnInit(): void {
    this.checkAction();
  }

  //check is is update or create
  checkAction() {
    if (this.selectedInvoice) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  //copy the values from selectedInvoice to form
  patchDataValues() {
    if (this.selectedInvoice) {
      //console.log(JSON.stringify("invoice => " + this.selectedInvoice.firstName));
      this.form.patchValue(this.selectedInvoice);
    }

  }

  //compare the objects
  compareTreatmentObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  //send an action
  emitAction() {
    this.action.emit({ value: this.form.value, action: this.actionButtonLabel })
  }

  //clear the form
  clear() {
    this.form.reset();
  }
}

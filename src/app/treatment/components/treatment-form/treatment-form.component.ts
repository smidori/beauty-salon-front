import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TreatmentType } from '../../models/treatment-type.interface';

@Component({
  selector: 'treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent {
  //get data from input
  @Input() selectedTreatment: Treatment | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatmentTypes: ReadonlyArray<TreatmentType> = [];
  
  //send data
  @Output() action = new EventEmitter();
  
  //properties
  form: FormGroup;
  selectedTreatmentTypeId: number | undefined;

  //constructor
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkAction();
  }

  //check is is update or create
  checkAction() {
    if (this.selectedTreatment) {
      this.actionButtonLabel = "Update";
      this.selectedTreatmentTypeId = this.selectedTreatment.type.id;
      this.patchDataValues()
    }
  }
  
  //copy the values from selectedTreatment to form
  patchDataValues() {
    if (this.selectedTreatment) {
      this.form.patchValue(this.selectedTreatment);
    }
  }

  //compare the objects
  compareTypeObjects(object1: any, object2: any) {
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
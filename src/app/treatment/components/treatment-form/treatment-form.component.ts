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

  @Input() selectedTreatment: Treatment | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatmentTypes: ReadonlyArray<TreatmentType> = [];
  @Output() action = new EventEmitter();
  form: FormGroup;

  selectedTreatmentType: TreatmentType | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      // type: ['', Validators.required],
      duration: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkAction();
    console.log("treatmentTypes " + JSON.stringify(this.treatmentTypes));
  }

  checkAction() {
    if (this.selectedTreatment) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues() {

    if (this.selectedTreatment) {
      this.form.patchValue(this.selectedTreatment);
    }
  }

  emitAction() {
    this.action.emit({ value: this.form.value, action: this.actionButtonLabel })
  }

  clear() {
    this.form.reset();
  }

}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TreatmentType } from '../../models/treatment-type.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'treatment-type-form',
  templateUrl: './treatment-type-form.component.html',
  styleUrls: ['./treatment-type-form.component.css']
})
export class TreatmentTypeFormComponent {

  @Input() selectedTreatmentType: TreatmentType | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Output() action = new EventEmitter();
  form: FormGroup;


  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkAction();
  }

  checkAction() {
    if (this.selectedTreatmentType) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues() {

    if (this.selectedTreatmentType) {
      this.form.patchValue(this.selectedTreatmentType);
    }
  }

  emitAction() {
    this.action.emit({ value: this.form.value, action: this.actionButtonLabel })
  }

  clear() {
    this.form.reset();
  }

}

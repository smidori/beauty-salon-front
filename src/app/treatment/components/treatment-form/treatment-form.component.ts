import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Treatment } from '../../models/treatment.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent {

  @Input() selectedTreatment: Treatment | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Output() action = new EventEmitter();
  form: FormGroup;


  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      type: ['', Validators.required],
      duration: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.checkAction();

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
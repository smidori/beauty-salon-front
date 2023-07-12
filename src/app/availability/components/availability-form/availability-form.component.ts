import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Availability } from '../../models/availability.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Treatment } from 'src/app/treatment/models/treatment.interface';

@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.css']
})
export class AvailabilityFormComponent implements OnInit {
  @Input() selectedAvailability: Availability | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatments: ReadonlyArray<Treatment> = [];

  @Output() action = new EventEmitter();
  form: FormGroup;
  selectedTreatment: Treatment | null = null;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      id: [null],
      sunday: [false],
      monday: [false],
      tuesday: [false],
      wednesday: [false],
      thursday: [false],
      friday: [false],
      saturday: [false],
      user: [null],
      startDate: [null],
      finishDate: [null],
      treatments: [[]]

    });
  }


  ngOnInit(): void {
    this.checkAction();
  }

  checkAction() {
    if (this.selectedAvailability) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues() {

    if (this.selectedAvailability) {
      //console.log(JSON.stringify("availability => " + this.selectedAvailability.firstName));
      this.form.patchValue(this.selectedAvailability);
    }

  }



  compareTreatmentObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  emitAction() {
    this.action.emit({ value: this.form.value, action: this.actionButtonLabel })
  }

  clear() {
    this.form.reset();
  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Availability } from '../../models/availability.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';

@Component({
  selector: 'availability-form',
  templateUrl: './availability-form.component.html',
  styleUrls: ['./availability-form.component.css']
})
export class AvailabilityFormComponent implements OnInit {
  //get data from input
  @Input() selectedAvailability: Availability | null = null;
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
      user: [null],
      startDate: [null],
      finishDate: [null],
      treatments: [[]],
      hourStartTime:[null],
      hourFinishTime:[null]
    });
  }


  ngOnInit(): void {
    this.checkAction();
  }

  //check is is update or create
  checkAction() {
    if (this.selectedAvailability) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  //copy the values from selectedAvailability to form
  patchDataValues() {
    if (this.selectedAvailability) {
      //console.log(JSON.stringify("availability => " + this.selectedAvailability.firstName));
      this.form.patchValue(this.selectedAvailability);
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
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  @Input() selectedUser: User | null = null;
  @Input() actionButtonLabel : string = "Create";
  @Output() action = new EventEmitter();
  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  
  
  ngOnInit(): void {
    
  }

  emitAction() {
    console.log("emitAction for user => " + JSON.stringify(this.form.value) )
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear() {
    this.form.reset();
 }
}

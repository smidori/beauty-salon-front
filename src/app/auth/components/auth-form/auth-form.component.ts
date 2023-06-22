import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {
  @Input() error: string = "";
  @Input() title: string = "Login"
  @Output() submitEmitter = new EventEmitter();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: [''],
      password: ['']
    })

  }



  ngOnInit(): void {
  }

  submit() {
    this.submitEmitter.emit(this.form.value);
  }

}
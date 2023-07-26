import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  formRegister: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });


    this.formRegister = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', Validators.required],
      mobilePhone: ['', Validators.required],
      homePhone: [''],
    })

  }



  ngOnInit(): void {
  }

  submit() {
    console.log("submit title " + this.title)
    if (this.title == "Login") {
      this.submitEmitter.emit(this.form.value);
    } else {
      this.submitEmitter.emit(this.formRegister.value);
    }

  }


}
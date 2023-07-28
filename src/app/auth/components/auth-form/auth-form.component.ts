import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder,private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });


    this.formRegister = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
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

  //check if they are equal
  passwordsMatch(): boolean {
    const password = this.formRegister.get('password')?.value;
    const confirmPassword = this.formRegister.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
  //check onBlur
  checkPasswordsMatch() {
    if (this.formRegister.get('password')?.value && this.formRegister.get('confirmPassword')?.value && !this.passwordsMatch()) {
      this.formRegister.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      this.snackBar.open('Passwords do not match', 'Dismiss', {
        duration: 2000 
      });
    } 
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
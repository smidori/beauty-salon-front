import { UserService } from 'src/app/user/services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  //@Input() selectedUser: User | null = null;
  @Input() selectedUserId: number | undefined;
  @Input() actionButtonLabel : string = "Create";
  @Output() action = new EventEmitter();
  form: FormGroup;
  isAdmin = false;

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private auth: AuthenticateService,
    private location: Location){
    this.form = this.fb.group({
      id:[null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      //login: [{ value: '', disabled: this.actionButtonLabel == "Update" }, [Validators.required]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      mobilePhone: [''],
      homePhone: [''],
    });
  }

  ngOnInit(): void {
    this.checkAction();
    this.isAdmin = this.auth.isAdmin();
  }

  checkAction() {
    if(this.selectedUserId != null) {
      this.actionButtonLabel = "Update";
      
      this.userService.getUserById(this.selectedUserId).pipe(
        catchError(error => {
          return throwError(() => 'Error to loading the user by id + ' + this.selectedUserId);
        })
      ).subscribe(
        (user: User) => {
          this.form.patchValue(user);
          this.form.get('confirmPassword')?.setValue(user.password)
        }
      );      
    }
  }

  //check if they are equal
  passwordsMatch(): boolean {
    const password = this.form.get('password')?.value;
    const confirmPassword = this.form.get('confirmPassword')?.value;
    return password === confirmPassword;
  }
  //check onBlur
  checkPasswordsMatch() {
    if (this.form.get('password')?.value && this.form.get('confirmPassword')?.value && !this.passwordsMatch()) {
      this.form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      this.snackBar.open('Passwords do not match', 'Dismiss', {
        duration: 2000 
      });
    } 
  }

  emitAction() {
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear() {
    this.form.reset();
 }
 
 //cancel the register
 onCancel() {
  this.location.back();
}
}

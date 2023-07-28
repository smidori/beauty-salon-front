import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar){
    this.form = this.fb.group({
      id:[null],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
      gender: ['', Validators.required],
      role: ['', Validators.required],
      mobilePhone: [''],
      homePhone: [''],
    });
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

  // phoneValidator(control: FormControl): { [key: string]: any } | null {
  //   const phoneRegex = /^(\d{2})(\d{4,5})(\d{4})$/; // Formato (00)00000-0000 ou (00)0000-0000
  //   const phoneValue = control.value;

  //   if (phoneValue && !phoneRegex.test(phoneValue)) {
  //     const formattedValue = phoneValue.replace(phoneRegex, '($1)$2-$3');
  //     control.setValue(formattedValue, { emitEvent: false }); // Atualiza o valor formatado no campo
  //   }

  //   return null; // Retorno nulo significa que a validação passou com sucesso
  // }

  ngOnInit(): void {
    this.checkAction();
  }

  checkAction() {
    if(this.selectedUser) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  patchDataValues () {

    if(this.selectedUser){
      console.log(JSON.stringify("user => " + this.selectedUser.firstName));
      this.form.patchValue(this.selectedUser);
    }
    
 }

  emitAction() {
    this.action.emit({value: this.form.value, action: this.actionButtonLabel})
  }

  clear() {
    this.form.reset();
 }
}

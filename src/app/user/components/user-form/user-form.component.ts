import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit{
  @Input() selectedId = "";
  @Input() actionButtonLabel : string = "Create";
  form: FormGroup;

  constructor(private fb: FormBuilder){
    this.form = this.fb.group({
      id:[''],
      name:[''],
    })
  }
  
  
  ngOnInit(): void {
    
  }

}

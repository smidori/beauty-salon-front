import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  id = "";
  constructor(private router: ActivatedRoute){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];  
  }



}

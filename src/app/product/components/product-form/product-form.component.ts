import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/invoice/model/invoice.interface';
import { DecimalSeparatorDirective } from '../../../shared/directives/decimal-separator.directive'; 
import { Location } from '@angular/common';


@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  //get data from input
  @Input() selectedProduct: Product | null = null;
  @Input() actionButtonLabel: string = "Create";
  
  //send data
  @Output() action = new EventEmitter();
  
  //properties
  form: FormGroup;
  selectedProductTypeId: number | undefined;

  //constructor
  constructor(private fb: FormBuilder, private location:Location) {
    this.form = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.checkAction();
  }

  //check is is update or create
  checkAction() {
    if (this.selectedProduct) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }
  
  //copy the values from selectedProduct to form
  patchDataValues() {
    if (this.selectedProduct) {
      this.form.patchValue(this.selectedProduct);
    }
  }

  //compare the objects
  compareTypeObjects(object1: any, object2: any) {
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

  onCancel() {
    this.location.back();
  }
}

import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';
import { Invoice, Product } from '../../model/invoice.interface';
import { BookService } from './../../../book/services/book.service';

@Component({
  selector: 'invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.css']
})
export class InvoiceFormComponent implements OnInit {
  //get data from input
  @Input() selectedInvoice: Invoice | null = null;
  @Input() actionButtonLabel: string = "Create";
  @Input() treatments: ReadonlyArray<Treatment> = [];
  @Input() products: ReadonlyArray<Product> = [];
  @Input() clients: User[] = [];

  //send data to page
  @Output() action = new EventEmitter();

  //properties
  invoiceForm: FormGroup;
  productForm: FormGroup;
  selectedTreatment: Treatment | null = null;
  productsWithStock:Product[] = [];

  clientFormControl: FormControl;



  //constructor
  constructor(private fb: FormBuilder, private bookService: BookService, private store: Store<AppState>) {
    this.clientFormControl = this.fb.control(null, Validators.required);
    this.clientFormControl.setValue(null);

    this.invoiceForm = this.fb.group({
      id: [null],
      client: this.clientFormControl,
      observation: [null],
      total: [0, Validators.required],
      date: [null],
      invoiceItems: this.fb.array([]),
    });

    this.productForm = this.fb.group({
      product: [null],
    })

    
  }

  ngOnInit(): void {
    this.checkAction();
    // Add observer to call the service, when the client is changed
    this.clientFormControl.valueChanges.subscribe((client) => {
      if (client) {
        this.loadBooksForClient(client.id); //Load books from this client for this current date
      }
    });
  }

  //call the methods to filter the products with stock
  ngOnChanges(changes: SimpleChanges) {
    if (changes['products']) {
      this.filterProducts();
    }
  }

  //filter products that has stock > 0
  private filterProducts() {
    this.productsWithStock = this.products.filter(product => product.stock > 0);
  }

  calculateTotalInvoice() {
    const invoiceItemsArray = this.invoiceForm.get('invoiceItems') as FormArray;
    let total = 0;

    // Iterate over each item in the invoiceItems array and add its 'total' value to the 'total' variable
    for (const itemGroup of invoiceItemsArray.controls) {
      const totalValue = itemGroup.get('total')?.value || 0;
      total += totalValue;
    }

    // Update the 'total' field in the invoiceForm with the calculated total value
    this.invoiceForm.get('total')?.setValue(total);
  }

  //check if there in invoiceItems
  hasInvoiceItems(): boolean {
    const invoiceItemsArray = this.invoiceForm.get('invoiceItems') as FormArray;
    return invoiceItemsArray && invoiceItemsArray.length > 0;
  }


  //find the treatment by id
  findTreatmentById(treatmentId: number): Treatment | undefined {
    return this.treatments.find(treatment => treatment.id === treatmentId);
  }

  // load books
  loadBooksForClient(clientId: number) {
    const invoiceItemsFormArray = this.invoiceForm.get('invoiceItems') as FormArray;
    invoiceItemsFormArray.clear(); // Clean all the FormGroups

    //foreach book, create an invoiceItem
    this.bookService.getBooksCompletedByClientToday(clientId)
      .subscribe(
        (books) => {
          books.forEach(book => {
            const treatmentId = book.treatmentId;
            const treatment = this.findTreatmentById(treatmentId);
            if (treatment) {
              this.addTreatment(treatment, book);
            }
          });
        },
        (error) => {
          console.error('Error loading books for client:', error);
        }
      );

    console.log("InvoiceForm = " + JSON.stringify(this.invoiceForm.value));
  }

  //check is is update or create
  checkAction() {
    if (this.selectedInvoice) {
      this.actionButtonLabel = "Update";
      this.patchDataValues()
    }
  }

  //copy the values from selectedInvoice to form
  patchDataValues() {
    if (this.selectedInvoice) {
      this.invoiceForm.patchValue(this.selectedInvoice);
    }

  }

  //compare the objects
  compareObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id == object2.id;
  }

  //send an action
  emitAction() {
    console.log("emitAction: " + JSON.stringify(this.invoiceForm.value));

    this.action.emit({ value: this.invoiceForm.value, action: this.actionButtonLabel })
  }

  //clear the form
  clear() {
    this.invoiceForm.reset();
  }


  // Method to cast AbstractControl as FormGroup
  getFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

  //return the invoiceItem as a formarray
  get invoiceItemsFormArray(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  //return form array controls from invoiceItems
  getInvoiceItemsFormArrayControls(): AbstractControl[] {
    return (this.invoiceForm.get('invoiceItems') as FormArray).controls;
  }

  //add Treatment to invoice item
  addTreatment(treatment: any, book: any) {
    console.log("-------- addTreatment => " + JSON.stringify(treatment))
    const treatments = this.invoiceForm.get('invoiceItems') as FormArray;
    const newTreatmentFormGroup = this.fb.group({
      id: [null],
      description: [treatment.name],
      observation: [''],
      worker: [null],
      amount: [1, Validators.required],
      subtotal: [treatment.price, Validators.required],
      extra: [0],
      discount: [0],
      total: [treatment.price, Validators.required],
      book: [book],
      item: [treatment, Validators.required],
      invoice: [null]
    });

    // Add listeners to recalculate when there is any change
    newTreatmentFormGroup.get('subtotal')?.valueChanges.subscribe(() => {
      this.calculateTotal(newTreatmentFormGroup);
    });

    newTreatmentFormGroup.get('extra')?.valueChanges.subscribe(() => {
      this.calculateTotal(newTreatmentFormGroup);
    });

    newTreatmentFormGroup.get('discount')?.valueChanges.subscribe(() => {
      this.calculateTotal(newTreatmentFormGroup);
    });

    treatments.push(newTreatmentFormGroup);
    this.calculateTotalInvoice();
    console.log(this.invoiceForm.value);

  }

  //add product to invoice item
  addProduct() {
    const product = this.productForm.get('product')?.value;
    const treatments = this.invoiceForm.get('invoiceItems') as FormArray;
    const newProductFormGroup = this.fb.group({
      id: [null],
      description: [product.name],
      observation: [''],
      worker: [null],
      amount: [1, Validators.required],
      subtotal: [product.price, Validators.required],
      extra: [0],
      discount: [0],
      total: [product.price, Validators.required],
      book: [null],
      item: [product, Validators.required],
      invoice: [null]
    });

    // Add listeners to recalculate when there is any change
    newProductFormGroup.get('subtotal')?.valueChanges.subscribe(() => {
      this.calculateProductTotal(newProductFormGroup);
    });

    newProductFormGroup.get('amount')?.valueChanges.subscribe(() => {
      this.calculateProductTotal(newProductFormGroup);
    });

    newProductFormGroup.get('discount')?.valueChanges.subscribe(() => {
      this.calculateProductTotal(newProductFormGroup);
    });

    treatments.push(newProductFormGroup);
    this.calculateTotalInvoice();
    console.log(this.invoiceForm.value);
    this.productForm.get('product')?.setValue(null);

  }

  generateOptions(stock: number): number[] {
    return Array.from({ length: stock }, (_, i) => i + 1);
  }

  // calculate the total for the item based on the fields "subtotal", "extra" e "discount"
  calculateProductTotal(formGroup: FormGroup) {
    const subtotal = formGroup.get('subtotal')?.value || 0;
    const discount = formGroup.get('discount')?.value || 0;
    const amount = formGroup.get('amount')?.value || 0;

    const total = (subtotal * amount) - discount;

    // update the total in the current invoiceItem
    const totalControl = formGroup.get('total');
    if (totalControl) {
      totalControl.setValue(total);
    }
    this.calculateTotalInvoice();
  }


  // calculate the total for the item based on the fields "subtotal", "extra" e "discount"
  calculateTotal(formGroup: FormGroup) {
    const subtotal = formGroup.get('subtotal')?.value || 0;
    const extra = formGroup.get('extra')?.value || 0;
    const discount = formGroup.get('discount')?.value || 0;

    const total = subtotal + extra - discount;

    // update the total in the current invoiceItem
    const totalControl = formGroup.get('total');
    if (totalControl) {
      totalControl.setValue(total);
    }
    this.calculateTotalInvoice();
  }

  get itemOfInvoiceItemsFormArray(): FormArray {
    return this.invoiceForm.get('invoiceItems')?.get('item') as FormArray;
  }

  // Method to remove a treatment from the form array
  removeTreatment(index: number) {
    const treatments = this.invoiceForm.get('invoiceItems') as FormArray;
    treatments.removeAt(index);
    this.calculateTotalInvoice();
  }

  //get form group from invoice item index
  getInvoiceItemFormGroup(index: number): FormGroup {
    return (this.invoiceForm.get('invoiceItems') as FormArray).at(index) as FormGroup;
  }

  //convert control to formGroup
  getItemFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

}
import { BookService } from './../../../book/services/book.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { User } from 'src/app/user/models/user.interface';
import { Invoice } from '../../model/invoice.interface';
import { Store } from '@ngrx/store';
import { BookActions } from 'src/app/book/state/book.action';
import { AppState } from 'src/app/state/app.state';
import { Book } from 'src/app/book/model/book.interface';
import { selectBooks } from 'src/app/book/state/book.selectors';

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
  @Input() users: ReadonlyArray<User> = [];

  // booksDone: ReadonlyArray<Book> = [];
  // booksDone$ = this.store.select(selectBooks());

  //send data to page
  @Output() action = new EventEmitter();

  //properties
  invoiceForm: FormGroup;
  selectedTreatment: Treatment | null = null;

  clientFormControl: FormControl;


  //constructor
  constructor(private fb: FormBuilder, private bookService: BookService, private store: Store<AppState>) {
    this.clientFormControl = this.fb.control(null, Validators.required);

    this.invoiceForm = this.fb.group({
      id: [null],
      client: this.clientFormControl,
      observation: [null],
      total: [0, Validators.required],
      date: [null],
      invoiceItems: this.fb.array([]),
    });
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
  

  hasInvoiceItems(): boolean {
    const invoiceItemsArray = this.invoiceForm.get('invoiceItems') as FormArray;
    return invoiceItemsArray && invoiceItemsArray.length > 0;
  }

  ngOnInit(): void {
    this.checkAction();
    // Adicione o observador para chamar o serviço quando o cliente for alterado
    this.clientFormControl.valueChanges.subscribe((client) => {
      if (client) {
        this.loadBooksForClient(client.id); // Chame o método que carrega os livros para o cliente
      }
    });
  }

  findTreatmentById(treatmentId: number): Treatment | undefined {
    // Supondo que você tenha um array de tratamentos chamado 'treatmentsArray'
    return this.treatments.find(treatment => treatment.id === treatmentId);
  }

  // Método para carregar os livros do cliente usando o serviço
  loadBooksForClient(clientId: number) {
    console.log("loadBooksForClient => " + clientId);

    //this.invoiceForm.get('invoiceItems')?.reset(); // Limpa os items antigos
    const invoiceItemsFormArray = this.invoiceForm.get('invoiceItems') as FormArray;
    invoiceItemsFormArray.clear(); // Limpa todos os FormGroups dentro do FormArray


    // this.clientFormControl.setValue(null); // Reseta o valor do cliente selecionado


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

  // searchBooksDone() {

  //   this.store.dispatch({ type: BookActions.GET_BOOK_SLOT_LIST, payload: bs });

  //   this.booksDone$.subscribe((data) => {
  //     this.booksDone = data;
  //   })
  // }

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
      //console.log(JSON.stringify("invoice => " + this.selectedInvoice.firstName));
      this.invoiceForm.patchValue(this.selectedInvoice);
    }

  }

  //compare the objects
  compareTreatmentObjects(object1: any, object2: any) {
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

  get invoiceItemsFormArray(): FormArray {
    return this.invoiceForm.get('invoiceItems') as FormArray;
  }

  // // Update the loop to explicitly type itemGroup as FormGroup
  // getInvoiceItemsFormArrayControls(): FormGroup[] {
  //   return this.invoiceItemsFormArray.controls as FormGroup[];
  // }
  getInvoiceItemsFormArrayControls(): AbstractControl[] {
    return (this.invoiceForm.get('invoiceItems') as FormArray).controls;
  }

  addTreatment(treatment: any, book: any) {
    console.log("-------- addTreatment => " + JSON.stringify(treatment))
    const treatments = this.invoiceForm.get('invoiceItems') as FormArray;
    const newTreatmentFormGroup = this.fb.group({
      id: [null],
      description: [treatment.description],
      observation: [''],
      worker: [null],
      amount: [1, Validators.required],
      subtotal: [treatment.price, Validators.required],
      extra: [0],
      discount: [0],
      total: [treatment.price, Validators.required],
      book: [book],
      item: [treatment, Validators.required],
      invoice: [null] // Inicializar com uma fatura existente, se necessário
    });

    // Adicionar listeners para recalcular o total quando houver alterações
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


  // Método para calcular o campo "total" com base nos campos "subtotal", "extra" e "discount"
  calculateTotal(formGroup: FormGroup) {
    console.log("calculateTotal")
    const subtotal = formGroup.get('subtotal')?.value || 0;
    const extra = formGroup.get('extra')?.value || 0;
    const discount = formGroup.get('discount')?.value || 0;

    const total = subtotal + extra - discount;

    // Atualizar o campo "total" no FormGroup do array com o novo valor calculado
    const totalControl = formGroup.get('total');
    if (totalControl) {
      totalControl.setValue(total);

      // const totalForm = this.invoiceForm.get('total') ? this.invoiceForm.get('total')?.value : 0;
      // console.log("totalForm.value => " + this.invoiceForm.get('total')?.value);
      // console.log("totalForm typeof totalForm => " + typeof totalForm);
      // console.log("totalForm typeof total => " + typeof total);
      // this.invoiceForm.get('total')?.setValue( totalForm + total);      

      // console.log("totalForm => " + totalForm + total);
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


  getInvoiceItemFormGroup(index: number): FormGroup {
    return (this.invoiceForm.get('invoiceItems') as FormArray).at(index) as FormGroup;
  }

  getItemFormGroup(control: AbstractControl): FormGroup {
    return control as FormGroup;
  }

}

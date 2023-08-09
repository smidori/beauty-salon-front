import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductActions } from 'src/app/product/state/product.actions';
import { selectProducts } from 'src/app/product/state/product.selectors';
import { AppState } from 'src/app/state/app.state';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { TreatmentActions } from 'src/app/treatment/state/treatment.actions';
import { selectTreatments } from 'src/app/treatment/state/treatment.selectors';
import { User } from 'src/app/user/models/user.interface';
import { UserActions } from 'src/app/user/state/user.actions';
import { selectUsers } from 'src/app/user/state/user.selectors';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { Invoice, Product } from '../../model/invoice.interface';
import { InvoiceActions } from '../../state/invoice.action';
import { selectInvoices, selectInvoice } from '../../state/invoice.selectors';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { InvoiceService } from '../../services/invoice.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  //properties
  menuTitle: string = 'Create Invoice';
  invoice$: Observable<Invoice | undefined>;
  invoice: Invoice | null = null;


  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());

  test$ = this.store.select(selectInvoices());

  users: ReadonlyArray<User> = [];
  users$ = this.store.select(selectUsers());


  products: ReadonlyArray<Product> = [];
  products$ = this.store.select(selectProducts());

  invoiceId: number;

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private invoiceService: InvoiceService) {

    //properties
    this.invoiceId = this.acRouter.snapshot.params['id'];
    this.invoice$ = this.store.select(selectInvoice(this.invoiceId));

    //subscribe the invoice$
    this.invoice$.subscribe(data => {
      if (data) {
        this.menuTitle = "Update Invoice";
        this.invoice = data;
      }
    });
  }


  ngOnInit(): void {
    // //GET TREATMENT LIST - dispatch the action
    // this.store.dispatch({ type: TreatmentActions.GET_TREATMENT_LIST });
    // this.treatments$.subscribe((data) => {
    //   this.treatments = data;
    // });

    // //GET USERS LIST - dispatch the action
    // this.store.dispatch({ type: UserActions.GET_USER_LIST });
    // this.users$.subscribe((data) => {
    //   this.users = data;
    // });

    // //GET PRODUCT LIST - dispatch the action
    // this.store.dispatch({ type: ProductActions.GET_PRODUCT_LIST });
    // this.products$.subscribe((data) => {
    //   this.products = data;
    // });

    this.checkAction();
  }

  //check is is update or create
  checkAction() {
    if (this.invoiceId) {
      this.patchDataValues()
    }
  }

  //copy the values from selectedInvoice to form
  patchDataValues() {
    if (this.invoiceId) {

      this.invoiceService.getInvoiceById(this.invoiceId).subscribe(
        (data: Invoice) => {
          console.log("data => " + JSON.stringify(data))
          this.invoice = data;
        },
        (error) => {
          console.error('Error to get Invoice:', error);
        }
      );
    }
  }

  //actions that can be executed
  formAction(data: { value: Invoice, action: string }) {
    console.log("Invoice formAction " + data.value)
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: InvoiceActions.ADD_INVOICE_API, payload: data.value });
        return;
      }
      case "Update": {
        this.store.dispatch({ type: InvoiceActions.UPDATE_INVOICE_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

  //navigate to the page
  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["invoices", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["invoices", "list"]);
        return;
      }
      default: ""
    }
  }

  generatePDF() {
    // Get the element to converte to PDF
    const element = document.getElementById('invoice-pdf');
      
    // Use html2canvas to convert element HTML to an image
    if(element){
      html2canvas(element).then((canvas) => {
        //const imgWidth = 100; // Largura da imagem no PDF
        const imgWidth = 180; 
        const imgHeight = (imgWidth / canvas.width) * canvas.height;

        //generate a image
        const imgData = canvas.toDataURL('image/png');
    
        // generate a pdf
        const pdf = new jsPDF.default('p', 'mm', 'a4');
    
        // Add the page to pdf
        pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    
        //save to pdf
        pdf.save('invoice_' + this.invoice?.date.toString().substring(0, 10) +"_" + this.invoice?.client.firstName + " " + this.invoice?.client.lastName 
        + ".pdf");
      });
    }
    
  }
}
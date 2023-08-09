import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, catchError, tap } from 'rxjs';
import { ProductActions } from 'src/app/product/state/product.actions';
import { selectProducts } from 'src/app/product/state/product.selectors';
import { AppState } from 'src/app/state/app.state';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { TreatmentActions } from 'src/app/treatment/state/treatment.actions';
import { selectTreatments } from 'src/app/treatment/state/treatment.selectors';
import { User } from 'src/app/user/models/user.interface';
import { UserService } from 'src/app/user/services/user.service';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { Invoice, Product } from '../../model/invoice.interface';
import { InvoiceActions } from '../../state/invoice.action';
import { selectInvoice, selectInvoices } from '../../state/invoice.selectors';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  //properties
  menuTitle: string = 'Create Invoice';
  invoice$: Observable<Invoice | undefined>;
  invoice: Invoice | null = null;


  treatments: ReadonlyArray<Treatment> = [];
  treatments$ = this.store.select(selectTreatments());

  test$ = this.store.select(selectInvoices());

  clients: User[] = [];

  products: ReadonlyArray<Product> = [];
  products$ = this.store.select(selectProducts());

  idClient: number | null;

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private userService: UserService) {

    //properties
    const id = this.acRouter.snapshot.params['id'];
    this.invoice$ = this.store.select(selectInvoice(id));

    //subscribe the invoice$
    this.invoice$.subscribe(data => {
      if (data) {
        this.menuTitle = "Update Invoice";
        this.invoice = data;
      }
    });

    this.idClient = this.acRouter.snapshot.params['id'];
  }


  ngOnInit(): void {
    //GET TREATMENT LIST - dispatch the action
    this.store.dispatch({ type: TreatmentActions.GET_TREATMENT_LIST });
    this.treatments$.subscribe((data) => {
      this.treatments = data;
    });

    //GET USERS LIST - dispatch the action
    this.loadUsersByRole('CLIENT');


    this.idClient = this.acRouter.snapshot.params['id'];
    

    //GET PRODUCT LIST - dispatch the action
    this.store.dispatch({ type: ProductActions.GET_PRODUCT_LIST });
    this.products$.subscribe((data) => {
      this.products = data;
    });
  }

  //load the specific users
  loadUsersByRole(role: string) {
    this.userService.getUsersByRole(role).pipe(
      tap(users => {
          this.clients = users;

          //in case the invoice is generate from completed book, bring only this client
          if(this.idClient != null){
            var selectedClient = this.clients.find(client => client.id == this.idClient);
            if(selectedClient){
              this.clients = [selectedClient];
            }
          }

      }),
      catchError(error => {
        console.error('Error loading users by role: ' + role, error);
        return [];
      })
    ).subscribe();
  }

  //actions that can be executed
  formAction(data: { value: Invoice, action: string }) {
    console.log("Invoice formAction " + data.action)
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: InvoiceActions.ADD_INVOICE_API, payload: data.value });
        //this.router.navigate(["invoices", "pdf", createdInvoiceId]);        
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


}



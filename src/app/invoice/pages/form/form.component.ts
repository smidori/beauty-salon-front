import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Treatment } from 'src/app/treatment/models/treatment.interface';
import { TreatmentActions } from 'src/app/treatment/state/treatment.actions';
import { selectTreatments } from 'src/app/treatment/state/treatment.selectors';
import { User } from 'src/app/user/models/user.interface';
import { UserActions } from 'src/app/user/state/user.actions';
import { selectUsers } from 'src/app/user/state/user.selectors';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { Invoice } from '../../model/invoice.interface';
import { InvoiceActions } from '../../state/invoice.action';
import { selectInvoices, selectInvoice } from '../../state/invoice.selectors';

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

  users: ReadonlyArray<User> = [];
  users$ = this.store.select(selectUsers());

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) {

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
  }


  ngOnInit(): void {
    //GET TREATMENT LIST - dispatch the action
    this.store.dispatch({ type: TreatmentActions.GET_TREATMENT_LIST });
    this.treatments$.subscribe((data) => {
      this.treatments = data;
    });

    //GET USERS LIST - dispatch the action
    this.store.dispatch({ type: UserActions.GET_USER_LIST });
    this.users$.subscribe((data) => {
      this.users = data;
    })
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


}



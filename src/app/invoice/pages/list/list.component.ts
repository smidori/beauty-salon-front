import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/user/models/user.interface';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { TableActions } from '../../enums/table-actions.enum';
import { Invoice } from '../../model/invoice.interface';
import { InvoiceActions } from '../../state/invoice.action';
import { selectInvoices } from '../../state/invoice.selectors';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  invoices: ReadonlyArray<Invoice> = [];
  invoices$ = this.store.select(selectInvoices());
  
  
  headers: { headerName: string, fieldName: keyof Invoice, userName?: (keyof User)[] }[] = [
    { headerName: "Client", fieldName: "client", userName: ["firstName", "lastName"] },    
    { headerName: "Date", fieldName: "date" },
    { headerName: "Total", fieldName: "total" },
    { headerName: "Observation", fieldName: "observation" },
  ];
  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
  ){}

  ngOnInit(): void {  
    this.store.dispatch({ type: InvoiceActions.GET_INVOICE_LIST});
    this.assignInvoices();
  }

  assignInvoices() {
    this.invoices$.subscribe((data) => {
      this.invoices = data;
    });
  }

  selectInvoice(data: {invoice: Invoice, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        this.router.navigate(['invoices', 'pdf', data.invoice.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: InvoiceActions.DELETE_INVOICE_API, payload: data.invoice.id});
        return;
      }
      default: ""
    }
  }

  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["invoices","form"]);
        return;
      }
      default: ""
    }
  }
}

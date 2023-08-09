import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { User } from 'src/app/user/models/user.interface';
import { CommandBarActions } from '../../enums/command-bar-actions.enum';
import { Invoice } from '../../model/invoice.interface';
import { InvoiceActions } from '../../state/invoice.action';
import { selectInvoices } from '../../state/invoice.selectors';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { InvoiceFilterParams } from '../../model/invoiceFilterParams.interface';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  invoices: ReadonlyArray<Invoice> = [];
  invoices$ = this.store.select(selectInvoices());
  
  isVisibleCreate = false;
  isVisibleList = false;

  
  headers: { headerName: string, fieldName: keyof Invoice, userName?: (keyof User)[] }[] = [
    { headerName: "Client", fieldName: "client", userName: ["firstName", "lastName"] },    
    { headerName: "Date", fieldName: "date" },
    { headerName: "Total", fieldName: "total" },
    { headerName: "Observation", fieldName: "observation" },
  ];
  
  
  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private auth: AuthenticateService,

  ){}

  ngOnInit(): void {  
    const filterParams: InvoiceFilterParams = {
      dateBook: null,  
      clientId: null,  
      filterDateBy: "=",
    };

    const currentDate = new Date();
    var today = currentDate.toISOString();

    if(!this.auth.isClient()){  
      filterParams.dateBook = today;
    }

    this.store.dispatch({ type: InvoiceActions.GET_INVOICE_LIST, payload: filterParams});
    this.assignInvoices();

    this.isVisibleCreate = !this.auth.isClient();
    this.isVisibleList = !this.auth.isClient();
  }

  assignInvoices() {
    this.invoices$.subscribe((data) => {
      this.invoices = data;
    });
  }

  executeActionInvoice(data: {obj: any, action: TableActions}) {
    switch(data.action) {
      case TableActions.View: {
        this.router.navigate(['invoices', 'pdf', data.obj.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: InvoiceActions.DELETE_INVOICE_API, payload: data.obj.id});
        return;
      }
      case TableActions.Search: {
        this.store.dispatch({type: InvoiceActions.GET_INVOICE_LIST, payload: data.obj});
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

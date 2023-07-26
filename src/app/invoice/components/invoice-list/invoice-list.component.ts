import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { TableActions } from '../../enums/table-actions.enum';
import { Invoice } from '../../model/invoice.interface';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit{
  @Input() headers: Array<{ headerName: string, fieldName: keyof Invoice, userName?: (keyof User)[] }> = []
  @Input() invoices: ReadonlyArray<Invoice> = [];
  @Output() invoice = new EventEmitter<{invoice: Invoice, action:TableActions}>();

  headerFields:string[] = [];

  constructor() {}
  
  getFullName(user: User, userFields: (keyof User)[]): string {
    const nameParts = userFields.map(field => user[field]);
    return nameParts.join(' ');
  }

  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  selectInvoice(invoice: Invoice, action:TableActions) {
    this.invoice.emit({invoice,action})
  }
}


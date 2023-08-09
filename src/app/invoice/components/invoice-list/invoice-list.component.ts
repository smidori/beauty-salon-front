import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/user/models/user.interface';
import { Invoice } from '../../model/invoice.interface';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { UserService } from 'src/app/user/services/user.service';
import { catchError, tap } from 'rxjs';
import { InvoiceFilterParams } from '../../model/invoiceFilterParams.interface';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';

@Component({
  selector: 'invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  @Input() headers: Array<{ headerName: string, fieldName: keyof Invoice, userName?: (keyof User)[] }> = []
  @Input() invoices: ReadonlyArray<Invoice> = [];
  //@Output() invoice = new EventEmitter<{ invoice: Invoice, action: TableActions }>();
  @Output() invoice = new EventEmitter<{ obj: any, action: TableActions }>();

  headerFields: string[] = [];
  searchForm: FormGroup;
  clients: User[] = [];
  isClient: boolean = true;

  constructor(private fb: FormBuilder,
    private auth: AuthenticateService,
    private userService: UserService) {

    this.searchForm = this.fb.group({
      dateBook: [null],
      clientId: [null],
      filterDateBy: ['='],
    });

    const currentDate = new Date();
    var today = currentDate.toISOString();

    if (!this.auth.isClient()) {
      this.searchForm.get('dateBook')?.setValue(today);
    }

    this.loadClients("CLIENT");
    this.isClient = this.auth.isClient();
  }

  ngOnInit(): void {
    this.isClient = this.auth.isClient();
    this.getHeaderFields();
  }

  //load the clients, that will be used as a filter
  loadClients(role: string) {
    this.userService.getUsersByRole(role).pipe(
      tap(users => {
        this.clients = users;
      }),
      catchError(error => {
        console.error('Error loading clients: ', error);
        return [];
      })
    ).subscribe();
  }

  searchInvoicesByFilter(action: TableActions) {

    var obj: InvoiceFilterParams = {
      dateBook: this.searchForm.get('dateBook')?.value,
      clientId: this.searchForm.get('clientId')?.value,
      filterDateBy: this.searchForm.get('filterDateBy')?.value,
    };

    this.invoice.emit({ obj, action });
  }


  getFullName(user: User, userFields: (keyof User)[]): string {
    const nameParts = userFields.map(field => user[field]);
    return nameParts.join(' ');
  }




  getHeaderFields() {
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  // selectInvoice(invoice: Invoice, action: TableActions) {
  //   this.invoice.emit({ invoice, action })
  // }

  executeActionBook(obj: any, action: TableActions) {
    this.invoice.emit({ obj, action })
  }

  //clear the filter parameters
  clearSearch() {
    this.searchForm.reset();
  }
}


import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/invoice/model/invoice.interface';
import { DialogConfirmComponent } from 'src/app/shared/components/dialog-confirm/dialog-confirm.component';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  //get the values from input
  @Input() headers: Array<{ headerName: string, fieldName: keyof Product }> = []
  @Input() products: ReadonlyArray<Product> = [];

  //send the product
  @Output() product = new EventEmitter<{product: Product, action:TableActions}>();
  
  //variables
  headerFields:string[] = [];

  constructor(private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.getHeaderFields();
  }

  //assign the values to the header fields and the actions
  getHeaderFields(){
    this.headerFields = this.headers.map((data) => data.fieldName);
    this.headerFields.push("actions");
  }

  //get the product that was selected
  selectProduct(product: Product, action:TableActions) {
    this.product.emit({product,action})
  }

  //modal delete confirmation
  openDeleteConfirmationDialog(product: Product, action:TableActions): void {
    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      width: '400px',
      data: 'Are you sure you want to delete this item?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.selectProduct(product, action)
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';
import { Product } from 'src/app/invoice/model/invoice.interface';
import { TableActions } from 'src/app/shared/enums/table-actions.enum';
import { AppState } from 'src/app/state/app.state';
import { ProductActions } from '../../state/product.actions';
import { selectProducts } from '../../state/product.selectors';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { ProductService } from '../../services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  products: ReadonlyArray<Product> = [];
  products$ = this.store.select(selectProducts());
  // isAdmin = false;

  //headers used to show in the list 
  headers: { headerName: string, fieldName: keyof Product }[] = [
    { headerName: "Name", fieldName: "name" },
    { headerName: "Description", fieldName: "description" },
    { headerName: "Price", fieldName: "price" },
    { headerName: "Stock", fieldName: "stock" }
  ];
  

  constructor(
    private router: Router, 
    private store: Store<AppState>,
    private authService: AuthenticateService,
    private productService: ProductService,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.store.dispatch({type: ProductActions.GET_PRODUCT_LIST})
    this.assignProducts();
    
    this.productService.onError().subscribe((error) => {
      if (error) {
        this.snackBar.open(error, 'Dismiss', {
          duration: 5000, // Close after 5 seconds 
        });
      }
    });
    // this.isAdmin = this.authService.isAdmin();
  }

  //assign the products from the service to the variable
  assignProducts() {
    this.products$.subscribe((data) => {
      this.products = data;
      // if (this.products && this.products.length > 0) {
      //   console.log("data products => " + JSON.stringify(data));
      // }
    })
  }

  //select product from the list
  selectProduct(data: {product: Product, action : TableActions}){
    switch(data.action){
      case TableActions.View :{
        this.router.navigate(['products', 'form', data.product.id]);
        return;
      }
      case TableActions.Delete: {
        this.store.dispatch({type: ProductActions.DELETE_PRODUCT_API, payload: data.product.id});
        return;
      }
      default: ""
    }
  }

  
  //navigate to the page
  executeCommandBarAction(action: CommandBarActions){
    switch(action){
      case CommandBarActions.Create :{
        this.router.navigate(["products","form"]);
        return;
      }
      case CommandBarActions.List :{
        this.router.navigate(["products","list"]);
        return;
      }
      default: ""
    }
  }

   

}


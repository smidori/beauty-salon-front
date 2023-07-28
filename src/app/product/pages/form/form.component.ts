import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from 'src/app/invoice/model/invoice.interface';
import { CommandBarActions } from 'src/app/shared/enums/command-bar-actions.enum';
import { AppState } from 'src/app/state/app.state';
import { ProductActions } from '../../state/product.actions';
import { selectProduct } from '../../state/product.selectors';
import { AuthenticateService } from 'src/app/core/services/authenticate.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  //properties
  menuTitle: string = 'Create Product';

  product$: Observable<Product | undefined>;
  product: Product | null = null;

  constructor(
    private acRouter: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private auth: AuthenticateService) {

    //get id from the url
    const id = this.acRouter.snapshot.params['id'];

    //use the selector to get the object from store
    this.product$ = this.store.select(selectProduct(id));
   
    this.product$.subscribe(data => {
      if (data) {
        this.menuTitle = "Update Product";
        //assign the value to this.product
        this.product = data;
      }
    });
  }


  ngOnInit(): void {
  }


  //actions that can be executed
  formAction(data: { value: Product, action: string }) {
    switch (data.action) {
      case "Create": {
        this.store.dispatch({ type: ProductActions.ADD_PRODUCT_API, payload: data.value });
        return;
      }
      case "Update": {
        this.store.dispatch({ type: ProductActions.UPDATE_PRODUCT_API, payload: data.value });
        return;
      }
      default: ""
    }
  }

  //navigate to the page
  executeCommandBarAction(action: CommandBarActions) {
    switch (action) {
      case CommandBarActions.Create: {
        this.router.navigate(["products", "form"]);
        return;
      }
      case CommandBarActions.List: {
        this.router.navigate(["products", "list"]);
        return;
      }
      default: ""
    }
  }

}


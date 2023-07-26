
import { Injectable } from "@angular/core";
import { ProductService } from "../services/product.service";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { ProductActions } from "./product.actions";
import { EMPTY, catchError, map, mergeMap, of, tap } from "rxjs";
import { Product } from "src/app/invoice/model/invoice.interface";

@Injectable()
export class ProductEffects {
    constructor(
        private actions$: Actions,
        private productService: ProductService,
        private router: Router
    ) { }

    //call the service to get Products
    getProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.GET_PRODUCT_LIST),
            mergeMap(() => this.productService.getProducts()
                .pipe(
                    map(products => ({ type: ProductActions.SET_PRODUCT_LIST, products })),
                    catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true }
    );

    //call the service to save Product
    addProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.ADD_PRODUCT_API),
            mergeMap((data: { type: string, payload: Product }) => this.productService.addProduct(data.payload)
                .pipe(
                    map(products => ({ type: ProductActions.ADD_PRODUCT_STATE, product: data.payload })),
                    tap(() => this.router.navigate(["products"])),
                    catchError((error) => of({ type: ProductActions.ADD_PRODUCT_ERROR, error: error.error.message }))

                    //catchError(() => EMPTY)
                ))
        )
    }, { dispatch: true })

    //call the service to update the Product
    updateProduct$ = createEffect(() => {
        console.log("updateProduct createEffect ")
        return this.actions$.pipe(
            ofType(ProductActions.UPDATE_PRODUCT_API),
            mergeMap((data: { type: string, payload: Product }) =>
                this.productService.updateProduct(data.payload.id, data.payload)
                    .pipe(
                        map(products => ({ type: ProductActions.UPDATE_PRODUCT_STATE, product: data.payload })),
                        tap(() => this.router.navigate(["products"])),
                        catchError(() => EMPTY)
                    ))
        )
    }, { dispatch: true })

    //call the service to delete the Product
    deleteProduct$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.DELETE_PRODUCT_API),
            mergeMap((data: { payload: number }) => this.productService.deleteProduct(data.payload)
                .pipe(
                    map(() => ({ type: ProductActions.DELETE_PRODUCT_STATE, productId: data.payload })),
                    catchError(() => EMPTY)
                ))

        )

    })

}
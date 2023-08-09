import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, map, catchError, EMPTY, tap, of } from "rxjs";
import { Invoice } from "../model/invoice.interface";
import { InvoiceService } from "../services/invoice.service";
import { InvoiceActions } from "./invoice.action";
import { InvoiceFilterParams } from "../model/invoiceFilterParams.interface";

@Injectable()
export class InvoiceEffects {
    constructor(
        private actions$: Actions,
        private invoiceService: InvoiceService,
        private router: Router
    ) { }

    // getInvoices$ = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(InvoiceActions.GET_INVOICE_LIST),
    //         mergeMap(() => this.invoiceService.getInvoices()
    //           .pipe(
    //             map(invoices => ({ type: InvoiceActions.SET_INVOICE_LIST, invoices })),
    //             catchError(() => EMPTY)
    //           ))
    //         )
    //     }, {dispatch: true}
    //   );

    getInvoices$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InvoiceActions.GET_INVOICE_LIST),
            mergeMap((data: { type: string, payload: InvoiceFilterParams }) =>
                this.invoiceService.getInvoicesByFilter(data.payload)
                    .pipe(
                        map(invoices => ({ type: InvoiceActions.SET_INVOICE_LIST, invoices })),
                        catchError(() => EMPTY)
                    ))
        )
    }, { dispatch: true }
    );

    addInvoice$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InvoiceActions.ADD_INVOICE_API),
            mergeMap((data: { type: string, payload: Invoice }) => this.invoiceService.addInvoice(data.payload)
                .pipe(
                    mergeMap(createdInvoice => {
                        this.router.navigate(["invoices", "pdf", createdInvoice.id]);
                        return [
                            { type: InvoiceActions.ADD_INVOICE_STATE, invoice: data.payload }
                        ];
                    }),
                    catchError((error) => of({ type: InvoiceActions.ADD_INVOICE_ERROR, error: error.error.message }))
                )

            )
        )
    }, { dispatch: true })

    updateInvoice$ = createEffect(() => {
        console.log("updateInvoice createEffect ")
        return this.actions$.pipe(
            ofType(InvoiceActions.UPDATE_INVOICE_API),
            mergeMap((data: { type: string, payload: Invoice }) =>
                this.invoiceService.updateInvoice(data.payload.id, data.payload)
                    .pipe(
                        map(invoices => ({ type: InvoiceActions.UPDATE_INVOICE_STATE, invoice: data.payload })),
                        tap(() => this.router.navigate(["invoices"])),
                        catchError(() => EMPTY)
                    ))
        )
    }, { dispatch: true })

    deleteInvoice$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(InvoiceActions.DELETE_INVOICE_API),
            mergeMap((data: { payload: number }) => this.invoiceService.deleteInvoice(data.payload)
                .pipe(
                    map(() => ({ type: InvoiceActions.DELETE_INVOICE_STATE, invoiceId: data.payload })),
                    catchError(() => EMPTY)
                ))

        )

    })

}
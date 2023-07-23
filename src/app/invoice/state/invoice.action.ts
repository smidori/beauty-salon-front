import { createAction, props } from "@ngrx/store";
import { Invoice } from "../model/invoice.interface";


export enum InvoiceActions {
    GET_INVOICE_LIST = '[Invoice] Get Invoice list',
    SET_INVOICE_LIST = '[Invoice] Set Invoice list',
    ADD_INVOICE_API = '[Invoice] Add Invoice api',
    ADD_INVOICE_STATE = '[Invoice] Add Invoice state',
    ADD_INVOICE_ERROR = '[Invoice] Add Invoice error',
    CLEAR_INVOICE_ERROR = '[Invoice] Clear Invoice Error',
    UPDATE_INVOICE_API = '[Invoice] Update Invoice api',
    UPDATE_INVOICE_STATE = '[Invoice] Update Invoice state',
    DELETE_INVOICE_API = '[Invoice] Delete Invoice api',
    DELETE_INVOICE_STATE = '[Invoice] Delete Invoice state',

}

export const getInvoiceList = createAction(
    InvoiceActions.GET_INVOICE_LIST,
);

export const setInvoiceList = createAction(
    InvoiceActions.SET_INVOICE_LIST,
    props<{ invoices: ReadonlyArray<Invoice> }>()
)

export const addInvoiceState = createAction(
    InvoiceActions.ADD_INVOICE_STATE, props<{ invoice: Invoice }>()
);


export const updateInvoiceState = createAction(
    InvoiceActions.UPDATE_INVOICE_STATE,
    props<{ invoice: Invoice }>()
);


export const deleteInvoiceState = createAction(
    InvoiceActions.DELETE_INVOICE_STATE, props<{ invoiceId: number }>()
)


export const addInvoiceError = createAction(
    InvoiceActions.ADD_INVOICE_ERROR,
    props<{ error: any }>()
);

export const clearInvoiceError = createAction(
    InvoiceActions.CLEAR_INVOICE_ERROR
);
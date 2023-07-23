import { createReducer, on } from "@ngrx/store";
import { Invoice } from "../model/invoice.interface";
import { setInvoiceList, addInvoiceState, updateInvoiceState, deleteInvoiceState, addInvoiceError, clearInvoiceError } from "./invoice.action";

export interface InvoiceState{
    invoices: ReadonlyArray<Invoice>;
    error: string | null; 
}

export const initialState: InvoiceState = {
    invoices: [],
    error: null
}

export const invoiceReducer = createReducer(
    initialState,
    // on(setInvoiceList, (state, {invoices}) => {return {...state, invoices}} ),
    on(setInvoiceList, (state, { invoices }) => { return {...state, invoices}}),
    on(addInvoiceState, (state, {invoice}) => {return {...state, invoices:[...state.invoices, invoice], error: null}}),
    // on(updateInvoiceState, (state, {invoice}) => {
    //     return {...state, invoices: state.invoices.map(data => data.id === invoice.id ? invoice : data)}
    //   }),

    on(updateInvoiceState, (state, { invoice }) => ({
    ...state,
    invoices: state.invoices.map((data) => (data.id === invoice.id ? invoice : data)),
    error: null, // clean the error message in case success
    })),

    // on(deleteInvoiceState, (state, {invoiceId}) => 
    // {return {...state, invoices: state.invoices.filter(data => data.id != invoiceId)}
    // }),
    on(deleteInvoiceState, (state, { invoiceId }) => ({
        ...state,
        invoices: state.invoices.filter((data) => data.id != invoiceId),
        error: null, // Limpa a mensagem de erro em caso de sucesso
      })),
    //update the state with the message error
    on(addInvoiceError, (state, { error }) => ({ ...state, error })),
    
    on(clearInvoiceError, (state) => ({ ...state, error: null }))

)
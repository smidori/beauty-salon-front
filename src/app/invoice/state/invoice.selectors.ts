import { createFeatureSelector, createSelector } from "@ngrx/store";
import { InvoiceState } from "./invoice.reducers";

export const selectInvoiceState = createFeatureSelector<InvoiceState>('invoiceState')

export const selectInvoices = () => createSelector(
    selectInvoiceState,
    (state: InvoiceState) => state.invoices
)

export const selectError = createSelector(
    selectInvoiceState,
    (state: InvoiceState) => state.error
  );

// export const selectInvoice = (id: number) => createSelector(
//     selectInvoiceState,
//     (state: InvoiceState) => state.invoices.find(d => d.id === id)
// )
export const selectInvoice = (id: number) => createSelector(
    selectInvoiceState,
    (state: InvoiceState) => {
        const invoice = state.invoices.find(d => {            
            return d.id == id;
          });
        return invoice;
    }
);

import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./product.reducers";

export const selectProductState = createFeatureSelector<ProductState>('productState')

export const selectProducts = () => createSelector(
    selectProductState,
    (state: ProductState) => state.products
)

export const selectError = createSelector(
    selectProductState,
    (state: ProductState) => state.error
);

export const selectProduct = (id: number) => createSelector(
    selectProductState,
    (state: ProductState) => {
        console.log('state.products => ', state.products);
        const product = state.products.find(d => {
            return d.id == id;
        });
        console.log("product ==> " + product);
        return product;
    }
);
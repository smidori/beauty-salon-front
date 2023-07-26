import { createAction, props } from "@ngrx/store";
import { Product } from "src/app/invoice/model/invoice.interface";


export enum ProductActions {
    GET_PRODUCT_LIST = '[Product] Get Product list',
    SET_PRODUCT_LIST = '[Product] Set Product list',
    ADD_PRODUCT_API = '[Product] Add Product api',
    ADD_PRODUCT_STATE = '[Product] Add Product state',
    ADD_PRODUCT_ERROR = '[Product] Add Product error',
    CLEAR_PRODUCT_ERROR = '[Product] Clear Product Error',
    UPDATE_PRODUCT_API = '[Product] Update Product api',
    UPDATE_PRODUCT_STATE = '[Product] Update Product state',
    DELETE_PRODUCT_API = '[Product] Delete Product api',
    DELETE_PRODUCT_STATE = '[Product] Delete Product state',

}

export const getProductList = createAction(
    ProductActions.GET_PRODUCT_LIST,
);

export const setProductList = createAction(
    ProductActions.SET_PRODUCT_LIST,
    props<{ products: ReadonlyArray<Product> }>()
)

export const addProductState = createAction(
    ProductActions.ADD_PRODUCT_STATE, props<{ product: Product }>()
);


export const updateProductState = createAction(
    ProductActions.UPDATE_PRODUCT_STATE,
    props<{ product: Product }>()
);


export const deleteProductState = createAction(
    ProductActions.DELETE_PRODUCT_STATE, props<{ productId: number }>()
)


export const addProductError = createAction(
    ProductActions.ADD_PRODUCT_ERROR,
    props<{ error: any }>()
);

export const clearProductError = createAction(
    ProductActions.CLEAR_PRODUCT_ERROR
);
import { createReducer, on } from "@ngrx/store";
import { addProductError, addProductState, clearProductError, deleteProductState, setProductList, updateProductState } from "./product.actions";
import { Product } from "src/app/invoice/model/invoice.interface";

export interface ProductState{
    products: ReadonlyArray<Product>;
    error: string | null; 
}

export const initialState: ProductState = {
    products: [],
    error: null
}

export const productReducer = createReducer(
    initialState,
    // on(setProductList, (state, {products}) => {return {...state, products}} ),
    on(setProductList, (state, { products }) => { return {...state, products}}),
    on(addProductState, (state, {product}) => {return {...state, products:[...state.products, product], error: null}}),
    // on(updateProductState, (state, {product}) => {
    //     return {...state, products: state.products.map(data => data.id === product.id ? product : data)}
    //   }),

    on(updateProductState, (state, { product }) => ({
    ...state,
    products: state.products.map((data) => (data.id === product.id ? product : data)),
    error: null, // clean the error message in case success
    })),

    // on(deleteProductState, (state, {productId}) => 
    // {return {...state, products: state.products.filter(data => data.id != productId)}
    // }),
    on(deleteProductState, (state, { productId }) => ({
        ...state,
        products: state.products.filter((data) => data.id != productId),
        error: null, // Limpa a mensagem de erro em caso de sucesso
      })),
    //update the state with the message error
    on(addProductError, (state, { error }) => ({ ...state, error })),
    
    on(clearProductError, (state) => ({ ...state, error: null }))

)
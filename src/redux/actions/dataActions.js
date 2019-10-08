import { SET_PRODUCTS, LOADING_DATA, DELETE_PRODUCT, CLEAR_ERRORS, SET_ERRORS, POST_PRODUCT, LOADING_UI } from '../types';
import axios from 'axios';

// Get all products
export const getProducts = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/products')
        .then(res => {
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_PRODUCTS,
                payload: []
            })
        })
}

// Post a product
export const postProduct = (newProduct) => dispatch => {
    dispatch({ type: LOADING_UI });
        axios.post('/product', newProduct)
        .then(res => {
            dispatch({ 
                type: POST_PRODUCT,
                payload: res.data
            });
            dispatch({ type: CLEAR_ERRORS });
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

export const deleteProduct = (idProduto) => dispatch => {
    axios.delete(`/product/${idProduto}`)
        .then(() => {
            dispatch({
                type: DELETE_PRODUCT,
                payload: idProduto
            })
        })
        .catch(err => {
            console.log(err);
        })
}
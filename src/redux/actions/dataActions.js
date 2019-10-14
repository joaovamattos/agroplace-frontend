import { SET_PRODUCTS, SET_PRODUCT, LOADING_DATA, DELETE_PRODUCT, CLEAR_ERRORS, SET_ERRORS, POST_PRODUCT, LOADING_UI, STOP_LOADING_UI, UPLOAD_IMAGE_PRODUCT, LOADING_PIC_TRUE, LOADING_PIC_FALSE } from '../types';
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

// Get one product
export const getProduct = (idProduto) => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/product/${idProduto}`)
        .then(res => {
            dispatch({
                type: SET_PRODUCT,
                payload: res.data
            })            
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch(err => {
            dispatch({
                type: SET_PRODUCT,
                payload: {}
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

export const updateProduct = (product) => dispatch => {
    dispatch({ type: LOADING_UI });
        axios.put(`/product/${product.id}`, product)
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

export const uploadProductImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_PIC_TRUE });
        axios.post('/product/image', formData)
        .then(res => {
            dispatch({
                type: UPLOAD_IMAGE_PRODUCT,
                payload: res.data
            })
        })
        .then(() => {
            dispatch({ type: LOADING_PIC_FALSE });
        })
        .catch((err) => console.log(err));
}

export const getUserData = (userId) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userId}`)
        .then(res => {
            dispatch({
                type: SET_PRODUCTS,
                payload: res.data.products
            });
        })
        .catch(() => {
            dispatch({
                type: SET_PRODUCTS,
                payload: null
            });
        })
}

export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS });
}
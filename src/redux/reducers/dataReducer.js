import { SET_PRODUCTS, SET_PRODUCT, LOADING_DATA, LOADING_PIC_FALSE, LOADING_PIC_TRUE, DELETE_PRODUCT, POST_PRODUCT, LOADING_UI, UPLOAD_IMAGE_PRODUCT } from '../types';

const initialState = {
    products: [],
    product: { 
        urlImagem: 'https://firebasestorage.googleapis.com/v0/b/agroplace-project.appspot.com/o/form_background.jpg?alt=media', 
        loadingPic: false, 
        nome: '',
        valor: '',
        descricao: '',
        categoria: '' 
    },
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case LOADING_PIC_FALSE:
            return {
                ...state,
                product: {
                    ...state.product,
                    loadingPic: false
                }
            }
        case LOADING_PIC_TRUE:
            return {
                ...state,
                product: {
                    ...state.product,
                    loadingPic: true
                }
            }
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.payload,
                loading: false
            }
        case SET_PRODUCT:
            return {
                ...state,
                product: action.payload,
                loading: false
            }
        case DELETE_PRODUCT:
            let index = state.products.findIndex((product) => product.idProduto === action.payload);
            state.products.splice(index, 1);
            return {
                ...state
            }
        case POST_PRODUCT:
            return {
                ...state,
                products: [
                    action.payload.resProduct,
                    ...state.products
                ]
            }
        case UPLOAD_IMAGE_PRODUCT:
            return {
                ...state,
                product: {
                    ...state.product,
                    urlImagem: action.payload.urlImage
                }
            }
        default:
            return state;
    }
}
import { SET_PRODUCTS, SET_PRODUCT, LOADING_DATA, DELETE_PRODUCT, POST_PRODUCT, UPLOAD_IMAGE_PRODUCT, LOADING_PIC, STOP_LOADING_PIC } from '../types';

const initialState = {
    products: [],
    product: { 
        urlImagem: '', 
        nome: '',
        valor: '',
        descricao: '',
        categoria: '' 
    },
    loadingPic: false,
    loading: false
}

export default function(state = initialState, action){
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
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
        case LOADING_PIC:
            return {
                ...state,
                loadingPic: true
            }
        case STOP_LOADING_PIC:
            return {
                ...state,
                loadingPic: false
            }
        default:
            return state;
    }
}
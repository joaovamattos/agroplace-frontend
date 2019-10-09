import { SET_PRODUCTS, LOADING_DATA, DELETE_PRODUCT, POST_PRODUCT, LOADING_UI, UPLOAD_IMAGE_PRODUCT } from '../types';


const initialState = {
    products: [],
    product: { urlImagem: 'https://firebasestorage.googleapis.com/v0/b/agroplace-project.appspot.com/o/form_background.jpg?alt=media'},
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
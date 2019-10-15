import { SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, MARK_CONVERSATIONS_READ, SET_CONVERSATIONS } from '../types';

const initialState = {
    authenticated: false,
    loading: false,
    conversations: []
};

export default function(state = initialState, action){
    switch (action.type) {
        case SET_AUTHENTICATED:
            return{
                ...state,
                authenticated: true,
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case MARK_CONVERSATIONS_READ:
            state.conversations.forEach(con => con.visualizada = true);
            return {
                ...state
            }
        case SET_CONVERSATIONS:
            return {
                ...state,
                conversations: action.payload
            };
        default:
            return state;
        }
}
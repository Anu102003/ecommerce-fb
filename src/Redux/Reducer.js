
import { REMOVE_USER, SET_USER } from "./Type";

const initialState = {
    email:'',
    authenticated:false,
    
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                userData: action.payload.email,
                authenticated: true,
            }
        case REMOVE_USER:
            return {
                ...state,
                email: '',
                authenticated: false,
            };
        default:
            return state;
    }
}

export default userReducer;



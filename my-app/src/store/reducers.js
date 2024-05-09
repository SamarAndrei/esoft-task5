import { combineReducers } from "redux";


const addOrDelToFavoriteReducer = (state = [], action) => {
    switch(action.type) {
        case 'true' :
            return [...state, action.payload ]
        case 'false' :
            return  state.filter(value => value !== action.payload)
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    favorite: addOrDelToFavoriteReducer,
});

export default rootReducer;
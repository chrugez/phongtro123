import actionTypes from "../actions/actionTypes";
const initState = {
    categories: [],
    prices: [],
    msg: '',
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_AREAS:
            return {
                ...state,
                areas: action.areas || [],
                msg: action.msg || '',
            }
        default:
            return state;
    }
}

export default appReducer
import { SET_USER_INFO, SET_USER_STATUS, SET_USER_EMAIL } from './constants';

const initState = {
    userEmail: '',
    userInfo: '',
    userStatus: false
};

function reducer(state, action) {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload
            }
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.payload
            }
        case SET_USER_EMAIL:
            return {
                ...state,
                userEmail: action.payload
            }
        default:
            throw new Error('Invalid action')
    }
}

export { initState };
export default reducer;
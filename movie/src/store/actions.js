import { SET_USER_INFO, SET_USER_STATUS, SET_USER_EMAIL } from './constants';

export const setUserInfo = payload => ({
    type: SET_USER_INFO,
    payload
})

export const setUserStatus = payload => ({
    type: SET_USER_STATUS,
    payload
})

export const setUserEmail = payload => ({
    type: SET_USER_EMAIL,
    payload
})
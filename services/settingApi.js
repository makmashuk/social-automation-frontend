

import apiClient from './api';

let facebookAppCreate = "/facebook-settings";
let facebookAppLogin = "/social-url";
let facebookPages = "/facebook-pages"
let createFbPost = "/posts"

export const token = typeof window !== 'undefined' && JSON.parse(localStorage.getItem("token"));

const config =  {
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type' : 'application/json'
    }
}
const createFbSetting =  async(data) => {
    return await apiClient.post(facebookAppCreate, data, config);
}
const getFbSetting =  async() => {
    return await apiClient.get(facebookAppCreate, config);
}
const getFacebookLoginUrl =  async() => {
    return await apiClient.get(facebookAppLogin, config);
}
const getAllFacebookPages =  async() => {
    return await apiClient.get(facebookPages, config);
}
const createFacebookPost =  async() => {
    return await apiClient.get(createFbPost, config);
}


export {
    createFbSetting,
    getFbSetting,
    getFacebookLoginUrl,
    getAllFacebookPages,
    createFacebookPost
}
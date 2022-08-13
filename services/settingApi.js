

import apiClient from './api';

let facebookAppCreate = "/facebook-settings";
let facebookAppLogin = "/social-url";
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


export {
    createFbSetting,
    getFbSetting,
    getFacebookLoginUrl
}
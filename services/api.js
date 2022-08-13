
import axios from 'axios';


const apiClient = axios.create({
    baseURL: 'https://social.thetanvir.com/api'
});

export default apiClient ;


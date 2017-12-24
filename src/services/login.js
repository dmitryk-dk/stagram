import * as http from '../utils/http'; 

export const login = (url, data) => {
    return http.post(url, data); 
}

import * as http from '../utils/http'; 

export const signup = (url, data) => {
    return http.post(url, data); 
}

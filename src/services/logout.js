import * as http from '../utils/http'; 

export const logout = (url, data) => {
    return http.post(url, data); 
}

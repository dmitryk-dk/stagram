import * as http from '../utils/http'; 

export const comments = (url) => {
    return http.get(url); 
}

import * as http from '../utils/http'; 

export const posts = (url) => {
    return http.get(url); 
}

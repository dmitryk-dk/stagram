import * as http from '../utils/http'; 

export const addComment = (url, data) => {
    return http.post(url, data); 
}

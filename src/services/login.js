import * as http from '../utils/http'; 

export const login = (data) => {
    return http.post('http://localhost:3000/login', data); 
}

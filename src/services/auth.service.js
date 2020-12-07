import axios from 'axios';
import {API_URL} from "../main";

class AuthService {
    login(user) {
        return axios
            .post(API_URL + 'jwt/create/', {
                username: user.username,
                password: user.password
            })
            .then(response => {

                if (response.data.access) {
                    localStorage.setItem('user', JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem('user');
    }

    register(user) {
        return axios.post(API_URL + 'users/', {
           user
        });
    }
}

export default new AuthService();
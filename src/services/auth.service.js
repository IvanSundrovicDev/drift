import axios from "axios";

class AuthService {
  login(user) {
    return axios
      .post("jwt/create/", {
        user
      })
      .then(response => {
        if (response.data.access) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(user) {
    return axios.post("users/", {
      user
    });
  }
}

export default new AuthService();

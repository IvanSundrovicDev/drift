import axios from "axios";

class AuthService {
  async login(user) {
    return await axios
      .post("auth/jwt/create/", {
        email: user.email,
        password: user.password
      })
      .then(async response => {
        if (response.data.access) {
          localStorage.removeItem("jwt");
          localStorage.setItem("jwt", JSON.stringify(response.data));
        }
      });
  }

  logout() {
    localStorage.clear();
  }

  async register(user) {
    delete axios.defaults.headers.common["Authorization"];
    return await axios
      .post("auth/users/", {
        full_name: user.full_name,
        farm_name: user.farm_name,
        email: user.email,
        password: user.password,
        password_confirmation: user.password_confirmation,
        security_question: user.security_question,
        security_answer: user.security_question_answer
      })
      .then(async response => {
        if (await response.data.access) {
          localStorage.clear();
          localStorage.setItem("jwt", JSON.stringify(response.data));
        }
      });
  }
}

export default new AuthService();

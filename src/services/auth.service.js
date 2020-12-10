import axios from "axios";

class AuthService {
  login(user) {
    return axios
      .post("jwt/create/", {
        email: user.email,
        password: user.password
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
      full_name: user.full_name,
      farm_name: user.farm_name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      security_question: user.security_question,
      security_answer: user.security_question_answer
    });
  }
}

export default new AuthService();

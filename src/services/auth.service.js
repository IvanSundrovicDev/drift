import axios from "axios";
import authHeader from "@/helpers/auth-header";

class AuthService {
  login(user) {
    return axios
      .post("auth/jwt/create/", {
        email: user.email,
        password: user.password
      })
      .then(async response => {

        if (response.data.access) {

          let userData = {}

          await axios.get("auth/users/me/", {headers: { Authorization: "JWT " + response.data.access} }).then(res => {
            userData.user = res.data.user
            localStorage.setItem("user", JSON.stringify(userData))
          })

          await axios.get("tutorials/me", { headers: { Authorization: "JWT " + response.data.access}}).then(tres => {
            userData.tutorial = tres.data.user_tutorial
          })

          userData.jwt = response.data

          localStorage.setItem("userData", JSON.stringify(userData))
        }
      });
  }

  logout() {
    localStorage.removeItem("userData");
  }

  register(user) {
    return axios.post("auth/users/", {
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

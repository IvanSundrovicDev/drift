export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("userData"));

  if (user) {
    return { Authorization: "JWT " + user.jwt.access };
  } else {
    return {};
  }
}

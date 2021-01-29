export default function authHeader() {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.jwt.access) {
    return { Authorization: "JWT " + user.jwt.access };
  } else {
    return {};
  }
}

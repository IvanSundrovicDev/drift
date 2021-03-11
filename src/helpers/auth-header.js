export default function authHeader() {
  const cookies = document.cookie;
  const jwtCookie = cookies.includes("jwt")
    ? cookies.split("jwt=")[1].split(";")[0]
    : "";
  const jwt = jwtCookie ? JSON.parse(jwtCookie) : "";

  if (jwt) {
    return { Authorization: "JWT " + jwt.access };
  }

  return {};
}

// const user = JSON.parse(localStorage.getItem("user"));
// let userPrefernece;
// if (!user) userPrefernece = "";
// else {
//   userPrefernece = user;
// }
// export default userPrefernece;
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    // for Node.js Express back-end
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}
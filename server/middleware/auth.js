const jwt = require("jsonwebtoken");

const createToken = (id, email) => {
  try {
    const token = jwt.sign({ id: id, email: email }, "token12341234", {
      expiresIn: "5d",
    });
    return token;
  } catch (error) {
    res.status(400).send({ error });
  }
};
const verifyToken = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  //Authorization: 'Bearer TOKEN'
  if (!token) {
    res.status(403).json("token expired or invalid token");
  }
  //Decoding the token
  const decodedToken = jwt.verify(token, "token12341234");
  return decodedToken;
};
module.exports = { createToken, verifyToken };
// const JWT = require("jsonwebtoken");

// module.exports = async (req, res, next) => {
//   try {
//     const token = req.headers["authorization"].split(" ")[1];
//     JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
//       if (err) {
//         return res.status(200).send({
//           message: "Auth Fialed",
//           success: false,
//         });
//       } else {
//         req.body.userId = decode.id;
//         next();
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       message: "Auth Failed",
//       success: false,
//     });
//   }
// };
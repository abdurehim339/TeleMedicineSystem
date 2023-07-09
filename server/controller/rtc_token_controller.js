const { RtcTokenBuilder, RtcRole } = require("agora-token");

const generateToken = async (req, res) => {
  console.log("generateToken");
  const { channelName, isPublisher } = req.body;
  console.log(channelName);
  const appID = "115c00ba3753465fabd28de0cfc2856e";
 
  const appCertificate = "b14d771aa6354cdcb963a4be2d3b842e";
  console.log(req.body);
  try {
    const uid = Math.floor(Math.random() * 100000);
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    const role = isPublisher ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;
    const token = RtcTokenBuilder.buildTokenWithUid(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );
    console.log(uid, token);
    if (!token) {
      res.status(400).send("can't generate token");
    }
    res.status(200).send({ uid: uid, token: token });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};
module.exports = { generateToken };

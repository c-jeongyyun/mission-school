import * as crypto from "node:crypto";

const generateSalt = () => {
  return crypto.randomBytes(16).toString("base64");
};

const encryptPassword = (password: string) => {
  const salt = generateSalt();
  const hashedPassword = crypto
    .createHmac("sha256", "")
    .update(`${password}${salt}`)
    .digest("base64");

  return { hashedPassword, salt };
};

const password = "babo";

console.log("enc", encryptPassword(password));

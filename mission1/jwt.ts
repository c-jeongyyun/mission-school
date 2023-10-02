const { createHmac } = require("node:crypto");

const base64 = (data: any) => {
  const stringifiedData = JSON.stringify(data);
  const encodedData = Buffer.from(stringifiedData)
    .toString("base64")
    .replace(/=/g, "");
  return encodedData;
};

type User = {
  name: string;
  phoneNumber: string;
};

const sign = (user: User) => {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const encodedHeader = base64(header);
  const encodedPayload = base64(user);

  const secretKey = "99jenny0614";

  const hmac256 = createHmac("sha256", secretKey);
  const signature = hmac256
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

const user = {
  name: "gildong",
  phoneNumber: "010-1234-5678",
};

console.log(sign(user));

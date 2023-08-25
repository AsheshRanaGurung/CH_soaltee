import jwt from "jsonwebtoken";

export const isTokenExpired = (token: any) => {
  const decodedToken = jwt.decode(token, { complete: true });
  const now = Date.now().valueOf() / 1000;
  if (decodedToken && decodedToken.payload.exp < now) {
    return true;
  }
  return false;
};

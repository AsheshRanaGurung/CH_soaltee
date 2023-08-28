import jwt, { JwtPayload } from "jsonwebtoken";

export const isTokenExpired = (token: string) => {
  const decodedToken = jwt.decode(token, { complete: true }) as JwtPayload;
  const now = Date.now().valueOf() / 1000;

  if (
    decodedToken &&
    typeof decodedToken.exp === "number" &&
    decodedToken.exp < now
  ) {
    return true;
  }

  return false;
};

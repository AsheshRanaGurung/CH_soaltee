import jwt, { JwtPayload } from "jsonwebtoken";

export const isTokenExpired = (token: string): boolean => {
  const decodedToken = jwt.decode(token, { complete: true }) as {
    payload: JwtPayload;
  };
  const now = Date.now() / 1000;
  if (
    decodedToken &&
    decodedToken.payload.exp &&
    decodedToken.payload.exp < now
  ) {
    return true;
  }
  return false;
};

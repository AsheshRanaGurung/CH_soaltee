export interface TokenDetails {
  access: string;
}

export interface TokenInfo {
  is_valid: boolean;
  exp: number;
}

function setToken(token: TokenDetails) {
  localStorage.setItem("token", token.access);
}

function getToken() {
  try {
    return {
      access: localStorage.getItem("token") ?? "",
    } as TokenDetails;
  } catch (e) {
    return null;
  }
}

function getTokenDetails(): TokenInfo | null {
  try {
    const token = getToken();
    return token
      ? (JSON.parse(window.atob(token.access.split(".")[1])) as TokenInfo)
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails?.exp * 1000 > Date.now();
  } else {
    return false;
  }
}

function clearToken() {
  localStorage.removeItem("token");
}

export const getRole = () => {
  return getTokenDetails();
};

const TokenService = {
  setToken,
  getToken,
  getTokenDetails,
  isAuthenticated,
  clearToken,
};

export default TokenService;

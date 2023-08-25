import Cookies from "js-cookie";

function setToken(token: any) {
  try {
    localStorage.setItem("auth", JSON.stringify(token));
  } catch (e) {
    console.error("Error storing token", e);
  }
}

function setCookie(name: string, value: any) {
  try {
    Cookies.set(name, value);
  } catch (e) {
    console.log("error setting cookie");
  }
}
function getToken() {
  try {
    return JSON.parse(localStorage.getItem("auth") || "");
  } catch (e) {
    return null;
  }
}

function getTokenDetails() {
  try {
    const token = getToken();
    return token
      ? JSON.parse(window.atob(token.access_token.split(".")[1]))
      : null;
  } catch (e) {
    return null;
  }
}

function isAuthenticated() {
  const tokenDetails = getTokenDetails();
  if (tokenDetails) {
    return tokenDetails.exp * 1000 > Date.now();
  } else {
    return false;
  }
}

function getCookies(name: string) {
  try {
    return Cookies.get(name);
  } catch (e) {
    return null;
  }
}
function clearCookies(name: string) {
  try {
    Cookies.remove(name);
  } catch (e) {
    console.log(e);
  }
}

function clearToken() {
  Cookies.remove("auth");
}

const TokenService = {
  setToken,
  getToken,
  isAuthenticated,
  clearToken,
  setCookie,
  getCookies,
  clearCookies,
};

export default TokenService;

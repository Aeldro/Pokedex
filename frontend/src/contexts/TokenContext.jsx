// Import packages
import { createContext, useState, useMemo } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";

const TokenContext = createContext();

export default TokenContext;

export function TokenContextProvider({ children }) {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const setUserCookie = (token) => {
    if (token) {
      Cookies.set("userToken", token, {
        expires: 1 / 24,
      });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  const TokenContextValue = useMemo(() => {
    return { userToken, setUserCookie };
  });

  return (
    <TokenContext.Provider value={TokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

TokenContextProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

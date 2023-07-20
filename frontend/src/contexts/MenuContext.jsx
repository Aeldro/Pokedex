import { createContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const MenuContext = createContext();

export default MenuContext;

export function MenuContextProvider({ children }) {
  const [isMenuShow, setIsMenuShow] = useState(false);
  const MenuContextValue = useMemo(() => {
    return { isMenuShow, setIsMenuShow };
  });
  return (
    <MenuContext.Provider value={MenuContextValue}>
      {children}
    </MenuContext.Provider>
  );
}

MenuContextProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

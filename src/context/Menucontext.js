import React, { createContext, useState } from "react";

export const Menu = createContext();

const Menucontext = ({ children }) => {
  const [isopen, setisopen] = useState(true);
  return (
    <Menu.Provider value={{ isopen, setisopen }}>{children}</Menu.Provider>
  );
};

export default Menucontext;

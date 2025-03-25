import { createContext } from 'react';

interface GlobalIF {}

const defaultGlobal: GlobalIF = {};

const GlobalContext = createContext<GlobalIF>(defaultGlobal);

const GlobalProvider = ({ children }) => {
  return (
    <>
      <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>
    </>
  );
};

export { GlobalContext };
export default GlobalProvider;

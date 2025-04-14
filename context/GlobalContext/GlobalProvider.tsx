import { createContext, useEffect, useState } from 'react';
import { setStoreGlobal } from '~/store/useStoreGlobal';

interface GlobalIF {}

const defaultGlobal: GlobalIF = {};

const GlobalContext = createContext<GlobalIF>(defaultGlobal);

const GlobalProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isStorePage = window.location.href.includes('download-store');
    setStoreGlobal({
      isStorePage: isStorePage,
    });
    setIsLoaded(true);
  }, []);

  return (
    <>
      <GlobalContext.Provider value={{}}>{isLoaded && children}</GlobalContext.Provider>
    </>
  );
};

export { GlobalContext };
export default GlobalProvider;

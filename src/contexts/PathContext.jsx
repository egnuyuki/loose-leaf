import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PathContext = createContext();

export const PathProvider = ({ children }) => {
  const location = useLocation();
  const [currentPath, setcurrentPath] = useState(location.pathname || '/');

  // パスが変わったらstateを更新
  useEffect(() => {
    setcurrentPath(location.pathname || '/');
  }, [location.pathname]);

  return (
    <PathContext.Provider value={{ currentPath }}>
      {children}
    </PathContext.Provider>
  );
};

export const usePath = () => useContext(PathContext);

export default PathContext;

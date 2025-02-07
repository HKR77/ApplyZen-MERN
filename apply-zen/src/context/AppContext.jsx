import { createContext, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [isDark, setIsDark] = useState(false);
  const [user, setUser] = useState(null);
  const [allJobs, setAllJobs] = useState([]);

  const value = { isDark, setIsDark, user, setUser,allJobs, setAllJobs};
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

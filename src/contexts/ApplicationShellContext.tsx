import React, { useContext, createContext, useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
const ApplicationShellContext = createContext<any>(null);

export const ApplicationShellProvider = ({ children }: any) => {
  const [expandedSidebar, setExpandedSidebar] = useLocalStorage(
    "expandedSidebar",
    true
  );
  //   const [sidebarWidths, setSidebarWidths] = useState({
  //     expanded: 48,
  //     collapsed: 0,
  //   });
  const [sidebarWidths, setSidebarWidths] = useState({
    expanded: 14,
    collapsed: 0,
  });

  return (
    <ApplicationShellContext.Provider
      value={{
        expandedSidebar,
        setExpandedSidebar,
        sidebarWidths,
        setSidebarWidths,
      }}
    >
      {children}
    </ApplicationShellContext.Provider>
  );
};

export const useApplicationShell = () => {
  return useContext(ApplicationShellContext);
};

export default ApplicationShellContext;

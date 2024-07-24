import React, { createContext, useContext, useState } from "react";
import { SideBarTypes } from "./ViewXRay.Types";

// Define the context type, including the function to change the tool
type ViewContextType = {
  siderType: SideBarTypes;
  handleSetSiderType: (selected: SideBarTypes) => void;

  // infoCollapsed: boolean;
  // reportCollapsed: boolean;

  // handleSetInfoCollapsed: (collapse: boolean) => void;
  // handleSetReportCollapsed: (collapse: boolean) => void;
};

// Create context with initial state
const ViewContext = createContext<ViewContextType | undefined>(undefined);

// Custom hook to consume the context
export const useView = () => {
  const context = useContext(ViewContext);
  if (!context) {
    throw new Error("useView must be used within a ViewContextProvider");
  }
  return context;
};

// ViewProvider Props
type ViewProviderProps = {
  children: React.ReactNode;
};

function ViewProvider(props: ViewProviderProps) {
  const { children } = props;

  const [siderType, setSiderType] = useState<SideBarTypes>("info");

  const handleSetSiderType = (selected: SideBarTypes) => {
    setSiderType(selected);
  };

  // // States for the Sider
  // const [infoCollapsed, setInfoCollapsed] = useState(true);
  // const [reportCollapsed, setReportCollapsed] = useState(true);

  // const handleSetInfoCollapsed = (collapse: boolean) => {
  //   setInfoCollapsed(collapse);
  // };

  // const handleSetReportCollapsed = (collapse: boolean) => {
  //   setReportCollapsed(collapse);
  // };

  return (
    <ViewContext.Provider
      value={{
        // infoCollapsed,
        // reportCollapsed,
        // handleSetInfoCollapsed,
        // handleSetReportCollapsed,
        siderType,
        handleSetSiderType,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export default ViewProvider;

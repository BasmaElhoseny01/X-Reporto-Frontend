import React, { createContext, useContext, useState } from "react";

export type Tools = {
  navTool: "select" | "draw" | "move";
};

// Define the context type, including the function to change the tool
interface ToolsContextType extends Tools {
  handleChangeNavTool: (tool: "select" | "draw" | "move") => void;
}

// Create context with initial state
const ToolsContext = createContext<ToolsContextType | undefined>(undefined);

// Custom hook to consume the context
export const useTools = () => {
  const context = useContext(ToolsContext);
  if (!context) {
    throw new Error("useTools must be used within a ToolsProvider");
  }
  return context;
};

// ToolProvider Props
type ToolProviderProps = {
  children: React.ReactNode;
};

function ToolProvider(props: ToolProviderProps) {
  const { children } = props;

  const [tools, setTools] = useState<Tools>({ navTool: "select" });

  const handleChangeNavTool = (tool: "select" | "draw" | "move") => {
    setTools((prevTools) => {
      const newTools = { ...prevTools, navTool: tool };
      return newTools;
    });
  };

  return (
    <ToolsContext.Provider value={{ ...tools, handleChangeNavTool }}>
      {children}
    </ToolsContext.Provider>
  );
}

export default ToolProvider;

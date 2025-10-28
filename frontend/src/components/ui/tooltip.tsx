import { createContext, useContext } from "react";
import type { ReactNode } from "react";

const TooltipContext = createContext(false);

export const TooltipProvider = ({ children }: { children: ReactNode }) => (
  <TooltipContext.Provider value={true}>{children}</TooltipContext.Provider>
);

export const useTooltipProvider = () => useContext(TooltipContext);

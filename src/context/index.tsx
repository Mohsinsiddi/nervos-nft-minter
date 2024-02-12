"use client";
import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  let [address, setAddress] = useState("");

  return (
    <AppContext.Provider
      value={{
        address,
        setAddress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

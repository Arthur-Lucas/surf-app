"use client";

import { createContext, useContext, useState } from "react";

const RefreshContext = createContext({ refresh: 0, triggerRefresh: () => {} });

export function RefreshProvider({ children }: { children: React.ReactNode }) {
  const [refresh, setRefresh] = useState(0);
  const triggerRefresh = () => setRefresh((prev) => prev + 1);

  return (
    <RefreshContext.Provider value={{ refresh, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
}

export const useRefresh = () => useContext(RefreshContext);

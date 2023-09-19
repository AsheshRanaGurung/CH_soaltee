import React, { createContext } from "react";

export const SidebarState = createContext<{
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

export const PageParamsContext = createContext<{
  pageParams: {
    limit: number;
    page: number;
  };
  setPageParams: React.Dispatch<
    React.SetStateAction<{
      limit: number;
      page: number;
    }>
  >;
} | null>(null);

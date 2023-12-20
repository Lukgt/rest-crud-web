"use client";
import { ProductContext } from "@/contexts/ProductContext";

interface AppProps {
  children: React.ReactNode;
}

export function App({ children }: AppProps) {
  return (
    <ProductContext.Provider value={100}>{children}</ProductContext.Provider>
  );
}

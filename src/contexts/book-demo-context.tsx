"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface BookDemoContextType {
  isOpen: boolean;
  openBookDemo: () => void;
  closeBookDemo: () => void;
}

const BookDemoContext = createContext<BookDemoContextType | undefined>(
  undefined
);

export function BookDemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openBookDemo = useCallback(() => {
    router.push("/demo");
  }, [router]);

  const closeBookDemo = useCallback(() => setIsOpen(false), []);

  return (
    <BookDemoContext.Provider value={{ isOpen, openBookDemo, closeBookDemo }}>
      {children}
    </BookDemoContext.Provider>
  );
}

export function useBookDemo() {
  const context = useContext(BookDemoContext);
  if (context === undefined) {
    throw new Error("useBookDemo must be used within a BookDemoProvider");
  }
  return context;
}
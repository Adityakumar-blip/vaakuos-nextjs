"use client";

import { createContext, useContext, useState, useCallback } from "react";

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

  const openBookDemo = useCallback(() => setIsOpen(true), []);
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
"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BookDemoForm } from "./BookDemoForm";
import { useBookDemo } from "@/contexts/book-demo-context";

export function BookDemoDialog() {
  const { isOpen, closeBookDemo } = useBookDemo();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeBookDemo(); }}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden border-none shadow-2xl min-h-[500px]">
        <BookDemoForm onSuccess={closeBookDemo} />
      </DialogContent>
    </Dialog>
  );
}
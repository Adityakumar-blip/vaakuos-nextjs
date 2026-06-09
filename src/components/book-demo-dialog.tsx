"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BookDemoForm } from "./BookDemoForm";
import { useBookDemo } from "@/contexts/book-demo-context";

export function BookDemoDialog() {
  const { isOpen, closeBookDemo } = useBookDemo();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeBookDemo(); }}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[820px] max-h-[90vh] overflow-y-auto p-0 border border-border rounded-2xl shadow-2xl">
        <BookDemoForm onSuccess={closeBookDemo} />
      </DialogContent>
    </Dialog>
  );
}
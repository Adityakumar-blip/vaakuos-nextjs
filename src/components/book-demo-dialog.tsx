"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { BookDemoForm } from "./BookDemoForm";
import { useBookDemo } from "@/contexts/book-demo-context";

export function BookDemoDialog() {
  const { isOpen, closeBookDemo } = useBookDemo();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) closeBookDemo(); }}>
      <DialogContent className="w-[calc(100%-1.5rem)] max-w-[820px] max-h-[90vh] overflow-y-auto rounded-3xl border border-line bg-white p-0 font-display text-ink shadow-[0_1px_0_rgb(var(--ink)/0.06),0_28px_56px_-28px_rgb(var(--ink)/0.3)]">
        <BookDemoForm onSuccess={closeBookDemo} />
      </DialogContent>
    </Dialog>
  );
}
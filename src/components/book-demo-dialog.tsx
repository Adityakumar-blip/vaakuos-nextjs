"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface BookDemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BookDemoDialog({ isOpen, onClose }: BookDemoDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book a Demo</DialogTitle>
          <DialogDescription>
            See how VaakuOS can help you recover abandoned carts and boost conversions.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" placeholder="Doe" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Work email</Label>
            <Input id="email" type="email" placeholder="john@company.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Company name</Label>
            <Input id="company" placeholder="Your company" />
          </div>
          <Button type="submit" className="w-full">
            Book Demo
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button onClick={() => toast.info("Hello")}>Click me</Button>
    </div>
  );
}

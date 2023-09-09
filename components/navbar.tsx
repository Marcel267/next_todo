import * as React from "react";
import { ModeToggle } from "./mode-toggle";

export function Navbar() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-14 items-center">
        <ModeToggle />
      </div>
    </header>
  );
}

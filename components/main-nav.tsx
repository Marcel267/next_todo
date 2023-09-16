"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ListChecks } from "lucide-react";

export function MainNav() {
  const [pathname, setPathname] = React.useState(usePathname());
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <ListChecks className="h-6 w-6" />
        <span className="inline-block font-bold">Next-Todo</span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href={"/"}
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            pathname === "/" && "text-foreground"
          )}
          onClick={() => setPathname("/")}
        >
          Home
        </Link>
        <Link
          href={"/test"}
          className={cn(
            "flex items-center text-sm font-medium text-muted-foreground",
            pathname === "/test" && "text-foreground"
          )}
          onClick={() => setPathname("/test")}
        >
          Test
        </Link>
      </nav>
    </div>
  );
}

"use client";

import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-navy/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between px-4 h-14">
        <Link href="/recipes" className="flex items-center gap-2">
          <span className="text-teal font-bold text-lg tracking-tight">
            {APP_NAME}
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-foreground-muted hover:text-foreground transition-colors"
            aria-label="Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </header>
  );
}

"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center gap-1 text-sm text-neutral-600 mb-10"
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#001F3F] transition-colors underline-offset-2 hover:underline"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#001F3F] font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight
              className="w-4 h-4 text-neutral-400"
              aria-hidden="true"
            />
          )}
        </div>
      ))}
    </nav>
  );
}

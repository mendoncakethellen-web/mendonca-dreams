"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      className="flex items-center gap-1 text-sm text-white/70 mb-10 animate__animated animate__fadeInDown"
      aria-label="breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1">
          {item.href ? (
            <Link
              href={item.href}
              className="hover:text-[#D4AF37] transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-[#D4AF37] font-medium">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <ChevronRight className="w-4 h-4 text-white/50" />
          )}
        </div>
      ))}
    </nav>
  );
}

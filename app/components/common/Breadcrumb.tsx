"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const formatLabel = (segment: string) => {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export default function Breadcrumb() {
  const pathname = usePathname();

  const pathWithoutBase = pathname.replace("/salesforce-academy", "");
  const segments = pathWithoutBase.split("/").filter(Boolean);

  return (
    <div className="text-sm text-muted-foreground mb-4">
      <nav className="flex items-center gap-2 flex-wrap">
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");

          const isLast = index === segments.length - 1;

          return (
            <span key={href} className="flex items-center gap-2">
              {!isLast ? (
                <Link
                  href={href}
                  className="hover:text-primary transition"
                >
                  {formatLabel(segment)}
                </Link>
              ) : (
                <span className="text-foreground font-medium">
                  {formatLabel(segment)}
                </span>
              )}

              {!isLast && <span>/</span>}
            </span>
          );
        })}
      </nav>
    </div>
  );
}
import type { PropsWithChildren } from "react";

export default function FullBleed({ children, className = "" }: PropsWithChildren<{className?: string}>) {
  return (
    <div className={`bleed-x ${className}`}>
      {children}
    </div>
  );
}

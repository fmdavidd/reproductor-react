// src/components/ui/avatar.tsx
import React from "react";

export function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-300 rounded-full">
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full h-full rounded-full" />;
}

// Elimina AvatarFallback si no lo necesitas
// export function AvatarFallback({ children }: { children: React.ReactNode }) {
//   return <span className="text-white">{children}</span>;
// }

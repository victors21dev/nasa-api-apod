"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative aspect-video w-full">
      {!error && !loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      {error ? (
        <div className="absolute inset-0 flex items-center justify-center rounded-none bg-neutral-900">
          <span className="text-sm text-zinc-500">Imagem indisponível</span>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          priority
          className={cn(
            "object-contain dark:bg-black transition-opacity duration-500",
            loaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
}

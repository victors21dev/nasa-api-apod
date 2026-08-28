"use client";

import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export type HoverCardItem = {
  index?: number;
  title: string;
  description: string;
  link: string;
  image?: string;
  date?: string;
  author?: string;
  mediaType?: "image" | "video";
};

function formatDate(date: string): string {
  const [y, m, d] = date.split("-");
  if (!y || !m || !d) return date;
  return `${d}/${m}/${y}`;
}

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center">
        <span className="text-zinc-500 text-sm">Sem imagem disponível</span>
      </div>
    );
  }

  return (
    <div className="relative h-44 w-full overflow-hidden rounded-xl bg-neutral-800">
      {!loaded && <Skeleton className="absolute inset-0 rounded-none" />}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
        className={cn(
          "object-cover transition-all duration-500 group-hover:scale-105",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </div>
  );
}

export const HoverEffect = ({
  items,
  className,
}: {
  items: HoverCardItem[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="relative">
              {item.image ? (
                <CardImage src={item.image} alt={item.title} />
              ) : (
                <div className="relative h-44 w-full overflow-hidden rounded-xl bg-neutral-900 flex items-center justify-center">
                  <span className="text-zinc-500 text-sm">Sem imagem disponível</span>
                </div>
              )}
              {typeof item.index === "number" && (
                <span className="absolute top-3 left-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-sm font-semibold text-white backdrop-blur">
                  {item.index}
                </span>
              )}
              {item.mediaType && (
                <span
                  className={cn(
                    "absolute top-3 right-3 z-10 rounded-full px-2.5 py-1 text-xs font-medium text-white backdrop-blur",
                    item.mediaType === "video"
                      ? "bg-red-600/80"
                      : "bg-black/70"
                  )}
                >
                  {item.mediaType === "video" ? "Vídeo" : "Foto"}
                </span>
              )}
            </div>
            <CardTitle>{item.title}</CardTitle>
            {(item.date || item.author) && (
              <p className="mt-1 text-xs text-zinc-400">
                {item.date && <span>{formatDate(item.date)}</span>}
                {item.date && item.author && <span aria-hidden> • </span>}
                {item.author && <span>Por {item.author}</span>}
              </p>
            )}
            <CardDescription>{item.description}</CardDescription>
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-zinc-100 font-bold tracking-wide mt-4 line-clamp-2",
        className
      )}
    >
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm line-clamp-3",
        className
      )}
    >
      {children}
    </p>
  );
};

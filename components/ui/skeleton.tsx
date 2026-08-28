import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative overflow-hidden bg-neutral-800",
        className
      )}
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0) 100%)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "1000px 100%",
        animation: "shimmer 1.6s linear infinite",
      }}
    />
  );
}

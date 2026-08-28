// app/details/[date]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { getApodSingle } from "@/lib/nasaApi";
import DetailsImage from "@/components/details-image";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

export function generateStaticParams() {
  const params: { date: string }[] = [];
  const today = new Date();
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    params.push({
      date: `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`,
    });
  }
  return params;
}

export default async function DetailsPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;

  let apod;
  try {
    apod = await getApodSingle(date, true);
  } catch {
    notFound();
  }

  const displayDate = new Date(apod.date + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

  const videoId = apod.media_type === "video" ? extractYouTubeId(apod.url) : null;
  const imageSrc = apod.hdurl || apod.url;   

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
        <span aria-hidden>←</span> Voltar para a galeria
      </Link>

      <article className="mt-8">
        <header>
          <h1 className="text-4xl font-bold tracking-tight">{apod.title}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-zinc-400">
            <span>{displayDate}</span>
            <span aria-hidden>•</span>
            <span className="uppercase">{apod.media_type}</span>
            {apod.copyright && (
              <>
                <span aria-hidden>•</span>
                <span>Foto: {apod.copyright}</span>
              </>
            )}
          </div>
        </header>

        <div className="mt-8">
          {apod.media_type === "image" && imageSrc ? (
            <figure className="relative w-full overflow-hidden rounded-2xl border border-white/10">
              <DetailsImage src={imageSrc} alt={apod.title} />
              {apod.hdurl && (
                <figcaption className="absolute bottom-3 right-3">
                  <a
                    href={apod.hdurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-black/70 px-3 py-1.5 text-xs font-medium text-white backdrop-blur hover:bg-black/90 transition-colors"
                  >
                    Ver em alta resolução
                  </a>
                </figcaption>
              )}
            </figure>
          ) : videoId ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                title={apod.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            </div>
          ) : (
            <div className="flex aspect-video w-full items-center justify-center rounded-2xl border border-white/10 bg-transparent">
              <a
                href={apod.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-zinc-300 underline underline-offset-4"
              >
                Abrir mídia na NASA
              </a>
            </div>
          )}
        </div>

        <section className="mt-8 max-w-prose">
          <h2 className="text-lg font-semibold">Explicação</h2>
          <p className="mt-3 leading-relaxed text-zinc-300">{apod.explanation}</p>
        </section>

        <dl className="mt-10 grid grid-cols-1 gap-4 rounded-2xl border border-white/10 p-6 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Data</dt>
            <dd className="mt-1 text-sm text-zinc-200">{apod.date}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Tipo de mídia</dt>
            <dd className="mt-1 text-sm text-zinc-200">{apod.media_type}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Versão do serviço</dt>
            <dd className="mt-1 text-sm text-zinc-200">{apod.service_version}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">Créditos</dt>
            <dd className="mt-1 text-sm text-zinc-200">{apod.copyright ?? "Domínio público"}</dd>
          </div>
        </dl>

        <a
          href={apod.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block text-sm font-medium text-zinc-300 underline underline-offset-4 hover:text-zinc-100 transition-colors"
        >
          Fonte oficial (api.nasa.gov)
        </a>
      </article>
    </main>
  );
}

function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtu\.be\/)([\w-]{11})/,
    /youtube\.com\/watch\?.*v=([\w-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

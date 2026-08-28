// app/page.tsx
import { getApodRange } from "@/lib/nasaApi";
import { HoverEffect, HoverCardItem } from "@/components/ui/card-hover-effect";
import MonthPicker from "@/components/month-picker";

const MIN_YEAR = 2020;

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function cardImage(apod: { media_type: string; url: string; thumbnail_url?: string }): string | undefined {
  if (apod.media_type === "image") {
    return apod.url || undefined;
  }
  return apod.thumbnail_url || undefined;
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; month?: string }>;
}) {
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;

  const params = await searchParams;
  let year = Number(params.year);
  let month = Number(params.month);

  if (
    Number.isNaN(year) ||
    Number.isNaN(month) ||
    year < MIN_YEAR ||
    year > nowYear
  ) {
    year = nowYear;
    month = nowMonth;
  }

  if (year === nowYear) {
    month = Math.min(month, nowMonth);
  }
  if (month < 1 || month > 12) {
    month = nowMonth;
  }

  let end = new Date(year, month, 0);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (end > today) {
    end = today;
  }

  const startDate = `${year}-${pad(month)}-01`;
  const endDate = `${end.getFullYear()}-${pad(end.getMonth() + 1)}-${pad(end.getDate())}`;

  const apods = await getApodRange(startDate, endDate, true);

  const items: HoverCardItem[] = apods
    .reverse()
    .map((apod, i) => ({
      index: i + 1,
      title: apod.title,
      description: apod.explanation,
      link: `/details/${apod.date}`,
      image: cardImage(apod),
      date: apod.date,
      author: apod.copyright,
    }));

  const monthLabel = `${pad(month)}/${year}`;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Imagem Astronômica do Dia</h1>
        <p className="mt-2 text-zinc-400">
          Galeria de APOD da NASA referente a <span className="text-zinc-200">{monthLabel}</span>.
          Clique em um card para ver os detalhes.
        </p>
        <div className="mt-5">
          <MonthPicker year={year} month={month} />
        </div>
      </header>
      <HoverEffect items={items} />
    </main>
  );
}

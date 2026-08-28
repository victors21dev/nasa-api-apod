"use client";

import { useRouter } from "next/navigation";

const MIN_YEAR = 2020;
const MONTH_NAMES = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

function range(start: number, end: number): number[] {
  const arr: number[] = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return arr;
}

export default function MonthPicker({
  year,
  month,
}: {
  year: number;
  month: number;
}) {
  const router = useRouter();

  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;

  const years = range(MIN_YEAR, nowYear);

  const months =
    year < nowYear ? range(1, 12) : range(1, nowMonth);

  const handleChange = (nextYear: number, nextMonth: number) => {
    const params = new URLSearchParams();
    params.set("year", String(nextYear));
    params.set("month", String(nextMonth));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <label className="flex items-center gap-2 text-sm text-zinc-300">
        Ano
        <select
          value={year}
          onChange={(e) => handleChange(Number(e.target.value), month)}
          className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-white/30"
        >
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </label>

      <label className="flex items-center gap-2 text-sm text-zinc-300">
        Mês
        <select
          value={month}
          onChange={(e) => handleChange(year, Number(e.target.value))}
          className="rounded-lg border border-white/10 bg-neutral-900 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-white/30"
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {MONTH_NAMES[m - 1]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

// lib/nasaApi.ts
import { z } from "zod";
import { cacheLife, cacheTag } from "next/cache";
import { ApodSchema, ApodData } from '../types/nasa';

const BASE_URL = 'https://api.nasa.gov/planetary/apod';
const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';

export async function getApodSingle(date?: string, thumbs: boolean = false): Promise<ApodData> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 604800 });
  cacheTag("apod");

  const url = new URL(BASE_URL);
  url.searchParams.append('api_key', API_KEY);

  if (date) url.searchParams.append('date', date);
  if (thumbs) url.searchParams.append('thumbs', 'true');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Erro ao buscar APOD única: ${res.status}`);

  const data = await res.json();
  return ApodSchema.parse(data);
}

export async function getApodRange(startDate: string, endDate?: string, thumbs: boolean = false): Promise<ApodData[]> {
  "use cache";
  cacheLife({ stale: 300, revalidate: 3600, expire: 604800 });
  cacheTag("apod");

  const url = new URL(BASE_URL);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('start_date', startDate);

  if (endDate) url.searchParams.append('end_date', endDate);
  if (thumbs) url.searchParams.append('thumbs', 'true');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Erro ao buscar APOD por período: ${res.status}`);

  const data = await res.json();
  return z.array(ApodSchema).parse(data);
}

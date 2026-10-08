import { notFound } from 'next/navigation';
import CountryPage from '@/components/CountryPage';
import { getCountryBySlug, getAllCountrySlugs } from '@/lib/countryData';

type Props = {
  params: Promise<{ country: string }>;
};

export async function generateStaticParams() {
  return getAllCountrySlugs().map((slug) => ({ country: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { country } = await params;
  const data = getCountryBySlug(country);
  if (!data) return { title: 'Country not found — What The Grad' };
  return {
    title: `Study in ${data.full} — What The Grad`,
    description: `Everything you need to know about studying in ${data.full}. Intakes, costs, visas, scholarships and honest advice from What The Grad.`,
  };
}

export default async function StudyAbroadCountryPage({ params }: Props) {
  const { country } = await params;
  const data = getCountryBySlug(country);
  if (!data) notFound();
  return <CountryPage slug={country} />;
}

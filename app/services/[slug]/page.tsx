import DiscoveryCallPage from '@/components/DiscoveryCallPage';
import CorePackagePage from '@/components/CorePackagePage';
import StreamSensePage from '@/components/StreamSensePage';
import { notFound } from 'next/navigation';

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  switch (slug) {
    case 'discovery-call':
      return <DiscoveryCallPage />;
    case 'core-package':
      return <CorePackagePage />;
    case 'streamsense':
      return <StreamSensePage />;
    default:
      return notFound();
  }
}

export function generateStaticParams() {
  return [
    { slug: 'discovery-call' },
    { slug: 'core-package' },
    { slug: 'streamsense' },
  ];
}

import { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import { PropsWithChildren, Suspense } from 'react';
import { getURL } from '@/utils/helpers';
import './main.css';
import '@fontsource/syncopate';
import '@fontsource/silkscreen'; 
import '@fontsource-variable/big-shoulders-display';
import '@fontsource-variable/big-shoulders-text';
import '@fontsource/unica-one'; 

const meta = {
  title: 'sciLive',
  description: 'powered by SciFiction.com',
  cardImage: '/og.png',
  robots: 'follow, index',
  favicon: '/favicon.ico',
  url: getURL()
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: meta.title,
    description: meta.description,
    referrer: 'origin-when-cross-origin',
    keywords: ['SciFiction.com', 'sciLive', 'AI', 'science fiction', 'content creation', 'avatar creation', 'image model training', 'live streaming'],
    authors: [{ name: 'Justin Bonner', url: 'https://scilive.cloud' }],
    creator: 'Big Eye Data',
    publisher: 'SciFiction.com',
    robots: meta.robots,
    icons: { icon: meta.favicon },
    metadataBase: new URL(meta.url),
    openGraph: {
      url: meta.url,
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage],
      type: 'website',
      siteName: meta.title
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Vercel',
      creator: '@Vercel',
      title: meta.title,
      description: meta.description,
      images: [meta.cardImage]
    }
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body overflow-x="hidden">
        <ClientLayout>
        {children}
        </ClientLayout>
      </body>
    </html>
  );
}

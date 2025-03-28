import { GeistSans } from 'geist/font/sans';
import './globals.css';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

const description =
  'Obtenga más información sobre el desarrollador y diseñador web que está detrás de este portafolio. Descubra sus habilidades, su experiencia y su enfoque creativo en el desarrollo web.';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Portfolio Gabriel Calcagni',
  description: description,
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: defaultUrl,
    site_name: 'Gabriel Calcagni',
    title: 'Portfolio Gabriel Calcagni',
    description: description,
    images: [
      {
        url: `https://raw.githubusercontent.com/solidsnk86/calcagni-gabriel/refs/heads/master/public/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Gabriel Calcagni',
      },
    ],
  },
  twitter: {
    handle: '@CalcagniGabriel',
    site: '@CalcagniGabriel',
    cardType: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={GeistSans.className}>
      <meta name="theme-color" content="#A78BFA" />
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
      </body>
    </html>
  );
}

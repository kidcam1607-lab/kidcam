import './globals.css';

export const metadata = {
  title: 'KidCam - Professional Photo Albums',
  description: 'Secure photo album management for photographers and studios',
  keywords: 'photography, albums, client photos, gallery',
  authors: [{ name: 'KidCam Team' }],
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_APP_URL} />
      </head>
      <body className="bg-gray-50">{children}</body>
    </html>
  );
}

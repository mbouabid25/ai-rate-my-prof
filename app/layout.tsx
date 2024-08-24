import { Analytics } from '@vercel/analytics/react';
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>AI Rate My Professor</title>
        {/* Add other meta tags, link tags, etc., here if needed */}
      </head>
      <body>
        {children}
        <Analytics /> {/* This adds the Analytics component */}
      </body>
    </html>
  );
}

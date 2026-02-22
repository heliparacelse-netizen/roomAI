import './globals.css';

export const metadata = {
  title: 'DesignAI | AI Interior Design Platform',
  description: 'Premium AI-powered interior design platform for immersive room previews.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

import Providers from "../components/Providers/Providers";
import "../globals.css";

export const metadata = {
  title: "Authentication",
  description: "Overflowtrick authentication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

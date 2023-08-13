import { ReduxProviders } from "@/redux/provider";
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
        <ReduxProviders>
          <Providers>{children}</Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}

import { ReduxProviders } from "@/redux/provider";
import Providers from "../components/Providers/Providers";
import "../globals.css";

export const metadata = {
  title: "Dashboard",
  description: "Overflowtrick dashboard",
};

export default function DashboardLayout({
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

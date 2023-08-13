import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Bottombar from "../components/shared/Bottombar";
import LeftSidebar from "../components/shared/LeftSidebar";
import RightSidebar from "../components/shared/RightSidebar";
import Topbar from "../components/shared/Topbar";
import Providers from "../components/Providers/Providers";
import { ReduxProviders } from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Overflowtrick",
  description: "A Next.js 13 Meta overflowtrick application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProviders>
          <Providers>
            <Topbar />
            <main className="flex flex-row">
              <LeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
              {/* @ts-ignore */}
              <RightSidebar />
            </main>
            <Bottombar />
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}

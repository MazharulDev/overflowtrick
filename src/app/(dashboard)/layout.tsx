"use client";
import { ReduxProviders } from "@/redux/provider";
import Providers from "../components/Providers/Providers";
import "../globals.css";
import DashboardTopbar from "../components/dashboard/UI/DashboardTopbar";
import { Toaster } from "react-hot-toast";
import DashboardLeftSidebar from "../components/dashboard/UI/DashboardLeftSidebar";

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
          <Providers>
            <DashboardTopbar />
            <main className="flex flex-row">
              <DashboardLeftSidebar />
              <section className="main-container">
                <div className="w-full max-w-4xl">{children}</div>
                <Toaster position="bottom-right" />
              </section>
              {/* @ts-ignore */}
              {/* <RightSidebar /> */}
            </main>
          </Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}

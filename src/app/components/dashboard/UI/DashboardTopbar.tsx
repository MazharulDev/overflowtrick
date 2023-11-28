"use client";
import Link from "next/link";

const DashboardTopbar = () => {
  return (
    <nav className="topbar">
      <div className="flex items-center  gap-4">
        <Link href="/" className="bg-white px-2 text-red-500 rounded-lg">
          <button>Exit</button>
        </Link>
        <Link href="/dashboard">
          <h2 className="text-white text-heading2-bold font-bold">Dashboard</h2>
        </Link>
      </div>
      <div className="flex items-center gap-1"></div>
    </nav>
  );
};

export default DashboardTopbar;

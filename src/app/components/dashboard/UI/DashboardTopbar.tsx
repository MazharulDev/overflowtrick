import Image from "next/image";
import Link from "next/link";

const DashboardTopbar = () => {
  return (
    <nav className="topbar">
      <Link href="/dashboard" className="flex items-center gap-4">
        <h2 className="text-white text-heading2-bold font-bold">Dashboard</h2>
      </Link>
      <div className="flex items-center gap-1"></div>
    </nav>
  );
};

export default DashboardTopbar;

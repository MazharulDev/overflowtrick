import { dashboardSidebarLinks } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardLeftSidebar = () => {
  const pathname = usePathname();
  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {dashboardSidebarLinks.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;

          // if (link.route === "/profile") link.route = `${link.route}/${userId}`;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link hover:bg-slate-800 hover:rounded-2xl duration-150 ${
                isActive && "font-bold text-body-medium scale-100"
              }`}
            >
              <Image
                src={link.imgURL}
                alt={link.label}
                width={24}
                height={24}
              />

              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default DashboardLeftSidebar;

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Home from "../public/icons/home";
import Search from "../public/icons/search";
import ComingSoon from "../public/icons/comingSoon";
import Download from "../public/icons/download";
import Menu from "../public/icons/menu";

export default function Navbar() {
  const pathname = usePathname();

  // Tailwind classes based on active page
  const getLinkClass = (path: string) =>
    pathname === path
      ? "flex flex-col items-center text-white text-[8px]"
      : "flex flex-col items-center text-[#8C8787] text-[8px]";

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex w-93 px-6 pt-2 h-[48px] bg-black justify-between">
      <Link href="/home" className={getLinkClass("/home")}>
        <Home className="w-[24px] h-[24px]" />
        <span>Home</span>
      </Link>

      <Link href="/search" className={getLinkClass("/search")}>
        <Search className="w-[24px] h-[24px]" />
        <span>Search</span>
      </Link>

      <Link href="/comingSoon" className={getLinkClass("/comingSoon")}>
        <ComingSoon className="w-[24px] h-[24px]" />
        <span>Coming Soon</span>
      </Link>

      <Link href="/downloads" className={getLinkClass("/downloads")}>
        <Download className="w-[24px] h-[24px]" />
        <span>Downloads</span>
      </Link>

      <Link href="/more" className={getLinkClass("/more")}>
        <Menu className="w-[24px] h-[24px]" />
        <span>More</span>
      </Link>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import HomeIcon from "../public/icons/iconsGen/Home";
import Search from "../public/icons/iconsGen/Search";
import ComingSoon from "../public/icons/iconsGen/ComingSoon";
import Download from "../public/icons/iconsGen/Downloads";
import Menu from "../public/icons/iconsGen/Menu";


export default function Navbar() {
    const pathname = usePathname();

    const getLinkClass = (path: string) =>
        `flex flex-col items-center text-[8px] ${
            pathname === path ? "text-white" : "text-[#8C8787]"
        }`;

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex w-93 px-6 pt-2 h-[48px] bg-black justify-between">
            <Link href="/home" className={getLinkClass("/home")}>
                <HomeIcon className="w-[24px] h-[24px]" />
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
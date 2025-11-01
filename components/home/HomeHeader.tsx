"use client";

import logo from "@/public/icons/logo.svg";
import Image from "next/image";

export default function HomeHeader() {
  return (
    <header className="fixed pt-6 top-0 w-93 left-1/2 -translate-x-1/2 z-50 bg-gradient-to-b from-black/80 via-black/50 to-transparent flex items-center">
      <div className="text-red-600 font-extrabold text-2xl select-none">
        <Image src={logo} className="w-[57px] h-[57px]" alt={logo} />
      </div>
      {/* 탭들 */}
      <nav className="flex text-white text-lg font-medium">
        <button className="ml-[25px]">TV Shows</button>
        <button className="ml-[25px]">Movies</button>
        <button className="ml-[25px]">My List</button>
      </nav>
    </header>
  );
}

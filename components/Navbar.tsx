"use client";

import Image from "next/image";
import Link from "next/link";
import home from "../public/icons/home.svg";
import search from "../public/icons/search.svg";
import comingSoon from "../public/icons/comingSoon.svg";
import download from "../public/icons/download.svg";
import menu from "../public/icons/menu.svg";


export default function Navbar() {

    return (

        <div className="flex w-[375px] px-[26px] h-[48px] bg-none justify-between">
            <button className="flex flex-col items-center text-white text-[8px] cursor-pointer">
                <Image src={home} className="w-[24px] h-[24px]" alt="home" />
                <span>Home</span>
            </button>

            <Link href="/home" className="flex flex-col items-center text-gray-400 text-[8px] cursor-pointer">
                <Image src={search} className="w-[24px] h-[24px]" alt="search" />
                <span>Search</span>
            </Link>

            <button className="flex flex-col items-center text-gray-400 text-[8px] cursor-pointer ">
                <Image src={comingSoon} className="w-[24px] h-[24px]" alt="coming soon" />
                <span>Coming Soon</span>
            </button>

            <button className="flex flex-col items-center text-gray-400 text-[8px] cursor-pointer">
                <Image src={download} className="w-[24px] h-[24px]" alt="downloads" />
                <span>Downloads</span>
            </button>

            <div className="flex flex-col items-center text-gray-400 text-[8px] cursor-pointer">
                <Image src={menu} className="w-[24px] h-[24px]" alt="more" />
                <span>More</span>
            </div>
        </div>
    );
}

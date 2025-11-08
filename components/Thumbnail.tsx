"use client";

import Link from "next/link";
import Image from "next/image";
import type { TMDBMovie, TMDBTvShow } from "@/lib/api/types/tdmbs";

type Thumb = TMDBMovie | TMDBTvShow;

const IMG_BASE = "https://image.tmdb.org/t/p";

export default function Thumbnail({item, className, imgSize = "w500", }: {
    item: Thumb;
    className?: string;
    imgSize?: "w200" | "w300" | "w342" | "w500" | "w780" | "original"; }) {
    const path = item.poster_path || item.backdrop_path || "";
    const src = path ? `${IMG_BASE}/${imgSize}${path}` : "/placeholder-portrait.png";

    return (
        <Link href={{ pathname: `/title/${item.id}`, query: { img: path } }} className={className} prefetch={false}>
            <Image src={src} alt="" fill sizes="(max-width: 768px) 30vw, 103px"
                className="object-cover rounded-xs transition-transform duration-200 group-hover:scale-105" />
            <span className="sr-only">thumbnail</span>
        </Link>
    );
}

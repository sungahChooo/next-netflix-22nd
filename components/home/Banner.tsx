"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import type { tmdbListResponse, tmdbTitle } from "@/types/tmdb";
import Image from "next/image";
import add from "@/public/icons/add.svg";
import play from "@/public/icons/play.svg";
import info from "@/public/icons/info.svg";

const imgBase = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE || "https://image.tmdb.org/t/p";
const rotateTime = 20_000; // 20초 간격 (임의)
const regionName = "Korea";

// URL 만드는 함수
function buildImageUrl(
    path?: string | null,
    size: "w780" | "w1280" | "original" = "w1280"
) {
    if (!path) return "";
    try {
        const cleanPath = path.startsWith("/") ? path.slice(1) : path;
        return `${imgBase}/${size}/${cleanPath}`;
    } catch {
        return "";
    }
}

export default function Banner() {
    const [items, setItems] = useState<tmdbTitle[]>([]);
    const [index, setIndex] = useState(0);
    const timerRef = useRef<number | null>(null);

    // 한국 인기 Top10 첫 마운트 로드
    useEffect(() => {
        (async () => {
            try {
                const data = await fetcher<tmdbListResponse<tmdbTitle>>(
                    "/3/movie/popular",
                    { language: "ko-KR", region: "KR", page: "1" }
                );
                setItems((data.results ?? []).slice(0, 10));
                setIndex(0);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    // 20초마다 변경
    useEffect(() => {
        if (!items.length) return;
        const start = () => {
            stop();
            timerRef.current = window.setInterval(() => {
                setIndex((i) => (i + 1) % items.length); //index증가
            }, rotateTime);
        };
        const stop = () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };

        start();
        return () => {
            stop();
        };
    }, [items.length]);

    const current = items[index] ?? null;
    const title = current?.title ?? current?.name ?? "";
    const backdrop = useMemo(
        () => buildImageUrl(current?.backdrop_path ?? current?.poster_path, "w1280"),
        [current?.backdrop_path, current?.poster_path]
    );
    const rank = Math.min(index + 1, 10);

    return (
        <section className="rounded-xl overflow-hidden bg-black text-white">
            <div className="relative h-[320px]">
                {backdrop && (
                    <Image
                        key={backdrop}
                        src={backdrop}
                        alt={title || "Movie banner image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 375px"
                        priority={index === 0}
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
                    />
                )}
                {/* 이미지 그레이디언트 */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
            </div>

            <div className="px-4 py-4">
                <div className="mb-3">
          <span className="flex justify-center items-center gap-2 text-sm font-semibold">
            <span className="flex flex-col justify-center items-center w-[15px] h-[15px] border border-white rounded-sm leading-none">
              <span className="text-[4.3px]">TOP</span>
              <span className="text-[6.8px]">10</span>
            </span>
            <span className="opacity-90">
              #{rank} in {regionName} Today
            </span>
          </span>
                </div>
                <div className="mx-auto flex w-[259px] h-[45px] justify-between">
                    {/* My List */}
                    <button className="flex flex-col w-[41px] h-[45px] items-center justify-center">
                        <Image src={add} alt="add icon" />
                        <span className="text-xs">My List</span>
                    </button>

                    {/* Play */}
                    <button className="flex items-center w-[110px] h-[45px] justify-center bg-white text-black rounded-md py-2 font-semibold">
                        <Image src={play} alt="play icon" />
                        <span className="ml-[13px]">Play</span>
                    </button>

                    {/* Info */}
                    <button className="flex flex-col w-[41px] h-[45px] items-center justify-center text-[13px]">
                        <Image src={info} alt="info icon" />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

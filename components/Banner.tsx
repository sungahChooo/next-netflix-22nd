// components/Banner.tsx
"use client";

import { useEffect, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import type { tmdbListResponse, tmdbTitle } from "@/types/tmdb";
import Image from "next/image";
import add from '../public/icons/add.svg'
import play from '../public/icons/play.svg'
import info from '../public/icons/info.svg'


const imgBase = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE;

//URL만드는 함수
function buildImageUrl(path?: string | null, size: "w780" | "w1280" | "original" = "w1280") {
    if (!path) return "";
    return `${imgBase}/${size}${path}`;
}

export default function Banner() {
    const [item, setItem] = useState<tmdbTitle | null>(null);
    const rank = 1;  //현재 1등으로 고정
    const regionName = "Korea"; //현재 한국으로 고정

    //인기 영화 API 콜
    useEffect(() => {
        (async () => {
            try {
                //현재 한국 1등 영화로 고정
                const data = await fetcher<tmdbListResponse<tmdbTitle>>("/movie/popular", {
                    language: "ko-KR",
                    region: "kr",
                    page: "1",
                });
                const candidate = data.results?.[1] ?? data.results?.[0] ?? null;
                setItem(candidate);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    const title = item?.title
    //backdrop 이미지
    const backdrop = buildImageUrl(item?.backdrop_path ?? item?.poster_path, "w1280");

    return (
        <section className="relative w-[390px] h-[560px] overflow-hidden rounded-xl bg-black">
            {backdrop && (
                <img
                    src={backdrop}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            )}
            {/*이미지 그레이디언트*/}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
                <div className="absolute inset-x-0 bottom-0 text-white z-10">
                <div className="mb-3">
                <span className="flex justify-center items-center gap-2 text-sm font-semibold">
                <div className="flex flex-col justify-center items-center w-[15px] h-[15px] border border-white rounded-sm">
                <div className="text-[4.3px]">TOP</div>
                <div className="text-[6.8px] leading-none">10</div>
                </div>
                    {/*현재는 한국1등으로 고정된 값*/}
                <span className="opacity-90">#{rank} in {regionName} Today</span>
                </span>
                </div>
                <div className="mx-auto justify-between flex w-[259px] h-[45px]">
                    {/*MyList 버튼*/}
                    <button className="flex flex-col w-[41px] h-[45px] items-center justify-center text-white">
                        <Image src={add} alt="add icon" />
                        <span className="text-xs">My List</span>
                    </button>

                    {/*play 버튼*/}
                    <button className="flex items-center w-[110px] h-[45px] justify-center bg-white text-black rounded-md py-2 font-semibold">
                        <Image src={play} alt="play icon" />
                        <span className={"ml-[13px]"}>Play</span>
                    </button>

                    {/*Info 버튼*/}
                    <button className="flex flex-col w-[41px] h-[45px] items-center justify-center text-[13px] text-white">
                        <Image src={info} alt="info icon" />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

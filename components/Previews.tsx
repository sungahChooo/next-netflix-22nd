"use client";

import { useEffect, useState } from "react";
import { getPreviewPosters } from "@/lib/tmdb"; // 네 파일 경로에 맞게 수정

export default function Previews() {
    //포스터용 URL 배열
    const [items, setItems] = useState<{ poster: string }[]>([]);

    useEffect(() => {
        getPreviewPosters().then(setItems).catch(console.error);
    }, []);

    return (
        <div className="flex-col w-[390px] px-[12px] pt-[42px]">
            <span className="text-white text-xl font-semibold mb-[23px]">Previews</span>
            <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar">
                {items.map((item, i) => (
                    <div key={i} className="shrink-0 snap-start">
                        <img src={item.poster} alt={`preview-${i}`} className="w-[102px] h-[102px] mr-[7px] mt-[23px] rounded-full object-cover"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

"use client";

import { useEffect, useState } from "react";
import { getPreviewPosters } from "@/lib/tmdb";

export default function Previews() {
    //포스터용 URL 배열
    const [items, setItems] = useState<{ poster: string }[]>([]);

    useEffect(() => {
        getPreviewPosters().then(setItems).catch(console.error);
    }, []);

    return (
        <div className="flex-col w-[390px] px-[12px] pt-[23px]">
            <span className="text-white text-[22px] font-semibold mb-[23px]">Previews</span>
            <div className="flex overflow-x-hide snap-x snap-mandatory ">
                {items.map((item, i) => (
                    <div key={i} className="shrink-0 snap-start">
                        <img src={item.poster} alt={`preview-${i}`} className="w-[102px] h-[102px] mr-[7px] mt-[12px] rounded-full object-cover"/>
                    </div>
                ))}
            </div>
        </div>
    );
}

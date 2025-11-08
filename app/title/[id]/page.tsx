"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useParams } from "next/navigation";
import { fetchOverview } from "@/lib/api/tdmb/getOverview";

const IMG_BASE = "https://image.tmdb.org/t/p";

export default function TitlePreviewPage() {
  const searchParams = useSearchParams();
  const params = useParams<{ id: string }>();

  const imgPath = searchParams.get("img") || "";
  const id = params?.id ?? "";

  const [overview, setOverview] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchOverview(id, { language: "en-" });
        setOverview(data.overview);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const normalized = imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
  const src = `${IMG_BASE}/w780${normalized}`;

  return (
    <main className="min-h-screen w-93 flex flex-col items-center bg-black
     text-white px-4 py-6">
      {/* 이미지 */}
      <div className="relative w-93 h-103 rounded-xl overflow-hidden shadow-2xl border border-white/10">
        <Image src={src} alt="" fill sizes="420px" className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
      </div>

      {/* Play 버튼 */}
      <button type="button" className="h-[45px] w-[303px] rounded-[20px] bg-[#C4C4C4] text-black font-medium
      flex items-center justify-center mt-4 gap-2">
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5v14l11-7-11-7z" fill="currentColor" />
        </svg>
        <span className="text-lg">Play</span>
      </button>

      {/* Previews */}
      <span className="mt-8 text-[26px] leading-none font-bold self-start">
        Previews
      </span>
      <span className="mt-2 text-sm text-[#E0E0E0] leading-relaxed text-left">
        {overview}
      </span>
    </main>
  );
}

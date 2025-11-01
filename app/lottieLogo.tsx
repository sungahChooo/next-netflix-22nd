"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import LogoAnimation from "./animations/logo.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function LottieLogo() {
  const router = useRouter();

  const handleComplete = () => {
    router.push("/home");
  };

  return (
    <div className="w-[390px] flex items-center justify-center min-h-screen bg-gray-900 z-80">
      <Lottie
        animationData={LogoAnimation}
        loop={false}
        onComplete={handleComplete}
      />
    </div>
  );
}

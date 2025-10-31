"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // 숨기고 싶은 경로 배열 (예: /)
  const hiddenPaths = ["/"];

  // 현재 경로가 숨김 대상이라면 표시하지 않음
  if (hiddenPaths.includes(pathname)) return null;

  return <Navbar />;
}

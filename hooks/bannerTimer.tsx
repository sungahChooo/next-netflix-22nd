// hooks/useAutoRotate.ts
import { useEffect, useRef } from "react";

export function bannerTimer(length: number, rotateTime: number, setIndex: (fn: (i: number) => number) => void) {
    const timerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!length) return;

        const start = () => {
            stop();
            timerRef.current = window.setInterval(() => {
                setIndex((i) => (i + 1) % length);
            }, rotateTime);
        };

        const stop = () => {
            if (timerRef.current) {
                window.clearInterval(timerRef.current);
                timerRef.current = null;
            }
        };

        start();
        return () => stop();
    }, [length, rotateTime, setIndex]);
}

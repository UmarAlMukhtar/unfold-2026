import { useEffect, useRef, useState } from 'react';

export function LoadingScreen({ done }: { done: () => void }) {
  const [count, setCount] = useState(0);
  const callback = useRef(done); callback.current = done;
  useEffect(() => {
    const start = performance.now(); let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(100, Math.floor((now - start) / 14));
      setCount(next);
      next < 100 ? frame = requestAnimationFrame(tick) : setTimeout(() => callback.current(), 250);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <div className="fixed inset-0 z-[9999] bg-bg p-6 md:p-10"><p className="text-xs uppercase tracking-[.3em] text-muted">UNFOLD / 2026</p><p className="absolute inset-0 grid place-items-center font-display text-5xl italic text-text-primary/80 md:text-7xl">BUILDING</p><p className="absolute bottom-8 right-6 font-display text-7xl tabular-nums md:bottom-10 md:right-10 md:text-9xl">{String(count).padStart(3, '0')}</p><div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50"><div className="accent-gradient h-full origin-left" style={{ transform: `scaleX(${count / 100})` }} /></div></div>;
}

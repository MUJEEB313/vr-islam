"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";

/** Horizontal row: swipe on touch; mouse users also get arrow buttons, since they have no sideways scroll. */
export function Rail({ label, tiles = false, children }: { label: string; tiles?: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const measure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    el?.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow = "absolute top-[28%] z-10 hidden size-11 -translate-y-1/2 place-items-center rounded-full border border-line-strong bg-surface/95 shadow-lg backdrop-blur transition hover:bg-surface-2 pointer-fine:grid";

  return (
    <div className="relative">
      <div ref={ref} role="group" aria-label={label} onScroll={measure} className={`rail ${tiles ? "rail-tiles" : ""}`}>
        {children}
      </div>
      {!edges.start && (
        <button onClick={() => scroll(-1)} aria-label={`Scroll ${label} back`} className={`${arrow} -left-3`}>
          <Icon name="chevronLeft" />
        </button>
      )}
      {!edges.end && (
        <button onClick={() => scroll(1)} aria-label={`Scroll ${label} forward`} className={`${arrow} -right-3`}>
          <Icon name="chevronRight" />
        </button>
      )}
    </div>
  );
}

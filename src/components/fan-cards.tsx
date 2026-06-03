"use client";

import { useEffect, useState } from "react";
import { useFanCardHover } from "@/hooks/use-fan-card-hover";
import { cn } from "@/lib/utils";

interface FanEntry {
  id: string;
  topic: string;
  title: string;
  summary: string;
}

const categoryColor: Record<string, string> = {
  "Visual Design": "color-1",
  Product: "color-2",
  "UX Research": "color-4",
  AI: "color-3",
  Accessibility: "color-5",
  "Design Systems": "color-6",
  Tools: "color-8",
  Inspiration: "color-7",
};

const FAN_POSITIONS = [
  { left: "0px", top: "60px", rotate: -12, zIndex: 1 },
  { left: "100px", top: "30px", rotate: -6, zIndex: 2 },
  { left: "200px", top: "14px", rotate: 0, zIndex: 3 },
  { left: "300px", top: "30px", rotate: 6, zIndex: 2 },
  { left: "400px", top: "60px", rotate: 12, zIndex: 1 },
];

// Last card: 0.5s duration + 0.40s delay = 0.90s total
const ANIM_DONE_DELAY = 950;

export function FanCards({ entries }: { entries: FanEntry[] }) {
  const [fanAnimDone, setFanAnimDone] = useState(false);

  // One hook per card — hooks must be called at top level
  const fanHover0 = useFanCardHover(-12, 1);
  const fanHover1 = useFanCardHover(-6, 2);
  const fanHover2 = useFanCardHover(0, 3);
  const fanHover3 = useFanCardHover(6, 2);
  const fanHover4 = useFanCardHover(12, 1);
  const fanHovers = [fanHover0, fanHover1, fanHover2, fanHover3, fanHover4];

  useEffect(() => {
    const t = setTimeout(() => setFanAnimDone(true), ANIM_DONE_DELAY);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fan-wrap"
      aria-hidden="true"
      style={{ transform: "translateX(-60px)" }}
    >
      {entries.slice(0, 5).map((item, i) => {
        const pos = FAN_POSITIONS[i];
        const fh = fanHovers[i];
        if (!fh || !pos) return null;
        return (
          // biome-ignore lint/a11y/noStaticElementInteractions: decorative hover inside aria-hidden container
          <div
            key={item.id}
            ref={fh.ref}
            role="presentation"
            className={cn(
              "fan-card",
              !fanAnimDone && `fan-card-${i + 1}`,
              categoryColor[item.topic] ?? "color-8"
            )}
            style={{
              left: pos.left,
              top: pos.top,
              zIndex: pos.zIndex,
              // Set resting transform only after entrance animation completes
              ...(fanAnimDone && { transform: `rotate(${pos.rotate}deg)` }),
            }}
            onMouseMove={fh.onMouseMove}
            onMouseLeave={fh.onMouseLeave}
          >
            <div className="fan-card-shine" />
            <span className="fan-cat">{item.topic}</span>
            <span className="fan-title">{item.title}</span>
            <span className="fan-desc">{item.summary}</span>
          </div>
        );
      })}
    </div>
  );
}

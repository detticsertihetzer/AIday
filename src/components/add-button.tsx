"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

export function AddButton({ onClick }: { onClick?: () => void }) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const pupil0Ref = useRef<HTMLDivElement>(null);
  const pupil1Ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const movePupils = useCallback((e: MouseEvent) => {
    const pupils = [pupil0Ref.current, pupil1Ref.current];
    const eyes = btnRef.current?.querySelectorAll(".add-btn-eye");
    if (!eyes) return;

    eyes.forEach((eye, i) => {
      const rect = eye.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const max = 3;
      const x = dist > max ? (dx / dist) * max : dx;
      const y = dist > max ? (dy / dist) * max : dy;
      const pupil = pupils[i];
      if (pupil) pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
  }, []);

  useEffect(() => {
    if (hovered) {
      window.addEventListener("mousemove", movePupils);
    } else {
      window.removeEventListener("mousemove", movePupils);
      if (pupil0Ref.current) pupil0Ref.current.style.transform = "translate(0,0)";
      if (pupil1Ref.current) pupil1Ref.current.style.transform = "translate(0,0)";
    }
    return () => window.removeEventListener("mousemove", movePupils);
  }, [hovered, movePupils]);

  return (
    <Button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#111111",
        color: "#ffffff",
        border: "none",
        borderRadius: "100px",
        padding: "10px 24px",
        fontFamily: "var(--font-manrope, Manrope), sans-serif",
        fontSize: "13px",
        fontWeight: 700,
        letterSpacing: "-0.01em",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        minWidth: "148px",
        transition: "min-width .2s ease, opacity .15s ease",
      }}
    >
      {/* Eyes — collapse to zero width when not hovered */}
      <div
        style={{
          display: "flex",
          gap: "4px",
          alignItems: "center",
          // Width animates open/closed so the button grows naturally
          width: hovered ? "30px" : "0px",
          overflow: "hidden",
          flexShrink: 0,
          transition: "width .2s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        {/* Eye 1 */}
        <div
          className="add-btn-eye"
          style={{
            width: "13px",
            height: "13px",
            background: "#fff",
            borderRadius: "50%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            ref={pupil0Ref}
            style={{
              width: "5px",
              height: "5px",
              background: "#111",
              borderRadius: "50%",
              position: "absolute",
              transition: "transform .08s ease",
            }}
          />
        </div>
        {/* Eye 2 */}
        <div
          className="add-btn-eye"
          style={{
            width: "13px",
            height: "13px",
            background: "#fff",
            borderRadius: "50%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            ref={pupil1Ref}
            style={{
              width: "5px",
              height: "5px",
              background: "#111",
              borderRadius: "50%",
              position: "absolute",
              transition: "transform .08s ease",
            }}
          />
        </div>
      </div>

      {/* Label */}
      <span>Add entry</span>
    </Button>
  );
}

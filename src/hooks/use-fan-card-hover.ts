import { useCallback, useRef } from "react";

export function useFanCardHover(restRotation: number, restZIndex: number) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const shine = el.querySelector(".fan-card-shine") as HTMLElement | null;
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y - r.height / 2) / r.height) * -10;
      const ry = ((x - r.width / 2) / r.width) * 10;

      el.style.transition = "transform .08s ease, box-shadow .08s ease";
      el.style.transform = `rotate(${restRotation}deg) translateY(-18px) perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`;
      el.style.boxShadow = `${-ry * 1.5}px ${rx * 1.5 + 20}px 40px rgba(0,0,0,0.14)`;
      el.style.zIndex = "10";

      if (shine) {
        shine.style.opacity = "1";
        shine.style.setProperty("--shine-x", `${(x / r.width) * 100}%`);
        shine.style.setProperty("--shine-y", `${(y / r.height) * 100}%`);
      }
    },
    [restRotation]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;

    const shine = el.querySelector(".fan-card-shine") as HTMLElement | null;

    el.style.transition =
      "transform .5s cubic-bezier(0.34,1.56,0.64,1), box-shadow .5s ease";
    el.style.transform = `rotate(${restRotation}deg) translateY(0px)`;
    el.style.boxShadow = "none";
    el.style.zIndex = String(restZIndex);

    if (shine) shine.style.opacity = "0";
  }, [restRotation, restZIndex]);

  return { ref, onMouseMove, onMouseLeave };
}

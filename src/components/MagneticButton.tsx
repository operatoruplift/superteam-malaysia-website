"use client";

import { useRef, useState, useCallback } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: "a" | "button" | "div";
  [key: string]: unknown;
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as: Tag = "a",
  ...props
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [transform, setTransform] = useState("translate3d(0,0,0)");

  const handleMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      setTransform(`translate3d(${dx}px,${dy}px,0)`);
    },
    [strength]
  );

  const handleLeave = useCallback(() => {
    setTransform("translate3d(0,0,0)");
  }, []);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref}
      className={className}
      style={{ transform, transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </Component>
  );
}

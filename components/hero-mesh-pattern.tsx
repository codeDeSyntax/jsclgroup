"use client";

import React from "react";

type Hole = { x: number; y: number; r: number };

type Props = {
  className?: string;
  holes?: Hole[]; // positions in percent (0-100)
  colorClass?: string; // tailwind text color class to control stroke color (e.g. "text-jcl-primary/10")
  strokeWidth?: number;
};

export default function HeroMeshPattern({
  className = "",
  holes = [
    { x: 28, y: 22, r: 18 },
    { x: 72, y: 64, r: 20 },
  ],
  colorClass = "text-jcl-primary/10",
  strokeWidth = 0.6,
}: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${colorClass} ${className}`}
    >
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          {/* Tile pattern: a slightly skewed square (parallelogram) */}
          <pattern
            id="tiltedSquares"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="skewX(-18)"
          >
            {/*
              Make tiles slightly smaller than the cell so a thin separation
              appears between them and give them soft rounded corners.
            */}
            <rect
              x="0.4"
              y="0.4"
              width="7.2"
              height="7.2"
              rx="1"
              fill="currentColor"
              fillOpacity="0.03"
              stroke="currentColor"
              strokeWidth={strokeWidth}
              strokeOpacity={0.12}
            />
          </pattern>

          {/* mask: white shows (pattern visible) and black hides (center holes) */}
          <mask id="holesMask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {holes.map((h, i) => (
              <circle
                key={i}
                cx={`${h.x}%`}
                cy={`${h.y}%`}
                r={`${h.r}%`}
                fill="black"
              />
            ))}
          </mask>
        </defs>

        {/* base layer (subtle grid) - only visible where mask allows */}
        <rect
          width="100%"
          height="100%"
          fill="url(#tiltedSquares)"
          mask="url(#holesMask)"
          opacity="0.14"
        />

        {/* subtle overlay lines (optional) to add depth - rendered at low opacity */}
        <g
          mask="url(#holesMask)"
          stroke="currentColor"
          strokeWidth={0.18}
          strokeOpacity={0.08}
        >
          {/* draw a few extra diagonal lines for visual texture */}
          <path d="M-10 5 L110 105" />
          <path d="M-10 15 L110 115" />
          <path d="M-10 25 L110 125" />
        </g>
      </svg>
    </div>
  );
}

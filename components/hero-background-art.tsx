type HeroBackgroundArtProps = {
  variant?: "light" | "dark";
};

export default function HeroBackgroundArt({
  variant = "light",
}: HeroBackgroundArtProps) {
  const isDark = variant === "dark";

  return (
    <>
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 ${
          isDark
            ? "bg-[radial-gradient(circle_at_50%_18%,rgba(248,85,6,0.3),transparent_38%)]"
            : "bg-gradient-to-b from-transparent to-brand-orange/5"
        }`}
        aria-hidden="true"
      />

      <div
        className={`absolute inset-0 w-full md:w-[92%] m-auto -z-5 overflow-hidden pointer-events-none ${
          isDark ? "opacity-90" : ""
        }`}
        aria-hidden="true"
      >
        {/* Left mesh */}
        <svg
          className="absolute left-[-22%] top-[-15%] h-[62%] w-[122%] opacity-[0.34] sm:left-[-16%] sm:h-[66%] sm:w-[108%] md:left-[-6%] md:top-[4%] md:h-[75%] md:w-[78%] md:opacity-[0.42]"
          viewBox="0 0 980 700"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="meshFill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(248, 85, 6, 0.5)" />
              <stop offset="55%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="100%" stopColor="rgba(18, 55, 111, 0.18)" />
            </linearGradient>
          </defs>

          <g transform="translate(90 52) skewX(-18)">
            <g>
              <polygon
                points="0,0 92,0 132,80 40,80"
                fill="url(#meshFill)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <polygon
                points="92,0 184,0 224,80 132,80"
                fill="none"
                stroke="rgba(248,85,6,0.32)"
                strokeWidth="1"
              />
              <polygon
                points="184,0 276,0 316,80 224,80"
                fill="url(#meshFill)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="276,0 368,0 408,80 316,80"
                fill="none"
                stroke="rgba(18,55,111,0.2)"
                strokeWidth="1"
              />
              <polygon
                points="368,0 460,0 500,80 408,80"
                fill="url(#meshFill)"
                stroke="rgba(248,85,6,0.4)"
                strokeWidth="1"
              />
              <polygon
                points="460,0 552,0 592,80 500,80"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            </g>

            <g transform="translate(40 84)">
              <polygon
                points="0,0 92,0 132,80 40,80"
                fill="none"
                stroke="rgba(248,85,6,0.4)"
                strokeWidth="1"
              />
              <polygon
                points="92,0 184,0 224,80 132,80"
                fill="url(#meshFill)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="184,0 276,0 316,80 224,80"
                fill="none"
                stroke="rgba(18,55,111,0.18)"
                strokeWidth="1"
              />
              <polygon
                points="276,0 368,0 408,80 316,80"
                fill="url(#meshFill)"
                stroke="rgba(248,85,6,0.5)"
                strokeWidth="1"
              />
              <polygon
                points="368,0 460,0 500,80 408,80"
                fill="none"
                stroke="rgba(255,255,255,0.11)"
                strokeWidth="1"
              />
              <polygon
                points="460,0 552,0 592,80 500,80"
                fill="url(#meshFill)"
                stroke="rgba(18,55,111,0.16)"
                strokeWidth="1"
              />
            </g>

            <g transform="translate(0 168)">
              <polygon
                points="0,0 92,0 132,80 40,80"
                fill="url(#meshFill)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="92,0 184,0 224,80 132,80"
                fill="none"
                stroke="rgba(248,85,6,0.5)"
                strokeWidth="1"
              />
              <polygon
                points="184,0 276,0 316,80 224,80"
                fill="url(#meshFill)"
                stroke="rgba(18,55,111,0.16)"
                strokeWidth="1"
              />
              <polygon
                points="276,0 368,0 408,80 316,80"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="368,0 460,0 500,80 408,80"
                fill="url(#meshFill)"
                stroke="rgba(248,85,6,0.4)"
                strokeWidth="1"
              />
              <polygon
                points="460,0 552,0 592,80 500,80"
                fill="none"
                stroke="rgba(18,55,111,0.16)"
                strokeWidth="1"
              />
              <polygon
                points="552,0 644,0 684,80 592,80"
                fill="url(#meshFill)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </g>

            <path
              d="M 40 40 L 632 40 M 80 124 L 672 124 M 40 208 L 684 208 M 80 292 L 632 292 M 40 376 L 592 376 M 80 460 L 552 460"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 40 40 L 80 124 L 40 208 L 80 292 L 40 376 L 80 460"
              stroke="rgba(248,85,6,0.4)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 132 40 L 172 124 L 132 208 L 172 292 L 132 376 L 172 460"
              stroke="rgba(18,55,111,0.24)"
              strokeWidth="1.2"
              fill="none"
            />
          </g>
        </svg>

        {/* Right mesh (mirrored) */}
        <svg
          className="absolute right-[-22%] top-[-15%] h-[62%] w-[122%] opacity-[0.34] sm:right-[-16%] sm:h-[66%] sm:w-[108%] md:right-[-6%] md:top-[4%] md:h-[75%] md:w-[78%] md:opacity-[0.42]"
          viewBox="0 0 980 700"
          xmlns="http://www.w3.org/2000/svg"
          style={{ transform: "scaleX(-1)" }}
        >
          <defs>
            <linearGradient
              id="meshFillRight"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(248, 85, 6, 0.5)" />
              <stop offset="55%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="100%" stopColor="rgba(18, 55, 111, 0.18)" />
            </linearGradient>
          </defs>

          <g transform="translate(90 52) skewX(-18)">
            <g>
              <polygon
                points="0,0 92,0 132,80 40,80"
                fill="url(#meshFillRight)"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
              <polygon
                points="92,0 184,0 224,80 132,80"
                fill="none"
                stroke="rgba(248,85,6,0.32)"
                strokeWidth="1"
              />
              <polygon
                points="184,0 276,0 316,80 224,80"
                fill="url(#meshFillRight)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="276,0 368,0 408,80 316,80"
                fill="none"
                stroke="rgba(18,55,111,0.2)"
                strokeWidth="1"
              />
              <polygon
                points="368,0 460,0 500,80 408,80"
                fill="url(#meshFillRight)"
                stroke="rgba(248,85,6,0.4)"
                strokeWidth="1"
              />
              <polygon
                points="460,0 552,0 592,80 500,80"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1"
              />
            </g>

            <g transform="translate(40 84)">
              <polygon
                points="0,0 92,0 132,80 40,80"
                fill="none"
                stroke="rgba(248,85,6,0.4)"
                strokeWidth="1"
              />
              <polygon
                points="92,0 184,0 224,80 132,80"
                fill="url(#meshFillRight)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="184,0 276,0 316,80 224,80"
                fill="none"
                stroke="rgba(18,55,111,0.18)"
                strokeWidth="1"
              />
              <polygon
                points="276,0 368,0 408,80 316,80"
                fill="url(#meshFillRight)"
                stroke="rgba(248,85,6,0.5)"
                strokeWidth="1"
              />
              <polygon
                points="368,0 460,0 500,80 408,80"
                fill="none"
                stroke="rgba(255,255,255,0.11)"
                strokeWidth="1"
              />
              <polygon
                points="460,0 552,0 592,80 500,80"
                fill="url(#meshFillRight)"
                stroke="rgba(18,55,111,0.16)"
                strokeWidth="1"
              />
            </g>

            <g transform="translate(0 168)">
              <polygon
                points="0,0 92,0 132,80 40,80"
                fill="url(#meshFillRight)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="92,0 184,0 224,80 132,80"
                fill="none"
                stroke="rgba(248,85,6,0.5)"
                strokeWidth="1"
              />
              <polygon
                points="184,0 276,0 316,80 224,80"
                fill="url(#meshFillRight)"
                stroke="rgba(18,55,111,0.16)"
                strokeWidth="1"
              />
              <polygon
                points="276,0 368,0 408,80 316,80"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
              <polygon
                points="368,0 460,0 500,80 408,80"
                fill="url(#meshFillRight)"
                stroke="rgba(248,85,6,0.4)"
                strokeWidth="1"
              />
              <polygon
                points="460,0 552,0 592,80 500,80"
                fill="none"
                stroke="rgba(18,55,111,0.16)"
                strokeWidth="1"
              />
              <polygon
                points="552,0 644,0 684,80 592,80"
                fill="url(#meshFillRight)"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
              />
            </g>

            <path
              d="M 40 40 L 632 40 M 80 124 L 672 124 M 40 208 L 684 208 M 80 292 L 632 292 M 40 376 L 592 376 M 80 460 L 552 460"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 40 40 L 80 124 L 40 208 L 80 292 L 40 376 L 80 460"
              stroke="rgba(248,85,6,0.4)"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M 132 40 L 172 124 L 132 208 L 172 292 L 132 376 L 172 460"
              stroke="rgba(18,55,111,0.24)"
              strokeWidth="1.2"
              fill="none"
            />
          </g>
        </svg>
      </div>
    </>
  );
}

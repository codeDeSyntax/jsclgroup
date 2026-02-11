export default function HeroBackgroundArt() {
  return (
    <>
      {/* Background Glow Effect */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-transparent to-brand-orange/5 -z-10"
        aria-hidden="true"
      ></div>

      {/* Ultra-Artistic Business Pattern - Premium & Sophisticated */}
      <div className="absolute inset-0 -z-5" aria-hidden="true">
        {/* Radial Network Hub - Global Business Reach */}
        <svg
          className="absolute top-[5%] right-[8%] w-80 h-80 opacity-25"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="networkGradient">
              <stop offset="0%" stopColor="rgba(248, 85, 6, 0.4)" />
              <stop offset="100%" stopColor="rgba(248, 85, 6, 0)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#networkGradient)" />
          {/* Radiating connection lines */}
          <g stroke="rgba(248, 85, 6, 0.5)" strokeWidth="1.2">
            <line x1="200" y1="200" x2="340" y2="140" />
            <line x1="200" y1="200" x2="320" y2="240" />
            <line x1="200" y1="200" x2="260" y2="320" />
            <line x1="200" y1="200" x2="140" y2="300" />
            <line x1="200" y1="200" x2="80" y2="220" />
            <line x1="200" y1="200" x2="100" y2="120" />
            <line x1="200" y1="200" x2="180" y2="60" />
            <line x1="200" y1="200" x2="280" y2="80" />
          </g>
          {/* Connection nodes */}
          <circle cx="340" cy="140" r="6" fill="rgba(248, 85, 6, 0.5)" />
          <circle cx="320" cy="240" r="5" fill="rgba(32, 0, 112, 0.4)" />
          <circle cx="260" cy="320" r="4" fill="rgba(248, 85, 6, 0.4)" />
          <circle cx="140" cy="300" r="5" fill="rgba(248, 85, 6, 0.45)" />
          <circle cx="80" cy="220" r="4" fill="rgba(32, 0, 112, 0.35)" />
          <circle cx="100" cy="120" r="5" fill="rgba(248, 85, 6, 0.4)" />
          <circle cx="180" cy="60" r="4" fill="rgba(248, 85, 6, 0.5)" />
          <circle cx="280" cy="80" r="5" fill="rgba(32, 0, 112, 0.4)" />
          <circle cx="200" cy="200" r="8" fill="rgba(248, 85, 6, 0.6)" />
        </svg>

        {/* Elegant Spiral Growth Pattern - Now matching right side network */}
        <svg
          className="absolute bottom-[10%] left-[5%] w-80 h-80 opacity-20"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="networkGradientLeft">
              <stop offset="0%" stopColor="rgba(248, 85, 6, 0.3)" />
              <stop offset="100%" stopColor="rgba(248, 85, 6, 0)" />
            </radialGradient>
          </defs>
          <circle cx="200" cy="200" r="150" fill="url(#networkGradientLeft)" />
          {/* Radiating connection lines */}
          <g stroke="rgba(248, 85, 6, 0.45)" strokeWidth="1.2">
            <line x1="200" y1="200" x2="340" y2="140" />
            <line x1="200" y1="200" x2="320" y2="240" />
            <line x1="200" y1="200" x2="260" y2="320" />
            <line x1="200" y1="200" x2="140" y2="300" />
            <line x1="200" y1="200" x2="80" y2="220" />
            <line x1="200" y1="200" x2="100" y2="120" />
            <line x1="200" y1="200" x2="180" y2="60" />
            <line x1="200" y1="200" x2="280" y2="80" />
          </g>
          {/* Connection nodes */}
          <circle cx="340" cy="140" r="6" fill="rgba(248, 85, 6, 0.3)" />
          <circle cx="320" cy="240" r="5" fill="rgba(32, 0, 112, 0.25)" />
          <circle cx="260" cy="320" r="4" fill="rgba(248, 85, 6, 0.25)" />
          <circle cx="140" cy="300" r="5" fill="rgba(248, 85, 6, 0.28)" />
          <circle cx="80" cy="220" r="4" fill="rgba(32, 0, 112, 0.22)" />
          <circle cx="100" cy="120" r="5" fill="rgba(248, 85, 6, 0.25)" />
          <circle cx="180" cy="60" r="4" fill="rgba(248, 85, 6, 0.3)" />
          <circle cx="280" cy="80" r="5" fill="rgba(32, 0, 112, 0.25)" />
          <circle cx="200" cy="200" r="8" fill="rgba(248, 85, 6, 0.35)" />
        </svg>

        {/* Abstract Mesh Grid - Innovation Framework */}
        <svg
          className="absolute top-[20%] left-[15%] w-[70%] h-[65%] opacity-15"
          viewBox="0 0 800 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Curved mesh lines */}
          <path
            d="M 0 100 Q 200 120, 400 100 T 800 100"
            stroke="rgba(248, 85, 6, 0.25)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 200 Q 200 180, 400 200 T 800 200"
            stroke="rgba(248, 85, 6, 0.2)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 300 Q 200 320, 400 300 T 800 300"
            stroke="rgba(32, 0, 112, 0.2)"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 0 400 Q 200 380, 400 400 T 800 400"
            stroke="rgba(248, 85, 6, 0.18)"
            strokeWidth="1"
            fill="none"
          />
          {/* Vertical mesh */}
          <path
            d="M 150 0 Q 160 150, 150 300 T 150 600"
            stroke="rgba(248, 85, 6, 0.2)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 350 0 Q 340 150, 350 300 T 350 600"
            stroke="rgba(32, 0, 112, 0.18)"
            strokeWidth="0.8"
            fill="none"
          />
          <path
            d="M 550 0 Q 560 150, 550 300 T 550 600"
            stroke="rgba(248, 85, 6, 0.15)"
            strokeWidth="0.8"
            fill="none"
          />
          {/* Intersection nodes */}
          <circle cx="150" cy="100" r="3" fill="rgba(248, 85, 6, 0.35)" />
          <circle cx="350" cy="200" r="3" fill="rgba(32, 0, 112, 0.3)" />
          <circle cx="550" cy="300" r="3" fill="rgba(248, 85, 6, 0.3)" />
          <circle cx="350" cy="400" r="3" fill="rgba(248, 85, 6, 0.35)" />
        </svg>

        {/* Flowing Stream Lines - Market Flow */}
        <svg
          className="absolute top-[35%] right-[10%] w-[35%] h-[40%] opacity-25"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 100 C 120 80, 180 120, 250 100 C 320 80, 350 50, 380 40"
            stroke="rgba(248, 85, 6, 0.4)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 40 150 C 110 130, 170 170, 240 150 C 310 130, 340 100, 370 90"
            stroke="rgba(248, 85, 6, 0.3)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 45 200 C 115 180, 175 220, 245 200 C 315 180, 345 150, 375 140"
            stroke="rgba(32, 0, 112, 0.25)"
            strokeWidth="1.8"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M 50 250 C 120 230, 180 270, 250 250 C 320 230, 350 200, 380 190"
            stroke="rgba(248, 85, 6, 0.25)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>

        {/* Organic Liquid Shapes - Dynamic Growth - Now sleek like right side */}
        <svg
          className="absolute top-[45%] left-[10%] w-72 h-72 opacity-20"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="rgba(248, 85, 6, 0.15)"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="rgba(248, 85, 6, 0.2)"
            strokeWidth="1.2"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="rgba(32, 0, 112, 0.2)"
            strokeWidth="1.5"
          />
          <circle
            cx="200"
            cy="200"
            r="60"
            fill="rgba(248, 85, 6, 0.15)"
            stroke="rgba(248, 85, 6, 0.3)"
            strokeWidth="1.8"
          />
          <circle cx="200" cy="200" r="12" fill="rgba(248, 85, 6, 0.4)" />
        </svg>

        {/* Circular Ripple Effect - Impact & Influence */}
        <svg
          className="absolute bottom-[25%] right-[15%] w-72 h-72 opacity-20"
          viewBox="0 0 400 400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="rgba(248, 85, 6, 0.15)"
            strokeWidth="1"
          />
          <circle
            cx="200"
            cy="200"
            r="140"
            fill="none"
            stroke="rgba(248, 85, 6, 0.2)"
            strokeWidth="1.2"
          />
          <circle
            cx="200"
            cy="200"
            r="100"
            fill="none"
            stroke="rgba(32, 0, 112, 0.2)"
            strokeWidth="1.5"
          />
          <circle
            cx="200"
            cy="200"
            r="60"
            fill="rgba(248, 85, 6, 0.15)"
            stroke="rgba(248, 85, 6, 0.3)"
            strokeWidth="1.8"
          />
          <circle cx="200" cy="200" r="12" fill="rgba(248, 85, 6, 0.4)" />
        </svg>

        {/* Scattered Data Points - Analytics */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute top-[12%] left-[22%] w-2 h-2 bg-brand-orange/50 rounded-full animate-pulse"></div>
          <div className="absolute top-[18%] left-[68%] w-2.5 h-2.5 bg-brand-orange/40 rounded-full"></div>
          <div className="absolute top-[42%] left-[19%] w-1.5 h-1.5 bg-brand-navy/40 rounded-full animate-pulse"></div>
          <div className="absolute top-[55%] right-[22%] w-2 h-2 bg-brand-orange/45 rounded-full"></div>
          <div className="absolute bottom-[28%] left-[45%] w-2 h-2 bg-brand-orange/35 rounded-full animate-pulse"></div>
          <div className="absolute top-[32%] right-[38%] w-1.5 h-1.5 bg-brand-navy/35 rounded-full"></div>
          <div className="absolute bottom-[35%] left-[62%] w-2.5 h-2.5 bg-brand-orange/40 rounded-full"></div>
        </div>

        {/* Abstract Lightning Bolts - Innovation Energy */}
        <svg
          className="absolute top-[8%] left-[40%] w-20 h-20 opacity-15"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M 50 10 L 40 45 L 55 45 L 45 90 L 70 50 L 55 50 Z"
            fill="rgba(248, 85, 6, 0.3)"
          />
        </svg>
      </div>

      {/* Bottom Fade Overlay - creates blend into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-white -z-5 pointer-events-none"
        aria-hidden="true"
      ></div>
    </>
  );
}

export default function HeroWatermarkSection() {
  return (
    <div className="relative flex h-[20vh] w-full items-center justify-center overflow-hidden border-t border-black/5 bg-jcl-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="select-none whitespace-nowrap text-[clamp(4rem,18vw,12rem)] font-black leading-none tracking-[-0.11em] text-jcl-primary/[0.045] uppercase blur-[0.2px]">
            JCL GROUP
          </h2>
        </div>

        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center">
          <p className="select-none whitespace-nowrap text-[clamp(0.75rem,2.2vw,1.15rem)] font-semibold uppercase tracking-[0.6em] text-brand-navy/20">
            Property Projects Electronics
          </p>
        </div>

        <div className="absolute -left-10 top-1/2 h-px w-[140%] -translate-y-1/2 bg-gradient-to-r from-transparent via-jcl-primary/10 to-transparent" />
      </div>
    </div>
  );
}

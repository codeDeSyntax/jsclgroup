"use client";

import { motion } from "framer-motion";

export default function HeroStats() {
  return (
    <div className="mt-6 lg:mt-8 hidden sm:flex ">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Summary */}
        <div className="w-full sm:w-36 flex-shrink-0">
          <div className="text-2xl sm:text-3xl font-black text-white text-center sm:text-left">
            1.2K
          </div>
          <div className="text-xs text-white/80 text-center sm:text-left">
            Properties Listed
          </div>
          <div className="mt-2 text-xs text-white/60 text-center sm:text-left">
            312 Projects completed • Avg. response 2h
          </div>
        </div>

        {/* Bar-style Chart (more readable) */}
        <div className="flex-1">
          <div className="ml-0 sm:ml-8">
            <div className="flex items-end gap-3 sm:gap-4 h-24 sm:h-24">
              {(() => {
                const data = [2, 3, 5, 6, 4, 3, 2, 5, 6, 4, 3, 2];
                const max = Math.max(...data, 6);
                return data.map((v, i) => {
                  return (
                    <div
                      key={i}
                      className="flex flex-col items-center w-3 sm:w-8 relative group"
                    >
                      {/* tooltip shown on hover */}
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-150">
                        <div className="bg-white text-slate-900 px-2 py-1 rounded-md text-xs font-medium shadow-md w-max text-center">
                          <div>{v} listings</div>
                          <div className="text-[10px] text-slate-500">
                            Period {i + 1}
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-full flex items-end">
                        <motion.div
                          className="w-full flex items-end justify-center overflow-hidden"
                          initial={{ scaleY: 0 }}
                          whileInView={{ scaleY: 1 }}
                          viewport={{ once: true, amount: 0.6 }}
                          transition={{
                            type: "spring",
                            stiffness: 120,
                            damping: 14,
                            delay: i * 0.06,
                          }}
                          style={{ transformOrigin: "bottom" }}
                          aria-hidden
                        >
                          <div
                            className="w-full rounded-full"
                            style={{
                              width: "8rem",
                              height: `${Math.max(28, v * 24)}px`,
                              backgroundColor: "var(--jcl-accent, #e5e5e5)",
                            }}
                          />
                        </motion.div>
                      </div>
                      <div className="mt-2 text-[10px] text-white/60 text-center">
                        {i % 2 === 0 ? i + 1 : ""}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Legend / axis summary */}
            <div className="mt-3 flex items-center gap-4 text-xs text-white/70">
              <div className="flex-1 text-sm sm:text-base font-black text-white">
                1.2K
              </div>
              <div className="text-white/60">Listings over past 12 periods</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

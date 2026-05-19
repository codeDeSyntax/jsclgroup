"use client";

import { motion } from "framer-motion";

export default function HeroStats() {
  return (
    <div className="mt-6 lg:mt-8 hidden sm:flex">
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

        {/* Box Grid Chart */}
        <div className="flex-1">
          <div className="relative">
            {/* y-axis labels (hidden on small screens) */}
            <div className="hidden sm:absolute sm:left-0 sm:top-0 sm:bottom-6 sm:flex sm:flex-col sm:justify-between text-xs text-white/60">
              <span>6</span>
              <span>4</span>
              <span>2</span>
              <span>0</span>
            </div>

            {/* grid of boxes: rows x cols */}
            <div className="ml-0 sm:ml-8 overflow-x-auto">
              <div className="grid grid-rows-6 grid-cols-12 gap-1">
                {/** weekly activity columns (0..6 scale) */}
                {(() => {
                  const cols = 12;
                  const rows = 6;
                  const data = [2, 3, 5, 6, 4, 3, 2, 5, 6, 4, 3, 2];
                  const cells: any[] = [];
                  for (let r = rows - 1; r >= 0; r--) {
                    for (let c = 0; c < cols; c++) {
                      const filled = data[c] > r;
                      if (filled) {
                        cells.push(
                          <motion.div
                            key={`${r}-${c}`}
                            className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm"
                            animate={{ y: [4, -3, 4] }}
                            transition={{
                              duration: 2.2,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: c * 0.06 + (rows - r) * 0.02,
                            }}
                            style={{
                              backgroundColor:
                                "var(--jcl-accent, #f97316)",
                            }}
                          />,
                        );
                      } else {
                        cells.push(
                          <div
                            key={`${r}-${c}`}
                            className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-white/6"
                          />,
                        );
                      }
                    }
                  }
                  return cells;
                })()}
              </div>

              {/* x-axis labels */}
              <div className="mt-2 flex items-center justify-between text-xs text-white/60">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-3 sm:w-4 text-center text-[10px]">
                    {i % 2 === 0 ? i + 1 : ""}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MoveHorizontal } from 'lucide-react';

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ beforeImage, afterImage }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPosition(percent);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (e.buttons === 1) handleMove(e.clientX); // Only drag on click for editorial feel? Or hover?
    // The design HTML uses a range input which is very standard for editorial sliders.
    // But since I have a pointer-based one, I'll stick to a smooth pointer implementation.
    handleMove(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[4/5] bg-[#1a1a1a] border border-white/10 overflow-hidden cursor-col-resize group"
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
    >
      {/* Before Image (Background) */}
      <img
        src={beforeImage}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover select-none"
        referrerPolicy="no-referrer"
      />

      {/* After Image (Foreground with Clip) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none z-10"
        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
      >
        <img
          src={afterImage}
          alt="After"
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Slider Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-0 bottom-0 w-[1px] bg-white/80 z-20" />
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-black/20 backdrop-blur-md rounded-full border border-white flex items-center justify-center gap-1 z-30">
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
          <div className="w-1 h-1 bg-white rounded-full" />
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-between px-5 z-20 pointer-events-none">
        <span className="bg-black/50 px-2 py-1 border border-white/20 text-[10px] tracking-widest uppercase font-inter">
          Original Plate [Raw]
        </span>
        <span className="bg-black/50 px-2 py-1 border border-white/20 text-[10px] tracking-widest uppercase font-inter">
          Digital Grade [Processed]
        </span>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white selection:text-black font-inter flex items-center justify-center py-10 md:py-0">
      <div className="w-full max-w-[1024px] min-h-[768px] p-10 grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 items-stretch relative">
        
        {/* Editorial Header (Sidebar) */}
        <header className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10 pb-10 md:pb-0 md:pr-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="title-group"
          >
            <span className="editorial-meta block mb-10">Vol. 12 // Issue 04</span>
            <h1 className="editorial-title uppercase">
              The<br/>Digital<br/>Void
            </h1>
            <span className="editorial-subtitle">
              Exploring the boundary of perception through post-process.
            </span>
            <div className="mt-12 max-w-[280px]">
              <p className="text-[13px] opacity-70 leading-relaxed font-inter">
                This comparison captures the stark evolution between raw architectural form and its final digital interpretation. Through a sophisticated color grading process, we've extracted hidden luminance data to reveal a high-contrast urban narrative that was previously invisible to the naked eye.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="footer-meta"
          >
            <p className="editorial-meta leading-loose">
              Project: Chromatic Aberration<br/>
              Artist: Elena Vance<br/>
              Date: Oct 2024
            </p>
          </motion.div>
        </header>

        {/* Comparison Section (Right) */}
        <main className="relative flex flex-col justify-center h-full">
          {/* Navigation */}
          <nav className="absolute top-0 right-0 flex gap-8">
            <a href="#" className="editorial-meta opacity-50 hover:opacity-100 transition-opacity">Overview</a>
            <a href="#" className="editorial-meta border-b border-white pb-1 active">Analysis</a>
            <a href="#" className="editorial-meta opacity-50 hover:opacity-100 transition-opacity">Process</a>
          </nav>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <ImageSlider 
              beforeImage="https://picsum.photos/seed/city-raw/800/1000?grayscale" 
              afterImage="https://picsum.photos/seed/city-raw/800/1000" 
            />
          </motion.div>

          {/* Footer Info */}
          <div className="mt-8">
            <div className="flex justify-between items-start">
              <div className="space-y-6 max-w-[480px]">
                <p className="text-[11px] opacity-30 leading-relaxed font-inter italic uppercase tracking-wider">
                  Technical Analysis // 04-A
                </p>
                <p className="text-[11px] opacity-40 leading-relaxed font-inter italic">
                  * The RAW plate (left) shows the standard dynamic range captured by the sensor. The processed grade (right) utilizes a custom LUT designed to emphasize architectural symmetry and neon saturation.
                </p>
                <div className="pt-6 border-t border-white/5">
                  <p className="text-[12px] opacity-60 leading-relaxed font-inter">
                    The ongoing series explores the intersection of brutalist geometry and digital chromaticism, questioning our reliance on post-processing to define photographic reality in the 21st century.
                  </p>
                </div>
              </div>
              <div className="font-playfair italic text-[80px] opacity-10 leading-none select-none">
                04
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

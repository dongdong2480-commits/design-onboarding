import { motion, useScroll, useTransform, PanInfo } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const CARDS = [
  { id: 1, src: "/img/planning.png" },         
  { id: 2, src: "/img/sales.png" },             
  { id: 3, src: "/img/chamsf.png", isHero: true }, 
  { id: 4, src: "/img/ddee.png" },             
  { id: 5, src: "/img/jiwone.png" },           
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(2);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCardClick = (id: number) => {
    const basePath = "/pages";
    if (id === 1) window.location.href = `${basePath}/index4.html`;
    else if (id === 2) window.location.href = `${basePath}/index5.html`;
    else if (id === 3) window.location.href = `${basePath}/index6.html`;
    else if (id === 4) {
      // ✅ 4번 클릭 시 'sf-design-work' ID를 가진 곳으로 스크롤합니다.
      const targetSection = document.getElementById('sf-design-work');
      if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (id === 5) window.location.href = `${basePath}/index7.html`;
  };

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50; 
    if (info.offset.x < -swipeThreshold && currentIndex < CARDS.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (info.offset.x > swipeThreshold && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0">
        <motion.h1 style={{ y, opacity }} className="text-[15vw] md:text-[20vw] font-bold text-gray-50 text-center tracking-tighter leading-none">
          CHAMSF
        </motion.h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-black mb-12">
          We design the future
        </motion.h1>

        <div className="relative h-[300px] md:h-[500px] w-full flex justify-center items-center perspective-1000 cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {CARDS.map((card, index) => {
            const offsetIndex = index - currentIndex; 
            const baseSpread = isMobile ? 35 : 60;
            const hoverSpread = isMobile ? 80 : 180;
            const currentSpread = isHovered ? hoverSpread : baseSpread;
            const baseY = isHovered ? Math.abs(offsetIndex) * 30 : Math.abs(offsetIndex) * 10;
            const dynamicScale = offsetIndex === 0 ? 1.1 : 0.9 - Math.abs(offsetIndex) * 0.05;
            const dynamicRotate = offsetIndex * 7.5;

            return (
              <motion.div
                key={card.id}
                onClick={() => { if (offsetIndex === 0) handleCardClick(card.id); else setCurrentIndex(index); }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{
                  rotate: isHovered ? offsetIndex * 12 : dynamicRotate,
                  x: offsetIndex * currentSpread,
                  y: baseY,
                  scale: isHovered ? (offsetIndex === 0 ? 1.15 : 1.1) : dynamicScale,
                  opacity: 1,
                  zIndex: 50 - Math.abs(offsetIndex) * 10 
                }}
                transition={{ type: "spring", stiffness: 120, damping: 20 }}
                className="absolute w-48 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
              >
                <img src={card.src} alt={`Portfolio ${card.id}`} className="w-full h-full object-cover pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
        <motion.p className="mt-14 md:mt-22 text-lg md:text-xl font-medium text-gray-900 max-w-xl mx-auto">
          Innovative Design for Better User Experience
        </motion.p>
      </div>
    </section>
  );
}
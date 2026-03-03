import { motion, useScroll, useTransform, PanInfo } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

// ✅ 이미지 import: src/img 폴더 내에 해당 파일들이 있어야 합니다.
import planningImg from '../img/planning.png';
import salesImg from '../img/sales.png';
import sfImg from '../img/chamsf.png';
import ddeeImg from '../img/ddee.png';
import jiwoneImg from '../img/jiwone.png';

const CARDS = [
  { id: 1, src: planningImg },         // 👈 클릭 시 /pages/index4.html 이동
  { id: 2, src: salesImg },            // 👈 클릭 시 /pages/index5.html 이동
  { id: 3, src: sfImg, isHero: true }, // 👈 클릭 시 /pages/index6.html 이동
  { id: 4, src: ddeeImg },             // 👈 클릭 시 '참조은SF Design Work' 섹션으로 스크롤
  { id: 5, src: jiwoneImg },           // 👈 클릭 시 /pages/index7.html 이동
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // 현재 중앙에 있는 카드 인덱스 상태 (sfImg가 기본인 2번 인덱스)
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

  // ✅ 카드 클릭 시 액션 처리 함수: 요청하신 index 번호에 맞춰 경로를 수정했습니다.
  const handleCardClick = (id: number) => {
    const basePath = "/pages";

    if (id === 1) {
      window.location.href = `${basePath}/index4.html`;
    } else if (id === 2) {
      // 🚀 id 2번 클릭 시 index5.html로 이동
      window.location.href = `${basePath}/index5.html`;
    } else if (id === 3) {
      // 🚀 id 3번 클릭 시 index6.html로 이동
      window.location.href = `${basePath}/index6.html`;
    } else if (id === 4) {
      // id 4번은 특정 섹션으로 스크롤 이동
      const targetSection = document.getElementById('sf-design-work');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (id === 5) {
      // 🚀 id 5번 클릭 시 index7.html로 이동
      window.location.href = `${basePath}/index7.html`;
    }
  };

  // 모바일 드래그 완료 시 실행
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

      {/* Background Text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full select-none pointer-events-none z-0">
        <motion.h1
          style={{ y, opacity }}
          className="text-[15vw] md:text-[20vw] font-bold text-gray-50 text-center tracking-tighter leading-none"
        >
          CHAMSF
        </motion.h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tight text-black mb-12"
        >
          We design the future
        </motion.h1>

        {/* Stacked Cards */}
        <div
          className="relative h-[300px] md:h-[500px] w-full flex justify-center items-center perspective-1000 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
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
                onClick={() => {
                  if (offsetIndex === 0) {
                    handleCardClick(card.id);
                  } else {
                    setCurrentIndex(index);
                  }
                }}
                drag={isMobile ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                initial={{ rotate: 0, x: 0, y: 0, scale: 0.5, opacity: 0 }}
                animate={{
                  rotate: isHovered ? offsetIndex * 12 : dynamicRotate,
                  x: offsetIndex * currentSpread,
                  y: baseY,
                  scale: isHovered ? (offsetIndex === 0 ? 1.15 : 1.1) : dynamicScale,
                  opacity: 1,
                  zIndex: 50 - Math.abs(offsetIndex) * 10 
                }}
                whileHover={!isMobile ? {
                  scale: 1.2,
                  zIndex: 100,
                  y: baseY - 30,
                  transition: { duration: 0.2 }
                } : {}}
                transition={{
                  duration: 0.5,
                  delay: isHovered ? index * 0.05 : 0,
                  type: "spring",
                  stiffness: 120,
                  damping: 20
                }}
                className="absolute w-48 md:w-72 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white"
              >
                <img
                  src={card.src}
                  alt={`Portfolio ${card.id}`}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-14 md:mt-22 text-lg md:text-xl font-medium text-gray-900 max-w-xl mx-auto"
        >
          Innovative Design for Better User Experience
        </motion.p>
      </div>
    </section>
  );
}
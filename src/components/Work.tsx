import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: "Package Design", category: "Branding", src: "/img/packageone.png", size: "large" },
  { id: 2, title: "SNS Contents", category: "E-Commerce", src: "/img/snscon.png", size: "small" },
  { id: 3, title: "Editorial Design", category: "Printing", src: "/img/editorialone.png", size: "small" },
  { id: 4, title: "Promo Video", category: "Video", src: "/videos/promo.mp4", size: "wide" }
];

export default function Work() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => console.warn("자동 재생 차단됨"));
    }
  }, []);

  const handleProjectClick = (id: number) => {
    const basePath = "/pages";
    if (id === 1) window.location.href = `${basePath}/index.html`;
    else if (id === 2) window.location.href = `${basePath}/index2.html`;
    else if (id === 3) window.location.href = `${basePath}/index3.html`;
  };

  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <motion.h2
            id="sf-design-work"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight"
            style={{ fontFamily: "'GmarketSans', sans-serif" }}
          >
            참조은SF Design Work
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              // ✅ 수정 포인트: 4번 프로젝트(Promo Video)에 스크롤 목적지 ID를 부여합니다.
              id={project.id === 4 ? "promo-video" : undefined}
              onClick={() => handleProjectClick(project.id)}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className={`group cursor-pointer ${
                project.size === 'wide' ? 'md:col-span-2' :
                project.id === 3 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : ''
              }`}
            >
              <div className={`relative overflow-hidden rounded-2xl mb-4 ${
                project.id === 4 ? 'aspect-[16/9]' : 'aspect-[4/3] md:aspect-[16/10]'
              }`}>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10 duration-500" />
                {project.id === 4 ? (
                  <video
                    ref={videoRef}
                    src={project.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover transform scale-[1.03] group-hover:scale-[1.08] transition-transform duration-700 ease-out"
                  />
                ) : (
                  <img src={project.src} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                )}
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                <span className="text-gray-500 text-sm border border-gray-200 px-3 py-1 rounded-full group-hover:border-orange-500 group-hover:text-orange-500 transition-colors">
                  {project.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
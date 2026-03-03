import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

// ✅ 이미지 import: src/img 폴더 내에 해당 파일들이 있는지 확인해 주세요.
import packageOne from '../img/packageone.png';
import snsconImg from '../img/snscon.png';
import editorialImg from '../img/editorialone.png';

const PROJECTS = [
  // 💡 id 1번의 category가 "Branding"입니다.
  { id: 1, title: "Package Design", category: "Branding", src: packageOne, size: "large" },
  { id: 2, title: "SNS Contents", category: "E-Commerce", src: snsconImg, size: "small" },
  { id: 3, title: "Editorial Design", category: "Printing", src: editorialImg, size: "small" },
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

  // ✅ 클릭 핸들러: Branding(id 1) 클릭 시 index.html로 이동하도록 설정
  const handleProjectClick = (id: number) => {
    const basePath = "/pages";
    
    // 1번 카드(Branding 카테고리 포함) 클릭 시 index.html로 이동합니다.
    if (id === 1) {
      window.location.href = `${basePath}/index.html`;
    } 
    else if (id === 2) {
      window.location.href = `${basePath}/index2.html`;
    } 
    else if (id === 3) {
      window.location.href = `${basePath}/index3.html`;
    }
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
              id={project.id === 4 ? "promo-video" : undefined}
              // 💡 카드 전체에 클릭 이벤트가 걸려 있어 "Branding" 글자를 눌러도 실행됩니다.
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

                {project.id <= 3 && (
                  <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white rounded-full px-4 py-2 shadow-md">
                    <span className="text-sm font-bold text-gray-900">CLICK</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-semibold">{project.title}</h3>
                {/* 💡 이 부분이 "Branding" 아이콘/라벨 역할을 합니다. */}
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
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export default function Footer() {
  // ✅ 최상단으로 부드럽게 이동하는 함수
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#111] text-white py-16 rounded-t-[3rem] mt-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <div className="max-w-3xl mb-10">
          {/* 메인 타이틀 섹션 */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight"
          >
            ChamjoeunSF Design <br />
            {/* ✅ 부모(4xl/6xl)보다 딱 1단계 작은 3xl/5xl 적용 */}
            <span className="text-gray-500 text-3xl md:text-5xl block mt-2">
              Dessert & Bakery
            </span>
          </motion.h2>

          {/* 상단 이동 버튼 */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-orange-600 transition-colors inline-flex items-center gap-2 mb-8 cursor-pointer"
          >
            Return to Top <ArrowRight className="w-5 h-5" />
          </motion.button>

          {/* 하단 설명 문구 */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl text-gray-400 mx-auto mb-8"
          >
            {/* 👇 여기에 <br /> 태그를 추가하여 줄바꿈을 적용했습니다 */}
            With the heart of a mother caring for her family, <br />
            Chamsf begins with honesty and trust.
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
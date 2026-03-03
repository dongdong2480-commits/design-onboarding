import { motion } from 'motion/react';

export default function About() {
  return (
    <section id="agency" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* 좌측: 헤딩 섹션 */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8 text-center md:text-left"
              style={{ fontFamily: "'GmarketSans', sans-serif" }}
            >
              참조은SF <br />
              <span className="text-orange-500">DESIGN</span> Direction <br />
              디자인 방향
            </motion.h2>
          </div>

          {/* 우측: 설명 및 핵심 가치 그리드 */}
          <div>
            {/* 전체 텍스트 스타일을 text-gray-800과 font-bold로 통일 */}
            <motion.p
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-xl text-gray-500 leading-relaxed mb-12 text-center md:text-left font-light"
              style={{ fontFamily: "'GmarketSans', sans-serif" }}
            >
              참조은SF의 디자인은 제품 본연의 가치를 시각적으로 극대화하는
              '먹음직스러움(Delish)', 품질에 대한 엄격한 기준을 시각화하여 전달하는
              '신뢰(Trust)', 그리고 빠르게 변화하는 시장의 흐름을 선도하는
              '트렌디함(Trendy)'을 3대 핵심 지향점으로 삼아 브랜드의 차별화된 가치를 창출합니다.
            </motion.p>

            {/* 핵심 가치 지표 섹션: h3 타이틀도 동일한 text-gray-800 적용 */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-10%" }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-4"
              style={{ fontFamily: "'GmarketSans', sans-serif" }}
            >
              {/* 항목 1 */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">DELISH</h3>
                <p className="text-gray-500">먹음직스러움</p>
              </div>

              {/* 항목 2 */}
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">TRUST</h3>
                <p className="text-gray-500">신뢰</p>
              </div>

              {/* 항목 3 (모바일 중앙 배치) */}
              <div className="col-span-2 md:col-span-1 text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-2 text-gray-800">TRENDY</h3>
                <p className="text-gray-500">트렌디함</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
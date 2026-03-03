import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ✅ 스크롤 감지: 배경색 변경을 위해 50px 이상 스크롤 시 상태 변경
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ 메뉴 링크 설정
  const menuLinks: Record<string, string> = {
    'Package': '/pages/index.html',
    'SNS': '/pages/index2.html',
    'Editorial': '/pages/index3.html',
    'Schoolfood': '#promo-video' // 💡 Work.tsx의 Promo Video ID와 연결됩니다.
  };

  const menuItems = ['Package', 'SNS', 'Editorial', 'Schoolfood'];

  // ✅ 클릭 핸들러: Schoolfood인 경우만 섹션 이동 실행
  const handleNavClick = (e: React.MouseEvent, item: string) => {
    if (item === 'Schoolfood') {
      e.preventDefault(); // 기본 링크 이동 막기
      scrollToSection('promo-video');
    } else {
      setIsMobileMenuOpen(false); // 일반 링크는 이동 시 메뉴 닫기
    }
  };

  // ✅ 부드러운 스크롤 함수: 네비바 높이를 고려하여 중앙에 위치하도록 계산
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      // 요소를 화면 중앙 근처에 배치하기 위한 오프셋 계산
      const verticalCenterOffset = (windowHeight - navbarHeight - elementRect.height) / 2;
      const finalScrollTop = absoluteElementTop - navbarHeight - (verticalCenterOffset > 0 ? verticalCenterOffset : 20);

      window.scrollTo({
        top: finalScrollTop,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false); // 이동 후 모바일 메뉴 닫기
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* ✅ 로고: public/img/chamlogo.png 경로 사용 */}
        <a href="/" className="flex items-center">
          <img src="/img/chamlogo.png" alt="Logo" className="h-11 w-auto" />
        </a>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href={menuLinks[item]}
              onClick={(e) => handleNavClick(e, item)}
              className={`text-sm font-medium hover:text-orange-500 transition-colors cursor-pointer ${
                isScrolled ? 'text-gray-900' : 'text-gray-800'
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* 모바일 토글 버튼 */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 모바일 메뉴창 */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-gray-100 p-6 md:hidden flex flex-col gap-4 shadow-xl"
        >
          {menuItems.map((item) => (
            <a
              key={item}
              href={menuLinks[item]}
              onClick={(e) => handleNavClick(e, item)}
              className="text-lg font-medium cursor-pointer hover:text-orange-500"
            >
              {item}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
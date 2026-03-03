import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

// ✅ 로고 이미지 경로 (프로젝트 구조에 맞게 수정됨)
import logo from '../img/chamlogo.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // 스크롤 감지: 네비게이션 바 배경 전환용
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ✅ 1. 각 메뉴 항목이 이동할 정확한 경로 정의
  // 'Package' 클릭 시 public/pages/index.html로 이동하도록 설정했습니다.
  const menuLinks: Record<string, string> = {
    'Package': '/pages/index.html',
    'SNS': '/pages/index2.html',
    'Editorial': '/pages/index3.html',
    'Schoolfood': '#promo-video' // 페이지 내 섹션 이동
  };

  // ✅ 2. 클릭 핸들러
  const handleNavClick = (e: React.MouseEvent, item: string) => {
    if (item === 'Schoolfood') {
      e.preventDefault(); // 부드러운 스크롤을 위해 기본 이동 방지
      scrollToSection('promo-video');
    } else {
      // 일반 HTML 페이지로 이동할 때는 메뉴창만 닫아줌
      setIsMobileMenuOpen(false);
    }
  };

  // 부드러운 스크롤 로직 (Schoolfood 전용)
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 80;
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      const verticalCenterOffset = (windowHeight - navbarHeight - elementRect.height) / 2;
      const finalScrollTop = absoluteElementTop - navbarHeight - (verticalCenterOffset > 0 ? verticalCenterOffset : 20);

      window.scrollTo({
        top: finalScrollTop,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  const menuItems = ['Package', 'SNS', 'Editorial', 'Schoolfood'];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* 로고 영역: 클릭 시 메인으로 이동 */}
        <a href="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-11 w-auto" />
        </a>

        {/* 데스크탑 메뉴 */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item}
              href={menuLinks[item]}
              onClick={(e) => handleNavClick(e, item)}
              className="text-sm font-medium hover:text-orange-500 transition-colors cursor-pointer"
            >
              {item}
            </a>
          ))}
        </div>

        {/* 모바일 메뉴 토글 버튼 */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* 모바일 메뉴 리스트 */}
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
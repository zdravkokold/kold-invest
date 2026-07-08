import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navItems = [
  { to: '/', label: 'НАЧАЛО' },
  { to: '/цени', label: 'ЦЕНИ' },
  { to: '/блог', label: 'БЛОГ' },
  { to: '/за-нас', label: 'ЗА НАС' },
  { to: '/контакти', label: 'КОНТАКТИ' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navBg = isHome
    ? scrolled
      ? 'bg-navy-900/95 navbar-scrolled shadow-lg'
      : 'bg-transparent'
    : 'bg-navy-900 shadow-lg';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      {/* Top bar */}
      <div className="hidden lg:block border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-1.5 flex justify-end items-center gap-6">
          <a href="tel:0886742381" className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors">
            <Phone size={12} />
            0886 742 381
          </a>
          <a href="tel:075121237" className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors">
            <Phone size={12} />
            0751 21 237
          </a>
          <a href="mailto:kold_invest@abv.bg" className="text-white/70 hover:text-white text-xs transition-colors">
            kold_invest@abv.bg
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0">
<<<<<<< HEAD
            <img
              src="/Kold_Invest_Logo.png"
              alt="КОЛД ИНВЕСТ ЕООД"
              className="h-12 w-auto object-contain mt-4 mb-4 brightness-0 invert"
            />
=======
            <div className="bg-white rounded-xl px-2 py-1 shadow-sm">
              <img
                src="/Kold_Invest_Logo.png"
                alt="КОЛД ИНВЕСТ ЕООД"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </div>
>>>>>>> 3955c4098e7262680f9a252823bbef8d61b332b0
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'text-skyblue-400 bg-white/10'
                      : 'text-white/85 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/контакти"
              className="ml-3 bg-crimson-600 hover:bg-crimson-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Свържете се
            </NavLink>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-navy-900/98 navbar-scrolled border-t border-white/10 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-skyblue-400 bg-white/10'
                    : 'text-white/85 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <a href="tel:0886742381" className="flex items-center gap-2 text-white/70 text-sm px-4 py-2">
              <Phone size={14} /> 0886 742 381
            </a>
            <a href="mailto:kold_invest@abv.bg" className="block text-white/70 text-sm px-4 py-2">
              kold_invest@abv.bg
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

import { NavLink } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, ChevronRight } from 'lucide-react';

const navItems = [
  { to: '/', label: 'Начало' },
  { to: '/цени', label: 'Цени' },
  { to: '/блог', label: 'Блог' },
  { to: '/за-нас', label: 'За нас' },
  { to: '/контакти', label: 'Контакти' },
];

const services = [
  'Счетоводно обслужване',
  'Правно обслужване',
  'Бизнес консултиране',
  'ИТ услуги',
];

const workingHours = [
  { day: 'Понеделник', hours: '09:00 – 17:00' },
  { day: 'Вторник', hours: '09:00 – 17:00' },
  { day: 'Сряда', hours: '09:00 – 17:00' },
  { day: 'Четвъртък', hours: '09:00 – 17:00' },
  { day: 'Петък', hours: '09:00 – 17:00' },
  { day: 'Събота', hours: 'Почивен ден', closed: true },
  { day: 'Неделя', hours: 'Почивен ден', closed: true },
];

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <NavLink to="/">
              <img
                src="/Kold_Invest_Logo.png"
                alt="КОЛД ИНВЕСТ ЕООД"
                className="h-16 w-auto object-contain mb-4 brightness-0 invert"
              />
            </NavLink>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Професионални счетоводни, правни и бизнес консултантски услуги с над 15 години опит на пазара.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-skyblue-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-skyblue-400 flex items-center justify-center transition-all duration-200 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-skyblue-400 mb-5">Навигация</h3>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className="flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-colors group"
                  >
                    <ChevronRight size={14} className="text-crimson-500 group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <h3 className="text-sm font-bold uppercase tracking-widest text-skyblue-400 mb-4 mt-8">Услуги</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-gray-400 text-sm">
                  <ChevronRight size={14} className="text-crimson-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-skyblue-400 mb-5">Контакти</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={16} className="text-crimson-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  2900, гр. Гоце Делчев<br />
                  ул. Пирин 1, вх.А, ет.1, ап.1
                </span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="text-crimson-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <a href="tel:0886742381" className="block text-gray-400 hover:text-white text-sm transition-colors">
                    0886 742 381
                  </a>
                  <a href="tel:075121237" className="block text-gray-400 hover:text-white text-sm transition-colors">
                    0751 21 237
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={16} className="text-crimson-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:kold_invest@abv.bg" className="text-gray-400 hover:text-white text-sm transition-colors">
                  kold_invest@abv.bg
                </a>
              </li>
            </ul>
          </div>

          {/* Working hours */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-skyblue-400 mb-5">
              <span className="flex items-center gap-2"><Clock size={14} /> Работно Време</span>
            </h3>
            <ul className="space-y-2">
              {workingHours.map((wh) => (
                <li key={wh.day} className="flex justify-between text-sm">
                  <span className={wh.closed ? 'text-gray-600' : 'text-gray-400'}>{wh.day}</span>
                  <span className={wh.closed ? 'text-gray-600 italic' : 'text-white font-medium'}>{wh.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} КОЛД ИНВЕСТ ЕООД. Всички права запазени.
          </p>
          <p className="text-gray-600 text-xs">
            Developed by Zdravko Koldzhiev
          </p>
        </div>
      </div>
    </footer>
  );
}

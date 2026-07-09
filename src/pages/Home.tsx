import { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChevronDown,
  BookOpen,
  Scale,
  TrendingUp,
  Monitor,
  ArrowRight,
  Quote,
  Users,
  Star,
} from 'lucide-react';

// ─── Stat counter hook (inline) ────────────────────────────────────────────
function useIntersectionCount(end: number, suffix = '', duration = 2200) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !triggered) setTriggered(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(end * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [triggered, end, duration]);

  return { count, ref, suffix };
}

// ─── Services data ─────────────────────────────────────────────────────────
const services = [
  {
    num: '01',
    icon: BookOpen,
    title: 'СЧЕТОВОДНО ОБСЛУЖВАНЕ',
    text: 'Пълно счетоводно обслужване на фирми от всички браншове на икономиката, включително търговия, производство и услуги. Счетоводно обслужване и консултации за физически лица, свързани с доходи, данъци и осигуровки. Предлагаме абонаментно счетоводно обслужване за дългосрочни нужди, както и еднократни услуги за конкретни задачи.',
    color: 'from-navy-700 to-navy-600',
    accent: 'bg-skyblue-400/20 text-skyblue-400',
  },
  {
    num: '02',
    icon: Scale,
    title: 'ПРАВНО ОБСЛУЖВАНЕ',
    text: 'Правно обслужване на фирми и физически лица в ключови области как Търговското, Облигационното, Данъчното и Осигурителното право. Помощ при изготвяне и преглед на договори, както и при правни спорове. Осигуряваме консултации, които целят защита на правата и интересите на клиентите.',
    color: 'from-crimson-700 to-crimson-600',
    accent: 'bg-crimson-400/20 text-crimson-400',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'БИЗНЕС КОНСУЛТИРАНЕ',
    text: 'Извършване на задълбочени бизнес анализи и консултации, които да подпомогнат растежа и устойчивостта на вашия бизнес. Изготвяне на подробни бизнес планове и проекти за стратегическо развитие. Предлагаме решения за управление на ресурсите и оптимизиране на процесите.',
    color: 'from-skyblue-600 to-skyblue-500',
    accent: 'bg-navy-400/20 text-navy-300',
  },
  {
    num: '04',
    icon: Monitor,
    title: 'ИТ УСЛУГИ',
    text: 'Направа на професионални уеб сайтове и икономически софтуер, адаптиран към нуждите на вашия бизнес. Предлагаме услуги със скенери, принтери, факсове и мобилни устройства за вашето удобство.',
    color: 'from-navy-800 to-navy-700',
    accent: 'bg-skyblue-400/20 text-skyblue-400',
  },
];

// ─── Team data ──────────────────────────────────────────────────────────────
const team = [
  { name: 'ЛЮБОМИР КОЛДЖИЕВ', role: 'Управител', image: '/любомир.jpg' },
  { name: 'ВИОЛЕТА КОЛДЖИЕВА', role: 'Мениджър – ВИП клиенти', image: '/виолета.png' },
  { name: 'РУМЯНА ТОДОРОВА', role: 'Счетоводител', image: '/румяна.png' },
  { name: 'ХАВА АЛИМ', role: 'Счетоводител', image: '/хава.png' },
  { name: 'СЕЛИМ АДЕМ', role: 'Счетоводител', image: '/селим.png' },
  { name: 'ИБРИМ КОЛДЖИЕВ', role: 'Данъчен Консултант', image: '/ибрим.jpg' },
  { name: 'ЕМИНЕ ЛАВЧИЕВА', role: 'Счетоводител', image: '/емине.png' },
];

// ─── Principles data ────────────────────────────────────────────────────────
const principles = [
  {
    title: 'МОРАЛ',
    quote: 'Когато наемате счетоводител фокусирайте се върху три неща – интелект, енергия и морал, ако морала го няма не обръщайте внимание на другите две.',
    author: 'Уорън Бъфет',
    role: 'Инвеститор №1 в света',
    icon: Star,
    color: 'border-navy-500',
    accent: 'text-navy-600',
  },
  {
    title: 'РАЗВИТИЕ',
    quote: 'Човек винаги трябва да се стреми да подобрява своите умения, да облагородява своите навици и да преценява отново старите си преценки.',
    author: 'Махатма Ганди',
    role: 'Нобелов лауреат за мир',
    icon: TrendingUp,
    color: 'border-crimson-500',
    accent: 'text-crimson-600',
  },
  {
    title: 'БАЛАНС',
    quote: 'Успеха се състои в това да се намери баланса между всички фрагменти от човешкият живот.',
    author: 'Левон Хампарцумян',
    role: 'Банкер №1 в България',
    icon: Scale,
    color: 'border-skyblue-500',
    accent: 'text-skyblue-500',
  },
];

// ─── Stat card component ────────────────────────────────────────────────────
function StatCard({ end, label, prefix = '', suffix = '' }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const { count, ref } = useIntersectionCount(end);
  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
        {prefix}{count.toLocaleString('bg-BG')}{suffix}
      </div>
      <div className="text-skyblue-300 text-sm font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
}

// ─── Section reveal hook ────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Home() {
  const { ref: servicesRef, visible: servicesVisible } = useReveal();
  const { ref: teamRef, visible: teamVisible } = useReveal();
  const { ref: principlesRef, visible: principlesVisible } = useReveal();

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-skyblue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 mb-8">
            <div className="w-2 h-2 bg-skyblue-400 rounded-full animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Счетоводна Кантора · Гоце Делчев</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 text-balance">
            КОЛД ИНВЕСТ
            <br />
            <span className="text-skyblue-400">В УСЛУГА НА</span>
            <br />
            <span className="text-crimson-400">БИЗНЕСА И ХОРАТА</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Над 15 години професионален опит в счетоводство, право и бизнес консултации. Вашият надежден партньор за успех.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="btn-primary text-base px-8 py-4">
              Какво Предлагаме
              <ChevronDown size={18} />
            </a>
            <NavLink to="/контакти" className="btn-white text-base px-8 py-4">
              Свържете се с нас
              <ArrowRight size={18} />
            </NavLink>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">Какво предлагаме</span>
            <h2 className="section-title text-center">УСЛУГИ</h2>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.num}
                  className={`card p-8 group transition-all duration-500 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${s.accent}`}>{s.num}</span>
                        <h3 className="text-base font-bold text-navy-800 tracking-wide">{s.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────────── */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-skyblue-400/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-skyblue-400/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Дейността ни в цифри:</h2>
            <div className="w-12 h-1 bg-skyblue-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <StatCard end={15} suffix="+" label="Години на пазара" />
            <StatCard end={100} suffix="+" label="Клиента от 4 държави" />
            <StatCard end={500000} prefix="> " label="Обработени документи" />
            <StatCard end={10000} prefix="> " label="Подадени ДДС декларации" />
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">Хората зад успеха</span>
            <h2 className="section-title text-center uppercase">нашият екип</h2>
            <p className="section-subtitle mx-auto text-center">
              Нашият екип е съставен от мотивирани и високообразовани професионалисти
            </p>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>

          <div
            ref={teamRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`card p-6 text-center group hover:-translate-y-2 transition-all duration-500 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-navy-600 to-navy-800 flex items-center justify-center shadow-lg group-hover:shadow-navy-200 group-hover:shadow-xl transition-shadow duration-300">
                    <span className="text-white text-xl font-bold">{initials(member.name)}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-crimson-600 rounded-full flex items-center justify-center shadow-md">
                    <Users size={12} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wide mb-1 leading-tight">{member.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{member.role}</p>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-skyblue-500 hover:text-skyblue-600 text-xs font-medium transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={14} />
                  Facebook
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">
              Водещите принципи в нашата работа
            </span>
            <h2 className="section-title text-center uppercase">НАШИТЕ ПРИНЦИПИ</h2>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>

          <div
            ref={principlesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`card p-8 border-t-4 ${p.color} hover:-translate-y-2 transition-all duration-500 ${principlesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${p.accent}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className={`text-xl font-black tracking-widest uppercase ${p.accent}`}>{p.title}</h3>
                  </div>
                  <Quote size={32} className="text-gray-200 mb-3" />
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                    "{p.quote}"
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-navy-800 text-sm">{p.author}</p>
                    <p className="text-gray-500 text-xs">{p.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-16 gradient-crimson">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Готови ли сте да развиете своя бизнес?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Свържете се с нас за безплатна консултация и индивидуална ценова оферта.
          </p>
          <NavLink to="/цени" className="btn-white text-base px-8 py-4">
            Вземете оферта
            <ArrowRight size={18} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}

import { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ChevronDown,
  BookOpen,
  Scale,
  TrendingUp,
  Monitor,
  ArrowRight,
  Quote,
  Facebook,
  Users,
  Star,
} from 'lucide-react';

// ─── Stat counter hook (inline) ────────────────────────────────────────────
function useIntersectionCount(end: number, suffix = '', duration = 2200) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting && !triggered) setTriggered(true); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggered]);

  useEffect(() => {
    if (!triggered) return;
    let frame: number;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(end * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [triggered, end, duration]);

  return { count, ref, suffix };
}

// ─── Services data ─────────────────────────────────────────────────────────
const services = [
  {
    num: '01',
    icon: BookOpen,
    title: 'СЧЕТОВОДНО ОБСЛУЖВАНЕ',
    text: 'Пълно счетоводно обслужване на фирми от всички браншове на икономиката, включително търговия, производство и услуги. Счетоводно обслужване и консултации за физически лица, свързани с доходи, данъци и осигуровки. Предлагаме абонаментно счетоводно обслужване за дългосрочни нужди, както и еднократни услуги за конкретни задачи.',
    color: 'from-navy-700 to-navy-600',
    accent: 'bg-skyblue-400/20 text-skyblue-400',
  },
  {
    num: '02',
    icon: Scale,
    title: 'ПРАВНО ОБСЛУЖВАНЕ',
    text: 'Правно обслужване на фирми и физически лица в ключови области как Търговското, Облигационното, Данъчното и Осигурителното право. Помощ при изготвяне и преглед на договори, както и при правни спорове. Осигуряваме консултации, които целят защита на правата и интересите на клиентите.',
    color: 'from-crimson-700 to-crimson-600',
    accent: 'bg-crimson-400/20 text-crimson-400',
  },
  {
    num: '03',
    icon: TrendingUp,
    title: 'БИЗНЕС КОНСУЛТИРАНЕ',
    text: 'Извършване на задълбочени бизнес анализи и консултации, които да подпомогнат растежа и устойчивостта на вашия бизнес. Изготвяне на подробни бизнес планове и проекти за стратегическо развитие. Предлагаме решения за управление на ресурсите и оптимизиране на процесите.',
    color: 'from-skyblue-600 to-skyblue-500',
    accent: 'bg-navy-400/20 text-navy-300',
  },
  {
    num: '04',
    icon: Monitor,
    title: 'ИТ УСЛУГИ',
    text: 'Направа на професионални уеб сайтове и икономически софтуер, адаптиран към нуждите на вашия бизнес. Предлагаме услуги със скенери, принтери, факсове и мобилни устройства за вашето удобство.',
    color: 'from-navy-800 to-navy-700',
    accent: 'bg-skyblue-400/20 text-skyblue-400',
  },
];

// ─── Team data ──────────────────────────────────────────────────────────────
const team = [
  { name: 'ЛЮБОМИР КОЛДЖИЕВ', role: 'Управител' },
  { name: 'ВИОЛЕТА КОЛДЖИЕВА', role: 'Мениджър – ВИП клиенти' },
  { name: 'РУМЯНА ТОДОРОВА', role: 'Счетоводител' },
  { name: 'ХАВА АЛИМ', role: 'Счетоводител' },
  { name: 'СЕЛИМ АДЕМ', role: 'Счетоводител' },
  { name: 'ИБРИМ КОЛДЖИЕВ', role: 'Данъчен Консултант' },
  { name: 'ЕМИНЕ ЛАВЧИЕВА', role: 'Счетоводител' },
];

// ─── Principles data ────────────────────────────────────────────────────────
const principles = [
  {
    title: 'МОРАЛ',
    quote: 'Когато наемате счетоводител фокусирайте се върху три неща – интелект, енергия и морал, ако морала го няма не обръщайте внимание на другите две.',
    author: 'Уорън Бъфет',
    role: 'Инвеститор №1 в света',
    icon: Star,
    color: 'border-navy-500',
    accent: 'text-navy-600',
  },
  {
    title: 'РАЗВИТИЕ',
    quote: 'Човек винаги трябва да се стреми да подобрява своите умения, да облагородява своите навици и да преценява отново старите си преценки.',
    author: 'Махатма Ганди',
    role: 'Нобелов лауреат за мир',
    icon: TrendingUp,
    color: 'border-crimson-500',
    accent: 'text-crimson-600',
  },
  {
    title: 'БАЛАНС',
    quote: 'Успеха се състои в това да се намери баланса между всички фрагменти от човешкият живот.',
    author: 'Левон Хампарцумян',
    role: 'Банкер №1 в България',
    icon: Scale,
    color: 'border-skyblue-500',
    accent: 'text-skyblue-500',
  },
];

// ─── Avatar initials helper ─────────────────────────────────────────────────
function initials(name: string) {
  return name.split(' ').slice(0, 2).map((w) => w[0]).join('');
}

// ─── Stat card component ────────────────────────────────────────────────────
function StatCard({ end, label, prefix = '', suffix = '' }: { end: number; label: string; prefix?: string; suffix?: string }) {
  const { count, ref } = useIntersectionCount(end);
  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-4xl md:text-5xl font-black text-white mb-2 tabular-nums">
        {prefix}{count.toLocaleString('bg-BG')}{suffix}
      </div>
      <div className="text-skyblue-300 text-sm font-medium uppercase tracking-wide">{label}</div>
    </div>
  );
}

// ─── Section reveal hook ────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

export default function Home() {
  const { ref: servicesRef, visible: servicesVisible } = useReveal();
  const { ref: teamRef, visible: teamVisible } = useReveal();
  const { ref: principlesRef, visible: principlesVisible } = useReveal();

  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background geometric shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-skyblue-400/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-crimson-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-navy-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-6 text-balance">
            КОЛД ИНВЕСТ
            <br />
            <span className="text-skyblue-400">В УСЛУГА НА</span>
            <br />
            <span className="text-crimson-400">БИЗНЕСА И ХОРАТА</span>
          </h1>

          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Над 19 години професионален опит в счетоводство, право и бизнес консултации. Вашият надежден партньор за успех.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#services" className="btn-primary text-base px-8 py-4">
              Какво Предлагаме
              <ChevronDown size={18} />
            </a>
            <NavLink to="/контакти" className="btn-white text-base px-8 py-4">
              Свържете се с нас
              <ArrowRight size={18} />
            </NavLink>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#services" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white/80 transition-colors animate-bounce">
          <ChevronDown size={28} />
        </a>
      </section>

      {/* ─── SERVICES ────────────────────────────────────────────── */}
      <section id="services" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">Какво предлагаме</span>
            <h2 className="section-title text-center">УСЛУГИ</h2>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>

          <div
            ref={servicesRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`card p-8 group transition-all duration-500 ${servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={24} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-base font-bold text-navy-800 tracking-wide">{s.title}</h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS ───────────────────────────────────────────────── */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-skyblue-400/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-skyblue-400/40 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Дейността ни в цифри:</h2>
            <div className="w-12 h-1 bg-skyblue-400 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
            <StatCard end={19} suffix="+" label="Години на пазара" />
            <StatCard end={80} suffix="+" label="Клиента от 4 държави" />
            <StatCard end={500000} prefix="> " label="Обработени документи" />
            <StatCard end={10000} prefix="> " label="Подадени ДДС декларации" />
          </div>
        </div>
      </section>

      {/* ─── TEAM ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">Хората зад успеха</span>
            <h2 className="section-title text-center uppercase">нашият екип</h2>
            <p className="section-subtitle mx-auto text-center">
              Нашият екип е съставен от мотивирани и високообразовани професионалисти
            </p>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>

          <div
            ref={teamRef}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {team.map((member, i) => (
              <div
                key={member.name}
                className={`card p-6 text-center group hover:-translate-y-2 transition-all duration-500 ${teamVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                {/* Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-white group-hover:shadow-navy-200 group-hover:shadow-xl transition-shadow duration-300"
                  />
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-crimson-600 rounded-full flex items-center justify-center shadow-md">
                    <Users size={12} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xs font-bold text-navy-800 uppercase tracking-wide mb-1 leading-tight">{member.name}</h3>
                <p className="text-gray-500 text-xs mb-4">{member.role}</p>                
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRINCIPLES ──────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">
              Водещите принципи в нашата работа
            </span>
            <h2 className="section-title text-center uppercase">НАШИТЕ ПРИНЦИПИ</h2>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>

          <div
            ref={principlesRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {principles.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className={`card p-8 border-t-4 ${p.color} hover:-translate-y-2 transition-all duration-500 ${principlesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center ${p.accent}`}>
                      <Icon size={20} />
                    </div>
                    <h3 className={`text-xl font-black tracking-widest uppercase ${p.accent}`}>{p.title}</h3>
                  </div>
                  <Quote size={32} className="text-gray-200 mb-3" />
                  <p className="text-gray-700 text-sm leading-relaxed mb-6 italic">
                    "{p.quote}"
                  </p>
                  <div className="border-t border-gray-100 pt-4">
                    <p className="font-bold text-navy-800 text-sm">{p.author}</p>
                    <p className="text-gray-500 text-xs">{p.role}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ──────────────────────────────────────────── */}
      <section className="py-16 gradient-crimson">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Готови ли сте да развиете своя бизнес?
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            Свържете се с нас за безплатна консултация и индивидуална ценова оферта.
          </p>
          <NavLink to="/цени" className="btn-white text-base px-8 py-4">
            Вземете оферта
            <ArrowRight size={18} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}

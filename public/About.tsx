
import { NavLink } from 'react-router-dom';
import { useState, useRef } from 'react';
import {
  Target,
  Shield,
  Lightbulb,
  Users,
  Cpu,
  Lock,
  Zap,
  ArrowRight,
  Calendar,
  Play,
  Image,
} from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Доверие',
    desc: 'Изграждаме дългосрочни партньорства, основани на честност и коректност.',
    color: 'bg-navy-600',
  },
  {
    icon: Users,
    title: 'Експертиза',
    desc: 'Разчитаме на професионализъм и дългогодишен опит, за да предоставяме най-добрите решения.',
    color: 'bg-skyblue-500',
  },
  {
    icon: Target,
    title: 'Отговорност',
    desc: 'Поемаме ангажимент към клиентите си, бизнеса и обществото.',
    color: 'bg-crimson-600',
  },
  {
    icon: Cpu,
    title: 'Технологии',
    desc: 'Внедряваме иновации за по-ефективно управление на процесите.',
    color: 'bg-navy-500',
  },
  {
    icon: Lock,
    title: 'Сигурност',
    desc: 'Гарантираме поверителност и защита на информацията.',
    color: 'bg-skyblue-600',
  },
  {
    icon: Zap,
    title: 'Иновации',
    desc: 'Стремим се към развитие и подобряване на услугите си.',
    color: 'bg-crimson-500',
  },
];

const milestones = [
  { year: '2007', event: 'Основаване на КОЛД ИНВЕСТ ЕООД от Любомир Колджиев на 1 март.' },
  { year: '2010', event: 'Разширяване на екипа и увеличаване на клиентската база.' },
  { year: '2015', event: 'Навлизане на международния пазар – обслужване на клиенти от 4 държави.' },
  { year: '2020', event: 'Дигитализация на процесите и въвеждане на онлайн услуги.' },
  { year: '2026', event: 'Над 80 клиента, 500 000+ обработени документа и 15+ години опит.' },
];

const officeImages = [
  '/главна.jpg',
  '/офис.jpg',
  '/архив.jpg',
];

export default function About() {
const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log("Видео блогнат достъп:", err));
      setIsPlaying(true);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header text-center">
        <div className="max-w-3xl mx-auto mt-20">
          <span className="inline-block text-skyblue-300 text-sm font-bold uppercase tracking-widest mb-3">
            Кои сме ние
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-5">За нас</h1>
          <p className="text-white/75 text-lg">
            Научете повече за историята, мисията и ценностите на КОЛД ИНВЕСТ ЕООД.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">
                <Target className="inline mb-0.5 mr-1" size={14} />
                Нашата мисия
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-navy-800 mb-6 leading-tight">
                Вашият надежден<br />
                <span className="text-crimson-600">партньор за успех</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Мисията на <strong className="text-navy-700">КОЛД ИНВЕСТ ЕООД</strong> е да подкрепя своите клиенти в справянето с бюрократичните предизвикателства и развитието на техния бизнес, предоставяйки надеждни и ефективни решения.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-navy-50 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 bg-navy-600 rounded-lg flex items-center justify-center">
                    <Calendar size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Основана</div>
                    <div className="text-sm font-bold text-navy-800">01 Март 2007</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-crimson-50 rounded-xl px-4 py-3">
                  <div className="w-8 h-8 bg-crimson-600 rounded-lg flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Клиенти</div>
                    <div className="text-sm font-bold text-navy-800">100+ от 4 държави</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/екип.jpg"
                  alt="Нашата мисия"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold">КОЛД ИНВЕСТ ЕООД</p>
                  <p className="text-white/70 text-sm">гр. Гоце Делчев</p>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-crimson-600 rounded-3xl -z-10 opacity-20" />
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-skyblue-400 rounded-3xl -z-10 opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">Нашата философия</span>
            <h2 className="section-title text-center">Нашите ценности</h2>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="card p-7 group hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className={`w-12 h-12 ${v.color} rounded-2xl flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-800 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="inline-block text-crimson-600 text-sm font-bold uppercase tracking-widest mb-3">
              <Calendar className="inline mb-0.5 mr-1" size={14} />
              Развитие
            </span>
            <h2 className="section-title text-center">Фирмена история</h2>
            <div className="w-16 h-1 bg-crimson-600 mx-auto rounded-full mb-8" />
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">
              КОЛД ИНВЕСТ ЕООД е основана на 1 март 2007 г. от Любомир Колджиев. През годините фирмата разширява своя екип, увеличава броя на клиентите, обслужваните фирми и обработените документи. Въпреки растежа, ние винаги сме запазвали своята фирмена култура и ценности, които ни отличават от конкурентите. Нашата основна философия се гради върху етично поведение в интерес на клиентите и удовлетворяване на техните потребности. В същото време се стремим към баланс между клиентските нужди, нашите собствени ценности и отговорността ни към обществото.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-navy-600 via-crimson-500 to-skyblue-400" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div key={m.year} className="relative flex gap-6 items-start pl-20">
                  <div className={`absolute left-4 w-8 h-8 rounded-full flex items-center justify-center shadow-lg text-xs font-bold text-white ${
                    i % 3 === 0 ? 'bg-navy-600' : i % 3 === 1 ? 'bg-crimson-600' : 'bg-skyblue-500'
                  }`}>
                    {(i + 1).toString()}
                  </div>
                  <div className="card p-5 flex-1 hover:shadow-lg transition-shadow">
                    <div className="text-lg font-black text-navy-700 mb-1">{m.year}</div>
                    <p className="text-gray-600 text-sm">{m.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Office + Video */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Office images */}
            <div>
              <h3 className="text-xl font-bold text-navy-800 mb-2 flex items-center gap-2">
                <Image size={18} className="text-crimson-600" />
                Нашият Офис
              </h3>
              <div className="w-10 h-1 bg-crimson-600 rounded-full mb-6" />
              <div className="grid grid-cols-2 gap-3">
                {officeImages.map((src, i) => (
                  <div key={i} className={`relative overflow-hidden rounded-2xl shadow-md ${i === 0 ? 'row-span-2 col-span-1' : ''}`}>
                    <img
                      src={src}
                      alt={`Офис снимка ${i + 1}`}
                      className={`w-full object-cover hover:scale-105 transition-transform duration-500 ${i === 0 ? 'h-64' : 'h-28'}`}
                    />
                    <div className="absolute inset-0 bg-navy-900/20 hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            </div>

            {/* Video placeholder */}
            <div>
              <h3 className="text-xl font-bold text-navy-800 mb-2 flex items-center gap-2">
                <Play size={18} className="text-crimson-600" />
                Нашата видеовизитка
              </h3>
              <div className="w-10 h-1 bg-crimson-600 rounded-full mb-6" />
              <div className="relative rounded-2xl overflow-hidden bg-navy-900 aspect-video shadow-xl group cursor-pointer">
                {/* Използваме <video> вместо <img> за видео файлове! */}
                <video
                  src="/видеовизитка.mp4"
                  poster="/главна.jpg" // Снимка, която се вижда преди да се пусне видеото
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-40 transition-opacity"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xl border-2 border-white/30">
                    <Play size={32} className="text-white ml-1" />
                  </div>
                  <p className="text-white font-semibold text-lg">КОЛД ИНВЕСТ ЕООД</p>
                  <p className="text-white/70 text-sm">Видеовизитка</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 gradient-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-5 py-2 mb-6">
            <span className="text-skyblue-300 text-sm font-bold">БЕЗПЛАТНО</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Изпрати запитване
          </h2>
          <p className="text-white/75 text-lg mb-8">
            За да Ви направим индивидуална ценова оферта, моля, изпратете ни запитване.
          </p>
          <NavLink to="/цени" className="btn-white text-base px-8 py-4">
            Изпрати запитване
            <ArrowRight size={18} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}

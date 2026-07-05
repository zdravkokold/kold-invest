import { useState } from 'react';
import { BookOpen, Clock, Tag, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const articles = [
  {
    id: 1,
    title: 'Спечелен европейски проект….',
    category: 'Новини',
    excerpt: 'Разберете как нашите клиенти успешно спечелиха финансиране по европейски програми с наша помощ и какви стъпки са необходими за успешно кандидатстване.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 мин',
    date: '15 Март 2024',
    color: 'from-navy-600 to-navy-800',
  },
  {
    id: 2,
    title: 'Що е то СУПТО ???',
    category: 'Данъчно право',
    excerpt: 'Подробно обяснение на Системата за управление на продажбите в търговски обект (СУПТО) – задължения, изисквания и как да се подготвите.',
    image: 'https://images.pexels.com/photos/6863245/pexels-photo-6863245.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '7 мин',
    date: '02 Февруари 2024',
    color: 'from-crimson-600 to-crimson-800',
  },
  {
    id: 3,
    title: 'Големите 4 – Най влиятелните счетоводни компании в света + 1 прохождаща…',
    category: 'Индустрия',
    excerpt: 'Кои са Deloitte, PwC, EY и KPMG и как малките регионални кантори като нас могат да се конкурират успешно с тях на местния пазар.',
    image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '10 мин',
    date: '18 Януари 2024',
    color: 'from-skyblue-500 to-skyblue-700',
  },
  {
    id: 4,
    title: 'Как да получа Осигурителен номер в Англия…?',
    category: 'Международно',
    excerpt: 'Стъпка по стъпка ръководство за получаване на National Insurance Number (NIN) в Обединеното кралство за български граждани.',
    image: 'https://images.pexels.com/photos/672532/pexels-photo-672532.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 мин',
    date: '05 Декември 2023',
    color: 'from-navy-700 to-skyblue-600',
  },
  {
    id: 5,
    title: 'Пет психологически типа счетоводители…',
    category: 'Интересно',
    excerpt: 'Забавен и поучителен поглед върху различните личностни профили в счетоводната професия – разпознайте своя тип и на своя счетоводител.',
    image: 'https://images.pexels.com/photos/3771097/pexels-photo-3771097.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '4 мин',
    date: '22 Ноември 2023',
    color: 'from-crimson-500 to-navy-700',
  },
  {
    id: 6,
    title: 'Счетоводна къща или счетоводител на трудов договор…?',
    category: 'Съвети',
    excerpt: 'Предимствата и недостатъците на двата модела – кога е по-изгодно да ползвате аутсорсинг услуги и кога да назначите собствен счетоводител.',
    image: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '8 мин',
    date: '10 Октомври 2023',
    color: 'from-skyblue-600 to-navy-800',
  },
  {
    id: 7,
    title: 'От какво имам право да печеля без да плащам данъци?',
    category: 'Данъчно право',
    excerpt: 'Легалните начини за получаване на доходи без или с намалено данъчно облагане в България – всичко, което трябва да знаете.',
    image: 'https://images.pexels.com/photos/4386474/pexels-photo-4386474.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '9 мин',
    date: '28 Септември 2023',
    color: 'from-navy-600 to-crimson-700',
  },
  {
    id: 8,
    title: 'Задължения на фирми без дейност…',
    category: 'Счетоводство',
    excerpt: 'Дори неактивните фирми имат законови задължения. Разберете какви отчети трябва да подадете и как да избегнете глоби.',
    image: 'https://images.pexels.com/photos/6863183/pexels-photo-6863183.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '5 мин',
    date: '14 Август 2023',
    color: 'from-crimson-600 to-crimson-900',
  },
  {
    id: 9,
    title: 'Глоби по ДДС…',
    category: 'Данъчно право',
    excerpt: 'Какви са санкциите за нарушения на ЗДДС, как да ги избегнете и как да постъпите при вече получена глоба от НАП.',
    image: 'https://images.pexels.com/photos/5849578/pexels-photo-5849578.jpeg?auto=compress&cs=tinysrgb&w=800',
    readTime: '6 мин',
    date: '01 Юли 2023',
    color: 'from-navy-800 to-skyblue-700',
  },
];

const ITEMS_PER_PAGE = 6;

const categoryColors: Record<string, string> = {
  'Новини': 'bg-navy-100 text-navy-700',
  'Данъчно право': 'bg-crimson-100 text-crimson-700',
  'Индустрия': 'bg-skyblue-100 text-skyblue-700',
  'Международно': 'bg-purple-100 text-purple-700',
  'Интересно': 'bg-amber-100 text-amber-700',
  'Съвети': 'bg-green-100 text-green-700',
  'Счетоводство': 'bg-gray-100 text-gray-700',
};

export default function Blog() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const visible = articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div className="pt-28">
      {/* Page Header */}
      <section className="page-header text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-skyblue-300 text-sm font-bold uppercase tracking-widest mb-3">
            <BookOpen className="inline mb-0.5 mr-1" size={14} />
            Полезни статии
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-5">Блог</h1>
          <p className="text-white/75 text-lg">
            Актуална информация за счетоводство, данъчно право и бизнес консултации.
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visible.map((article) => (
              <article
                key={article.id}
                className="card overflow-hidden group hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${article.color} opacity-40`} />
                  {/* Category badge */}
                  <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1.5 rounded-full ${categoryColors[article.category] ?? 'bg-white/20 text-white'} backdrop-blur-sm`}>
                    <Tag size={10} className="inline mb-0.5 mr-1" />
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 text-gray-400 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Clock size={11} />
                      {article.readTime}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>
                  <h2 className="font-bold text-navy-800 text-base leading-snug mb-3 group-hover:text-navy-600 transition-colors line-clamp-2">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <button className="flex items-center gap-2 text-crimson-600 hover:text-crimson-700 text-sm font-semibold transition-colors group/btn">
                    Прочети
                    <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-14">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-navy-600 hover:border-navy-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-xl border font-semibold text-sm transition-all ${
                  p === page
                    ? 'bg-navy-600 border-navy-600 text-white shadow-md'
                    : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-navy-600 hover:border-navy-600 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

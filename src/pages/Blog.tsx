import { useState } from 'react';
import { Clock, Tag, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react';

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

const articleBodies: Record<number, string[]> = {
  1: [
    'Европейските програми могат да дадат силен тласък на малкия и средния бизнес, когато проектът е подготвен с ясна цел, реалистичен бюджет и точна документация.',
    'В този пример фокусът е върху предварителната подготовка: проверка на допустимостта, събиране на оферти, описание на инвестицията и аргументиране на очаквания ефект за фирмата.',
    'Най-честата причина добри идеи да не стигнат до финансиране е подценяването на административните детайли. Затова е важно проектът да се разглежда не само като формуляр, а като бизнес план с измерими резултати.',
  ],
  2: [
    'СУПТО е съкращение от система за управление на продажбите в търговски обект. Темата е важна за търговци, които използват софтуер за издаване, проследяване и управление на продажби.',
    'Добрата организация започва с яснота какви документи се издават, къде се съхраняват данните и как софтуерът комуникира с фискалното устройство.',
    'Преди избор или смяна на програма е разумно да се направи кратък преглед на процесите в обекта, защото техническото решение трябва да следва реалната работа, а не обратното.',
  ],
  3: [
    'Deloitte, PwC, EY и KPMG са познати като Големите 4, защото обслужват огромна част от международния пазар на одит, данъци и консултации.',
    'Техният мащаб е впечатляващ, но местните счетоводни къщи имат свое предимство: близък контакт, бърза реакция и познаване на конкретната регионална среда.',
    'За много фирми най-ценното не е огромна структура, а партньор, който разбира бизнеса им, следи сроковете и може да обясни сложното на човешки език.',
  ],
  4: [
    'National Insurance Number е идентификационен номер, необходим за работа и осигуряване в Обединеното кралство. За български граждани процесът изисква подготовка на лични данни и доказване на основание.',
    'Първата стъпка е да се провери актуалният ред за кандидатстване и какви документи се приемат. След това се попълва заявление и при нужда се провежда допълнителна проверка.',
    'Практичният съвет е да пазите копия от всички изпратени документи и кореспонденция, защото това улеснява проследяването на процедурата.',
  ],
  5: [
    'В счетоводството има различни стилове на работа: аналитичният, подреденият, комуникативният, предпазливият и технологично ориентираният специалист.',
    'Нито един тип не е сам по себе си най-добър. Силният екип комбинира различни качества: внимание към детайла, спокойствие под напрежение и умение да се говори ясно с клиента.',
    'Когато избирате счетоводител, търсете не само знания, а и стил на комуникация, който пасва на начина, по който управлявате бизнеса си.',
  ],
  6: [
    'Изборът между външна счетоводна къща и счетоводител на трудов договор зависи от обема работа, сложността на дейността и нуждата от постоянна вътрешна координация.',
    'Аутсорсингът често е по-гъвкав за малки и средни фирми, защото дава достъп до екип и опит без разходите за цял отдел.',
    'Вътрешният счетоводител може да е подходящ при големи операции, много документи и ежедневна нужда от присъствие. Най-доброто решение идва след реална оценка на процесите.',
  ],
  7: [
    'Въпросът за доходи с по-ниско или нулево данъчно облагане трябва винаги да се разглежда през закона, а не през слухове и обещания за лесни схеми.',
    'Има необлагаеми доходи, данъчни облекчения и законни режими, които могат да намалят тежестта, но всеки случай зависи от източника на дохода и статута на лицето.',
    'Най-сигурният подход е предварителна консултация, преди да се сключи договор или да се получи плащане, защото правилното планиране е по-евтино от поправянето на грешки.',
  ],
  8: [
    'Фирма без дейност не означава фирма без задължения. В много случаи остават ангажименти за декларации, годишно приключване или обявяване на обстоятелства.',
    'Собствениците често пропускат срокове, защото смятат, че липсата на приходи автоматично отменя отчетността. Това може да доведе до глоби и излишно напрежение.',
    'Добра практика е веднъж годишно да се проверява състоянието на дружеството и нужните документи, дори когато няма стопанска активност.',
  ],
  9: [
    'Глобите по ЗДДС обикновено са свързани със закъснели декларации, неточни данни, пропусната регистрация или неправилно документиране на сделки.',
    'Най-добрата защита е редовна комуникация със счетоводителя и навременно предоставяне на документи. ДДС сроковете са кратки и рядко прощават отлагане.',
    'Ако вече е получен акт или покана от НАП, важно е да се реагира бързо, да се прегледат фактите и да се подготви аргументиран отговор.',
  ],
};

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
  const [selectedArticle, setSelectedArticle] = useState<(typeof articles)[number] | null>(null);
  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const visible = articles.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div>
      {/* Page Header */}
      <section className="page-header text-center">
        <div className="max-w-3xl mx-auto mt-20">
          <span className="inline-block text-skyblue-300 text-sm font-bold uppercase tracking-widest mb-3">
<<<<<<< HEAD
=======
            <BookOpen className="inline mb-0.5 mr-1" size={14} />
>>>>>>> 3955c4098e7262680f9a252823bbef8d61b332b0
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
                  <button
                    type="button"
                    onClick={() => setSelectedArticle(article)}
                    className="flex items-center gap-2 text-crimson-600 hover:text-crimson-700 text-sm font-semibold transition-colors group/btn"
                  >
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

      {selectedArticle && (
        <div className="fixed inset-0 z-[60] bg-navy-950/70 backdrop-blur-sm px-4 py-6 md:py-10 overflow-y-auto">
          <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="relative h-56 md:h-72">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
              <div className={`absolute inset-0 bg-gradient-to-t ${selectedArticle.color} opacity-55`} />
              <button
                type="button"
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-navy-800 flex items-center justify-center shadow-lg transition-colors"
                aria-label="Затвори статията"
              >
                <X size={20} />
              </button>
              <div className="absolute left-6 right-6 bottom-6">
                <span className={`inline-flex items-center text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${categoryColors[selectedArticle.category] ?? 'bg-white/20 text-white'} backdrop-blur-sm`}>
                  <Tag size={10} className="mr-1" />
                  {selectedArticle.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>
            <div className="p-6 md:p-9">
              <div className="flex items-center gap-3 text-gray-400 text-xs mb-6">
                <span className="flex items-center gap-1">
                  <Clock size={11} />
                  {selectedArticle.readTime}
                </span>
                <span>·</span>
                <span>{selectedArticle.date}</span>
              </div>
              <div className="space-y-5 text-gray-700 leading-relaxed">
                <p className="text-lg text-navy-800 font-medium">{selectedArticle.excerpt}</p>
                {(articleBodies[selectedArticle.id] ?? []).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </article>
        </div>
      )}
    </div>
  );
}

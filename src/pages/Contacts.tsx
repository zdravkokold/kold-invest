import { useState, FormEvent } from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Linkedin, Send, CheckCircle, AlertCircle } from 'lucide-react';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpwzdvgq';

const workingHours = [
  { day: 'Понеделник', short: 'Пон', hours: '09:00 – 17:00', closed: false },
  { day: 'Вторник', short: 'Вто', hours: '09:00 – 17:00', closed: false },
  { day: 'Сряда', short: 'Сря', hours: '09:00 – 17:00', closed: false },
  { day: 'Четвъртък', short: 'Чет', hours: '09:00 – 17:00', closed: false },
  { day: 'Петък', short: 'Пет', hours: '09:00 – 17:00', closed: false },
  { day: 'Събота', short: 'Съб', hours: 'Почивен ден', closed: true },
  { day: 'Неделя', short: 'Нед', hours: 'Почивен ден', closed: true },
];

export default function Contacts() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Вашето име': form.name,
          'Вашият e-mail': form.email,
          'Относно': form.subject,
          'Вашето запитване': form.message,
        }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const today = new Date().getDay();
  const dayMap = [6, 0, 1, 2, 3, 4, 5];

  return (
<<<<<<< HEAD
    <div className="pt-28">
=======
    <div>
>>>>>>> 3955c4098e7262680f9a252823bbef8d61b332b0
      {/* Page Header */}
      <section className="page-header text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block text-skyblue-300 text-sm font-bold uppercase tracking-widest mb-3">
            Свържете се с нас
          </span>
          <h1 className="text-4xl md:text-5xl font-black mb-5">Контакти</h1>
          <p className="text-white/75 text-lg">
            Ние сме тук, за да помогнем. Свържете се с нас по удобен за Вас начин.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Left – contact info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Address */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-navy-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 mb-1">Адрес</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      2900, гр. Гоце Делчев<br />
                      ул. Пирин 1, вх.А, ет.1, ап.1
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-crimson-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Phone size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 mb-2">Телефон</h3>
                    <a href="tel:0886742381" className="block text-gray-600 hover:text-navy-700 text-sm font-medium transition-colors">
                      0886 742 381
                    </a>
                    <a href="tel:075121237" className="block text-gray-600 hover:text-navy-700 text-sm font-medium transition-colors">
                      0751 21 237
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-skyblue-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Mail size={22} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-navy-800 mb-1">Имейл</h3>
                    <a href="mailto:kold_invest@abv.bg" className="text-gray-600 hover:text-navy-700 text-sm font-medium transition-colors">
                      kold_invest@abv.bg
                    </a>
                  </div>
                </div>
              </div>

              {/* Working hours */}
              <div className="card p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 bg-navy-700 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Clock size={22} className="text-white" />
                  </div>
                  <h3 className="font-bold text-navy-800">Работно Време</h3>
                </div>
                <div className="space-y-2">
                  {workingHours.map((wh, i) => {
                    const isToday = dayMap[today] === i;
                    return (
                      <div
                        key={wh.day}
                        className={`flex justify-between items-center text-sm py-1.5 px-3 rounded-lg ${
                          isToday ? 'bg-navy-50 border border-navy-200' : ''
                        }`}
                      >
                        <span className={`font-medium ${wh.closed ? 'text-gray-400' : isToday ? 'text-navy-700' : 'text-gray-700'}`}>
                          {wh.short}
                          {isToday && <span className="ml-2 text-xs bg-navy-600 text-white px-1.5 py-0.5 rounded-full">Днес</span>}
                        </span>
                        <span className={`${wh.closed ? 'text-gray-400 italic' : isToday ? 'text-navy-700 font-semibold' : 'text-gray-600'}`}>
                          {wh.hours}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Social */}
              <div className="card p-6">
                <h3 className="font-bold text-navy-800 mb-4">Социални мрежи</h3>
                <div className="flex gap-3">
                  <a
<<<<<<< HEAD
                    href="https://www.facebook.com/kold1invest"
=======
                    href="https://facebook.com"
>>>>>>> 3955c4098e7262680f9a252823bbef8d61b332b0
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Facebook size={16} />
                    Facebook
                  </a>
                  <a
<<<<<<< HEAD
                    href="https://bg.linkedin.com/company/kold-invest-ltd."
=======
                    href="https://linkedin.com"
>>>>>>> 3955c4098e7262680f9a252823bbef8d61b332b0
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-sky-700 hover:bg-sky-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <Linkedin size={16} />
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>

            {/* Right – Contact form */}
            <div className="lg:col-span-3">
              <div className="card p-8 md:p-10 h-full">
                <h2 className="text-2xl font-bold text-navy-800 mb-2">Пишете ни</h2>
                <p className="text-gray-500 text-sm mb-8">Попълнете формата и ние ще се свържем с Вас в рамките на 24 часа.</p>

                {status === 'success' ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={40} className="text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-800 mb-3">Съобщението е изпратено!</h3>
                    <p className="text-gray-600 mb-8">Ще се свържем с Вас в рамките на 24 часа.</p>
                    <button onClick={() => setStatus('idle')} className="btn-primary">
                      Изпрати ново съобщение
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="label-text">Вашето име *</label>
                        <input
                          required
                          type="text"
                          className="input-field"
                          placeholder="Иван Иванов"
                          value={form.name}
                          onChange={set('name')}
                        />
                      </div>
                      <div>
                        <label className="label-text">Вашият e-mail *</label>
                        <input
                          required
                          type="email"
                          className="input-field"
                          placeholder="ivan@example.com"
                          value={form.email}
                          onChange={set('email')}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="label-text">Относно *</label>
                      <input
                        required
                        type="text"
                        className="input-field"
                        placeholder="Запитване за счетоводни услуги..."
                        value={form.subject}
                        onChange={set('subject')}
                      />
                    </div>
                    <div>
                      <label className="label-text">Вашето запитване *</label>
                      <textarea
                        required
                        rows={6}
                        className="input-field resize-none"
                        placeholder="Опишете подробно Вашето запитване..."
                        value={form.message}
                        onChange={set('message')}
                      />
                    </div>

                    {status === 'error' && (
                      <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                        <AlertCircle size={18} />
                        <span className="text-sm">Грешка при изпращане. Моля, опитайте отново.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className="w-full btn-primary justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'sending' ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Изпраща се...
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          Изпрати
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-72 bg-navy-900 relative overflow-hidden">
<<<<<<< HEAD
  {/* 1. Фоновата мрежа е преместена тук (най-отзад), за да не блокира кликовете */}
  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(255,255,255,0.03)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(255,255,255,0.03)_40px)]" />

  {/* 2. Основното съдържание */}
  <div className="absolute inset-0 flex items-center justify-center z-10">
    <div className="text-center">
      <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <MapPin size={28} className="text-skyblue-400" />
      </div>
      <p className="text-white font-semibold">гр. Гоце Делчев, ул. Пирин 1</p>
      <p className="text-white/60 text-sm mt-1">вх.А, ет.1, ап.1</p>
      
      {/* 3. Поправен линк, който търси точния адрес в Google Maps */}
      <a
        href="https://maps.app.goo.gl/4JAmKAXXgoLxvkNp8"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-skyblue-400 hover:text-skyblue-300 text-sm font-medium transition-colors cursor-pointer"
      >
        Отвори в Google Maps
      </a>
    </div>
  </div>
</section>
=======
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin size={28} className="text-skyblue-400" />
            </div>
            <p className="text-white font-semibold">гр. Гоце Делчев, ул. Пирин 1</p>
            <p className="text-white/60 text-sm mt-1">вх.А, ет.1, ап.1</p>
            <a
              href="https://maps.google.com/?q=Goce+Delchev+ul.+Pirin+1"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-skyblue-400 hover:text-skyblue-300 text-sm font-medium transition-colors"
            >
              Отвори в Google Maps
            </a>
          </div>
        </div>
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_39px,rgba(255,255,255,0.03)_40px),repeating-linear-gradient(90deg,transparent,transparent_39px,rgba(255,255,255,0.03)_40px)]" />
      </section>
>>>>>>> 3955c4098e7262680f9a252823bbef8d61b332b0
    </div>
  );
}

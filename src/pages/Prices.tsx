import { useState, FormEvent } from 'react';
import { NavLink } from 'react-router-dom';
import { Send, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

const FORM_ENDPOINT = 'https://formsubmit.co/ajax/kold_invest@abv.bg,zdravko.koldjiev@gmail.com';

type RadioValue = 'Да' | 'Не' | '';

interface FormData {
  companyName: string;
  eik: string;
  legalForm: string;
  email: string;
  activityType: string;
  foreignParticipation: RadioValue;
  subsidiaries: RadioValue;
  activityCheckboxes: string[];
  staffCount: string;
  invoiceCount: string;
  bankAccounts: string;
  cashRegisters: string;
  employeesLabor: string;
  commercialSites: string;
  stockInventory: RadioValue;
  warehouseProgram: RadioValue;
  servicesNeeded: string[];
  phone: string;
  notes: string;
}

const legalForms = [
  'ЕТ (Едноличен търговец)',
  'ЕООД',
  'ООД',
  'АД',
  'ЕАД',
  'КД',
  'СД',
  'Кооперация',
  'Физическо лице',
  'НПО/Сдружение',
  'Друго',
];

const mainActivityOptions = [
  'Регистрация по ЗДДС',
  'Сделки със страни от ЕО',
  'Сделки със страни извън ЕО',
  'Задължение за отчитане по МСФО',
];

const servicesOptions = [
  'Счетоводно обслужване',
  'Изготовление на индивидуални отчети по Ваша форма',
  'Обработка на заплати',
  'Издаване на фактури',
  'Консултации',
  'Онлайн банкиране',
];

function RadioGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: RadioValue;
  onChange: (v: RadioValue) => void;
}) {
  return (
    <div>
      <label className="label-text">{label}</label>
      <div className="flex gap-6 mt-1">
        {(['Да', 'Не'] as RadioValue[]).map((opt) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer">
            <div
              onClick={() => onChange(opt)}
              className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                value === opt
                  ? 'border-navy-600 bg-navy-600'
                  : 'border-gray-300 hover:border-navy-400'
              }`}
            >
              {value === opt && <div className="w-2 h-2 bg-white rounded-full" />}
            </div>
            <span className="text-sm text-gray-700 font-medium">{opt}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function CheckboxGroup({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: string[];
  values: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(values.includes(opt) ? values.filter((v) => v !== opt) : [...values, opt]);
  };
  return (
    <div>
      <label className="label-text">{label}</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
        {options.map((opt) => {
          const checked = values.includes(opt);
          return (
            <label key={opt} className="flex items-start gap-3 cursor-pointer group">
              <div
                onClick={() => toggle(opt)}
                className={`w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
                  checked
                    ? 'border-navy-600 bg-navy-600'
                    : 'border-gray-300 group-hover:border-navy-400'
                }`}
              >
                {checked && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                    <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
              <span className="text-sm text-gray-700">{opt}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default function Prices() {
  const [form, setForm] = useState<FormData>({
    companyName: '',
    eik: '',
    legalForm: '',
    email: '',
    activityType: '',
    foreignParticipation: '',
    subsidiaries: '',
    activityCheckboxes: [],
    staffCount: '',
    invoiceCount: '',
    bankAccounts: '',
    cashRegisters: '',
    employeesLabor: '',
    commercialSites: '',
    stockInventory: '',
    warehouseProgram: '',
    servicesNeeded: [],
    phone: '',
    notes: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const setField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const body: Record<string, string> = {
        _subject: `Запитване за цена: ${form.companyName || form.email}`,
        _template: 'table',
        _captcha: 'false',
        'Наименование на дружеството': form.companyName,
        'ЕИК или БУЛСТАТ': form.eik,
        'Правна форма': form.legalForm,
        'Имейл': form.email,
        'Вид дейност': form.activityType,
        'Чуждестранно участие': form.foreignParticipation,
        'Дъщерни дружества': form.subsidiaries,
        'Основна дейност': form.activityCheckboxes.join(', '),
        'Брой персонал': form.staffCount,
        'Брой фактури': form.invoiceCount,
        'Брой банкови сметки': form.bankAccounts,
        'Брой касови апарати': form.cashRegisters,
        'Брой лица на трудов договор': form.employeesLabor,
        'Търговски обекти': form.commercialSites,
        'Складови наличности': form.stockInventory,
        'Складова програма': form.warehouseProgram,
        'Необходими услуги': form.servicesNeeded.join(', '),
        'Телефон': form.phone,
        'Специфични изисквания': form.notes,
      };
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="page-header text-center">
        <div className="max-w-3xl mx-auto mt-20">          
          <h1 className="text-4xl md:text-5xl font-black mb-5">Цени</h1>
          <p className="text-white/75 text-lg leading-relaxed max-w-2xl mx-auto">
            Ако искате да получите своята ценова оферта, моля попълнете въпросника и ние ще ви отговорим в рамките на два работни дни.
          </p>
        </div>
      </section>

      {/* Form section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {status === 'success' ? (
            <div className="card p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-navy-800 mb-3">Запитването е изпратено!</h2>
              <p className="text-gray-600 mb-8">
                Ще се свържем с вас в рамките на два работни дни с индивидуална ценова оферта.
              </p>
              <button onClick={() => setStatus('idle')} className="btn-primary">
                Изпрати ново запитване
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="card p-8 md:p-12 space-y-8">
              <div>
                <h2 className="text-xl font-bold text-navy-800 mb-1 flex items-center gap-2">
                  <span className="w-8 h-8 bg-navy-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">1</span>
                  Данни за дружеството
                </h2>
                <div className="w-full h-px bg-gray-100 mt-4 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="label-text">Наименование на дружеството *</label>
                    <input
                      required
                      type="text"
                      className="input-field"
                      placeholder="Въведете наименование..."
                      value={form.companyName}
                      onChange={(e) => setField('companyName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">ЕИК или БУЛСТАТ</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="123456789"
                      value={form.eik}
                      onChange={(e) => setField('eik', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Правна форма на дружеството *</label>
                    <select
                      required
                      className="input-field"
                      value={form.legalForm}
                      onChange={(e) => setField('legalForm', e.target.value)}
                    >
                      <option value="">Изберете правна форма...</option>
                      {legalForms.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Имейл *</label>
                    <input
                      required
                      type="email"
                      className="input-field"
                      placeholder="example@company.com"
                      value={form.email}
                      onChange={(e) => setField('email', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-text">Вид дейност</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Опишете основната дейност на дружеството..."
                      value={form.activityType}
                      onChange={(e) => setField('activityType', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-navy-800 mb-1 flex items-center gap-2">
                  <span className="w-8 h-8 bg-navy-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">2</span>
                  Структура и дейност
                </h2>
                <div className="w-full h-px bg-gray-100 mt-4 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <RadioGroup
                    label="Чуждестранно участие"
                    value={form.foreignParticipation}
                    onChange={(v) => setField('foreignParticipation', v)}
                  />
                  <RadioGroup
                    label="Дъщерни дружества"
                    value={form.subsidiaries}
                    onChange={(v) => setField('subsidiaries', v)}
                  />
                </div>
                <div className="mt-6">
                  <CheckboxGroup
                    label="Основна дейност"
                    options={mainActivityOptions}
                    values={form.activityCheckboxes}
                    onChange={(v) => setField('activityCheckboxes', v)}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-navy-800 mb-1 flex items-center gap-2">
                  <span className="w-8 h-8 bg-navy-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">3</span>
                  Количествени показатели
                </h2>
                <div className="w-full h-px bg-gray-100 mt-4 mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <label className="label-text">Брой персонал</label>
                    <input
                      type="number"
                      min="0"
                      className="input-field"
                      placeholder="0"
                      value={form.staffCount}
                      onChange={(e) => setField('staffCount', e.target.value)}
                    />
                    <p className="text-xs text-gray-500 mt-1.5">
                      Общ брой на персонала по трудови и граждански договори, договори за управление и контрол и самоосигуряващи се лица
                    </p>
                  </div>
                  <div>
                    <label className="label-text">Брой фактури (месечно)</label>
                    <input
                      type="number"
                      min="0"
                      className="input-field"
                      placeholder="0"
                      value={form.invoiceCount}
                      onChange={(e) => setField('invoiceCount', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Брой банкови сметки</label>
                    <input
                      type="number"
                      min="0"
                      className="input-field"
                      placeholder="0"
                      value={form.bankAccounts}
                      onChange={(e) => setField('bankAccounts', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Брой касови апарати</label>
                    <input
                      type="number"
                      min="0"
                      className="input-field"
                      placeholder="0"
                      value={form.cashRegisters}
                      onChange={(e) => setField('cashRegisters', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="label-text">Брой лица назначени на трудов договор</label>
                    <input
                      type="number"
                      min="0"
                      className="input-field"
                      placeholder="0"
                      value={form.employeesLabor}
                      onChange={(e) => setField('employeesLabor', e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label-text">Видове търговски обекти, които използвате</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Магазин, склад, офис..."
                      value={form.commercialSites}
                      onChange={(e) => setField('commercialSites', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                  <RadioGroup
                    label="Поддържате ли складови наличности със стоки"
                    value={form.stockInventory}
                    onChange={(v) => setField('stockInventory', v)}
                  />
                  <RadioGroup
                    label="Използвате ли складова програма"
                    value={form.warehouseProgram}
                    onChange={(v) => setField('warehouseProgram', v)}
                  />
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-navy-800 mb-1 flex items-center gap-2">
                  <span className="w-8 h-8 bg-navy-600 text-white rounded-lg flex items-center justify-center text-sm font-bold">4</span>
                  Желани услуги и контакт
                </h2>
                <div className="w-full h-px bg-gray-100 mt-4 mb-6" />
                <CheckboxGroup
                  label="От какви услуги имате нужда"
                  options={servicesOptions}
                  values={form.servicesNeeded}
                  onChange={(v) => setField('servicesNeeded', v)}
                />
                <div className="mt-6">
                  <label className="label-text">Телефон за връзка</label>
                  <input
                    type="tel"
                    className="input-field"
                    placeholder="+359 888 123 456"
                    value={form.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <label className="label-text">
                    Други специфични Ваши изисквания, за които смятате, че е нужно да ни информирате
                  </label>
                  <textarea
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Опишете допълнителни изисквания..."
                    value={form.notes}
                    onChange={(e) => setField('notes', e.target.value)}
                  />
                </div>
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
                    Изпрати запитване
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-14 gradient-navy">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Имате въпроси?
          </h2>
          <p className="text-white/75 text-lg mb-8">
            Свържете се с нас, за да обсъдим всичко, което Ви интересува.
          </p>
          <NavLink to="/контакти" className="btn-white text-base px-8 py-4">
            Свържете се с нас
            <ArrowRight size={18} />
          </NavLink>
        </div>
      </section>
    </div>
  );
}

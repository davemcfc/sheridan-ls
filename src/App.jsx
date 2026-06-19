import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle, 
  Info, 
  Calendar, 
  CreditCard,
  Sparkles,
  Edit2,
  Globe,
  AlertTriangle
} from 'lucide-react';

const translations = {
  uk: {
    nav: {
      about: 'Про мене',
      services: 'Послуги та тарифи',
      policies: 'Обмін й повернення',
      pay: 'Платіжний портал'
    },
    hero: {
      badge: 'Професійні мовні послуги',
      title: 'Експертні рішення для ',
      titleAccent: 'навчання та перекладів англійської мови',
      subtitle: 'Понад 35 років професійного досвіду у викладанні англійської мови для іноземців та високоточному перекладі.',
      btnPay: 'Оплатити безпечно через LiqPay',
      btnServices: 'Переглянути послуги'
    },
    about: {
      badge: 'Досвід та надійність',
      title: 'Понад 35 років відданої практики',
      p1: 'Вітаю! Я професійний перекладач і викладач англійської мови. Протягом більш ніж трьох десятиліть я допомагаю студентам усього світу долати мовні бар\'єри, освоювати складну граматику, підвищувати розмовний уровень і створювати бездоганні переклади.',
      p2: 'Якщо ви бажаєте досконало опанувати англійську мову або потребуєте ретельного, автентичного перекладу ваших документів чи текстів з української на англійську, я надаю надійні та якісні послуги, які повністю відповідають вашим академічним та професійним цілям.',
      stats: [
        { value: '35+', label: 'Років досвіду' },
        { value: '100%', label: 'Цифрова доставка' },
        { value: '1:1', label: 'Індивідуальний підхід' }
      ]
    },
    services: {
      badge: 'Прозоре ціноутворення',
      title: 'Послуги та актуальні тарифи',
      tuition: {
        title: 'Викладання англійської мови',
        desc: 'Індивідуальні заняття з англійської мови, розроблені спеціально для іноземних студентів для швидкого підвищення розмовного рівня, виправлення вимови та розуміння граматики.',
        rate: '400 грн',
        unit: 'за годину',
        subtext: 'Еквівалент $10 / год'
      },
      translation: {
        title: 'Професійний переклад',
        desc: 'Ретельний і термінологічно точний переклад офіційних документів, наукових робіт, сайтів та загальних текстів з української мови на англійську.',
        rate: '400 грн',
        unit: 'за 100 слів',
        subtext: '4 000 грн за 1 000 слів'
      },
      calculator: {
        title: 'Інтерактивний калькулятор вартості',
        subtitle: 'Оберіть обсяг послуг для швидкого розрахунку вартості занять чи перекладу',
        typeLabel: 'Оберіть тип послуги:',
        tuitionOpt: 'Індивідуальне викладання (години)',
        translationOpt: 'Переклад текстів (кількість слів)',
        hoursLabel: 'Кількість навчальних годин:',
        wordsLabel: 'Кількість слів для перекладу:',
        estTotal: 'Орієнтовна загальна вартість:',
        bookBtn: 'Перейти до оплати цієї суми'
      }
    },
    policies: {
      badge: 'Регламент та стандарти',
      title: 'Умови обміну й повернення',
      subtitle: 'Офіційні правила щодо доставки, обміну та повернення коштів за послуги.',
      delivery: {
        title: '1. Формат та доставка послуг',
        desc: 'Усі мовні послуги надаються виключно в цифровому форматі. Навчальні сесії проходять у режимі онлайн-відеозв’язку (Google Meet, Microsoft Teams, Telegram тощо), а готові файли перекладів доставляються надійними електронними каналами зв’язку (E-mail, месенджери за домовленістю).'
      },
      refund: {
        title: '2. Детальні умови обміну й повернення',
        desc: '1) Послуги викладання: клієнти можуть запросити повне повернення коштів або перенести заняття (обмін часу), попередивши нас щонайменше за 24 години. 2) Послуги перекладу: оскільки переклад є індивідуальним цифровим продуктом, після початку роботи або доставки готового тексту ці послуги не підлягають обміну й поверненню.'
      }
    },
    payment: {
      badge: 'Безпечний шлюз',
      title: 'Платіжний портал LiqPay',
      desc: 'Для проведення оплати за послуги викладання або перекладу скористайтеся безпечною платіжною формою нижче. Ви будете перенаправлені на сертифіковану сторінку еквайрингу LiqPay від ПриватБанку.',
      fopName: 'Отримувач: ШЕРІДАН Д.А. ФОП',
      form: {
        serviceType: 'Тип послуги',
        amount: 'Сума до сплати (UAH)',
        clientName: 'ПІБ платника',
        clientEmail: 'Електронна пошта для квитанції',
        clientPhone: 'Контактний телефон',
        submit: 'Оплатити через LiqPay',
        disclaimer: 'Натискаючи кнопку, ви погоджуєтесь з правилами надання послуг та умовами обміну й повернення.',
        errorHeader: 'Помилка ініціалізації',
        errorMessage: 'Помилка підключення до платіжного шлюзу. Будь ласка, перевірте з\'єднання та спробуйте ще раз або зверніться до підтримки.'
      },
      presets: {
        title: 'Швидкі пакети для постійних клієнтів',
        custom: 'Інша сума',
        tuitionHourDropdown: 'Гнучкий вибір годин занять',
        tuitionWeekly: 'Стандартний пакет занять (2 000 грн / ≈ $50)',
        translationBase: 'Переклад 1 000 слів (4 000 грн / ≈ $90)',
        customMonthly: 'Місячний пакет (11 000 грн / ≈ $250)',
        tuitionTitle: 'Послуги викладання',
        translationTitle: 'Послуги перекладу',
        specifyWords: 'Вказати великий обсяг слів:',
        wordsDropdownPlaceholder: 'Оберіть обсяг слів',
        hoursDropdownPlaceholder: 'Оберіть години'
      }
    },
    footer: {
      desc: 'Професійні, надійні та перевірені часом рішення в сфері вивчення англійської мови та високоточного перекладу.',
      contacts: 'Контактна інформація',
      addressEdit: 'Редагувати адресу реєстрації',
      addressPlaceholder: 'Введіть вашу адресу реєстрації тут...',
      addressDefault: 'вул. Кринична, 90, м. Хмельницький, Україна 29021',
      legal: 'ШЕРІДАН Д.А. ФОП',
      rights: 'Усі права захищено.'
    }
  },
  en: {
    nav: {
      about: 'About Me',
      services: 'Services & Rates',
      policies: 'Returns & Exchanges',
      pay: 'Payment Portal'
    },
    hero: {
      badge: 'Professional Language Solutions',
      title: 'Expert solutions for ',
      titleAccent: 'English tuition and translations',
      subtitle: 'Over 35 years of dedicated experience delivering English tuition for foreign students and high-precision translations.',
      btnPay: 'Pay Securely via LiqPay',
      btnServices: 'View Services'
    },
    about: {
      badge: 'Experience & Trust',
      title: '35+ Years of Dedicated Practice',
      p1: 'Hello! I am a professional translator and English language teacher. For more than three decades, I have been guiding students from all over the world to overcome communication barriers, master grammar intricacies, and produce stellar translated materials.',
      p2: 'Whether you want to gain absolute fluency in English or require meticulous, authentic translations of documents from Ukrainian to English, I supply high-quality and time-tested language solutions designed around your precise targets.',
      stats: [
        { value: '35+', label: 'Years Experience' },
        { value: '100%', label: 'Digital Delivery' },
        { value: '1:1', label: 'Individual Focus' }
      ]
    },
    services: {
      badge: 'Transparent Pricing',
      title: 'Services & Rates',
      tuition: {
        title: 'English Language Tuition',
        desc: 'Customised English lessons made specifically for foreign students wanting to dramatically build fluency, pronunciation, and active comprehension.',
        rate: '400 UAH',
        unit: 'per hour',
        subtext: 'Equivalent of $10 / hr'
      },
      translation: {
        title: 'Translation Services',
        desc: 'Accurate, certified-level document and textual translations from Ukrainian to English, preserving semantic nuances and native vocabulary.',
        rate: '400 UAH',
        unit: 'per 100 words',
        subtext: '4,000 UAH per 1,000 words'
      },
      calculator: {
        title: 'Interactive Price Estimator',
        subtitle: 'Adjust the controls below to instantly estimate the cost of your custom project or tuition bundle.',
        typeLabel: 'Select service type:',
        tuitionOpt: 'Individual Tuition (Hours)',
        translationOpt: 'Document Translation (Words)',
        hoursLabel: 'Number of tuition hours:',
        wordsLabel: 'Number of words for translation:',
        estTotal: 'Estimated Total Cost:',
        bookBtn: 'Proceed to Pay This Amount'
      }
    },
    policies: {
      badge: 'Standards & Protocols',
      title: 'Exchange and Return Policy',
      subtitle: 'Official regulations regarding service delivery, cancellations, and refunds.',
      delivery: {
        title: '1. Service Delivery Format',
        desc: 'All professional language services are delivered digitally. Language tuition is conducted via online video calls (Google Meet, Microsoft Teams, Telegram, etc.), and finalised translated assets are delivered through secure electronic networks (E-mail or preferred messaging systems).'
      },
      refund: {
        title: '2. Detailed Return & Exchange Terms',
        desc: '1) Tuition Services: Clients may request a full refund or reschedule (exchange) a lesson by notifying us at least 24 hours in advance. 2) Translation Services: As translations are custom digital products, once work has commenced or the finalized text is delivered, these services are strictly non-refundable and cannot be exchanged.'
      }
    },
    payment: {
      badge: 'Secure Gateway',
      title: 'LiqPay Payment Portal',
      desc: 'Use the safe, compliant payment portal below to purchase your tuition sessions or translation solutions. You will be redirected to the certified LiqPay billing gateway run by PrivatBank.',
      fopName: 'Beneficiary: ШЕРІДАН Д.А. ФОП',
      form: {
        serviceType: 'Service Type',
        amount: 'Payment Amount (UAH)',
        clientName: 'Your Full Name',
        clientEmail: 'Receipt Email Address',
        clientPhone: 'Contact Telephone',
        submit: 'Pay Securely via LiqPay',
        disclaimer: 'By proceeding, you agree to our service terms, digital delivery, and exchange and return policies.',
        errorHeader: 'Initialization Error',
        errorMessage: 'Failed to connect to the payment gateway. Please check your network and try again.'
      },
      presets: {
        title: 'Quick Presets for Regular Clients',
        custom: 'Custom Amount',
        tuitionHourDropdown: 'Flexible hours selection',
        tuitionWeekly: 'Standard Tuition Package (2,000 UAH / ≈ $50)',
        translationBase: '1,000 Words Translation (4,000 UAH / ≈ $90)',
        customMonthly: 'Monthly Package (11,000 UAH / ≈ $250)',
        tuitionTitle: 'Tuition Services',
        translationTitle: 'Translation Services',
        specifyWords: 'Specify larger word count:',
        wordsDropdownPlaceholder: 'Choose volume',
        hoursDropdownPlaceholder: 'Choose hours'
      }
    },
    footer: {
      desc: 'Professional, reliable, and highly refined English language instruction and translations backed by 35 years of excellence.',
      contacts: 'Contact Details',
      addressEdit: 'Configure registration address',
      addressPlaceholder: 'Input your company registration address...',
      addressDefault: '90 Krynychna St., Khmelnytskyi, Ukraine 29021',
      legal: 'ШЕРІДАН Д.А. ФОП',
      rights: 'All rights reserved.'
    }
  }
};

export default function App() {
  const [currentLang, setCurrentLang] = useState('uk'); // Ukrainian is default to comply with Article 30
  const [activeTab, setActiveTab] = useState('about');
  
  // Address edit configurations for banking validation
  const [regAddress, setRegAddress] = useState('');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  // Calculator logic state
  const [calcType, setCalcType] = useState('tuition');
  const [calcHours, setCalcHours] = useState(5);
  const [calcWords, setCalcWords] = useState(1200);
  
  // Payment gateway states
  const [payAmount, setPayAmount] = useState(2000);
  const [payService, setPayService] = useState('tuition');
  const [payName, setPayName] = useState('');
  const [payEmail, setPayEmail] = useState('');
  const [payPhone, setPayPhone] = useState('+380');
  
  // Active Preset Tracker State
  const [activePreset, setActivePreset] = useState('tuition-weekly');

  // Production integration state parameters
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const t = translations[currentLang];

  // Set default localized address on load
  useEffect(() => {
    setRegAddress(translations[currentLang].footer.addressDefault);
  }, [currentLang]);

  const changeTab = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo(0, 0);
  };

  // Handle instant value transition from dynamic cost estimator to payment portal state
  const handleCalculatorCheckout = (calculatedValue, serviceType) => {
    setPayAmount(calculatedValue);
    setPayService(serviceType);
    setActivePreset('custom'); // Default to custom on manual calculations
    changeTab('pay');
  };

  // Helper method to apply payment presets
  const handlePresetSelect = (amount, serviceType, presetId) => {
    setPayAmount(amount);
    setPayService(serviceType);
    setActivePreset(presetId);
  };

  // Handle customized large word counts via selection tools
  const handleLargeWordSelect = (wordCount) => {
    const calculatedAmount = wordCount * 4; // 400 UAH per 100 words = 4 UAH per 1 word
    setPayAmount(calculatedAmount);
    setPayService('translation');
    setActivePreset(`translation-large-${wordCount}`);
  };

  // Dynamic cost evaluation
  const getCalculatedTotal = () => {
    if (calcType === 'tuition') {
      return calcHours * 400;
    } else {
      return calcWords * 4;
    }
  };

  const currentTotal = getCalculatedTotal();

  const handlePaymentSubmit = async () => {
    setIsSubmitting(true);
    setPaymentError('');
    
    try {
      // 1. Call secure API route to parse variables and sign them
      const response = await fetch('/api/create-liqpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: payAmount,
          description: `${payService === 'tuition' ? 'Tuition' : 'Translation'} Services - ${payName}`,
          clientPhone: payPhone,
          clientEmail: payEmail
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        const err = new Error('Server returned non-200');
        err.serverMessage = errBody.error || `Server error ${response.status}`;
        throw err;
      }

      const { data, signature } = await response.json();

      if (!data || !signature) {
        throw new Error('API output missing required data or signature keys');
      }

      // 2. Generate a temporary hidden form element to force a POST redirect
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.liqpay.ua/api/3/checkout';
      form.acceptCharset = 'utf-8';

      const dataInput = document.createElement('input');
      dataInput.type = 'hidden';
      dataInput.name = 'data';
      dataInput.value = data;
      form.appendChild(dataInput);

      const sigInput = document.createElement('input');
      sigInput.type = 'hidden';
      sigInput.name = 'signature';
      sigInput.value = signature;
      form.appendChild(sigInput);

      document.body.appendChild(form);
      form.submit(); // Dispatches client securely to PrivatBank page
    } catch (error) {
      console.error('Payment gateway initialization failed:', error);
      let displayError = t.payment.form.errorMessage;
      if (error?.serverMessage) {
        displayError = error.serverMessage;
      }
      setPaymentError(displayError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] text-slate-800 antialiased flex flex-col justify-between font-sans selection:bg-blue-600 selection:text-white">
      
      {/* HEADER SECTION */}
      <header className="bg-white border-b border-slate-200/85">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Top Row: Business Logo and Mobile Lang Toggle */}
          <div className="py-5 flex items-center justify-between">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => changeTab('about')}>
              <span className="font-extrabold text-2xl text-slate-900 tracking-tight flex items-center gap-2">
                Sheridan<span className="text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-100">LS</span>
              </span>
            </div>

            {/* Mobile Language Selector */}
            <div className="flex md:hidden items-center bg-slate-100 rounded-full p-1 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-1.5 px-2 text-slate-500">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <button 
                type="button"
                onClick={() => setCurrentLang('uk')}
                className={`text-xs font-sans font-extrabold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'uk' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                UA
              </button>
              <button 
                type="button"
                onClick={() => setCurrentLang('en')}
                className={`text-xs font-sans font-extrabold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>
          </div>

          {/* Bottom Row: Tabs and Desktop Lang Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between">
            
            {/* NAVIGATION TABS */}
            <div className="flex gap-1 overflow-x-auto custom-scrollbar pb-px w-full md:w-auto">
              {[
                { id: 'about', label: t.nav.about, icon: BookOpen },
                { id: 'services', label: t.nav.services, icon: FileText },
                { id: 'policies', label: t.nav.policies, icon: ShieldCheck },
                { id: 'pay', label: t.nav.pay, icon: CreditCard }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => changeTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3.5 text-sm font-sans font-bold whitespace-nowrap transition-colors border-b-2 -mb-px ${
                      isSelected 
                        ? 'border-blue-600 text-blue-600 bg-blue-50/10' 
                        : 'border-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-50/50'
                    }`}
                  >
                    <IconComponent className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Desktop Language Selector */}
            <div className="hidden md:flex items-center bg-slate-100 rounded-full p-1 border border-slate-200 shadow-xs mb-3 ml-4 shrink-0">
              <div className="flex items-center gap-1.5 px-2 text-slate-500">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <button 
                type="button"
                onClick={() => setCurrentLang('uk')}
                className={`text-xs font-sans font-extrabold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'uk' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                UA
              </button>
              <button 
                type="button"
                onClick={() => setCurrentLang('en')}
                className={`text-xs font-sans font-extrabold px-3 py-1.5 rounded-full transition-all duration-200 ${
                  currentLang === 'en' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* HERO SECTION - Active on about tab */}
      {activeTab === 'about' && (
        <section className="bg-gradient-to-b from-blue-50/80 via-white to-[#FBFBFE] py-12 md:py-20 border-b border-slate-100 animate-fadeIn">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-full text-blue-700 font-semibold text-xs tracking-wide uppercase mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
              {t.hero.badge}
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              {t.hero.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                {t.hero.titleAccent}
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed font-normal">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3.5 max-w-md mx-auto">
              <button 
                type="button"
                onClick={() => {
                  setPayAmount(2000); 
                  setActivePreset('tuition-weekly');
                  changeTab('pay');
                }}
                className="bg-[#78B43E] hover:bg-[#689f34] text-white px-6 py-3.5 rounded-xl font-extrabold text-base shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                {t.hero.btnPay}
              </button>
              <button 
                type="button"
                onClick={() => changeTab('services')}
                className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 rounded-xl font-bold text-base shadow-xs hover:shadow-sm transition-all duration-200"
              >
                {t.hero.btnServices}
              </button>
            </div>
          </div>
        </section>
      )}

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        
        {/* ABOUT TAB VIEW */}
        {activeTab === 'about' && (
          <div className="space-y-12 animate-fadeIn">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 lg:p-14 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-full blur-3xl -z-10 opacity-60"></div>
              
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-block bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 font-bold text-xs tracking-wider uppercase">
                    {t.about.badge}
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    {t.about.title}
                  </h2>
                  
                  <div className="w-20 h-1.5 bg-blue-600 rounded-full"></div>
                  
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                    {t.about.p1}
                  </p>
                  
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                    {t.about.p2}
                  </p>
                </div>

                <div className="lg:col-span-5 bg-slate-50/50 rounded-2xl border border-slate-200/60 p-6 sm:p-8 space-y-6">
                  {t.about.stats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-xs">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 font-extrabold text-xl">
                        {index === 0 ? "🏆" : index === 1 ? "⚡" : "🤝"}
                      </div>
                      <div>
                        <div className="text-xl sm:text-2xl font-black text-slate-900">{stat.value}</div>
                        <div className="text-xs sm:text-sm text-slate-500 font-semibold">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SERVICES TAB VIEW */}
        {activeTab === 'services' && (
          <div className="space-y-12 animate-fadeIn">
            
            {/* Rates comparison cards */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Tuition card */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-8 flex flex-col justify-between hover:border-blue-300 transition-all duration-200">
                <div>
                  <div className="w-14 h-14 bg-blue-50 border border-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                    <BookOpen className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{t.services.tuition.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">{t.services.tuition.desc}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-auto">
                  <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{currentLang === 'uk' ? 'Тариф' : 'Standard Rate'}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{t.services.tuition.rate}</span>
                    <span className="text-sm font-semibold text-slate-500">{t.services.tuition.unit}</span>
                  </div>
                  <span className="block text-xs font-semibold text-blue-600 mt-1.5">{t.services.tuition.subtext}</span>
                </div>
              </div>

              {/* Translation card */}
              <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-8 flex flex-col justify-between hover:border-indigo-300 transition-all duration-200">
                <div>
                  <div className="w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                    <FileText className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{t.services.translation.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">{t.services.translation.desc}</p>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mt-auto">
                  <span className="block text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">{currentLang === 'uk' ? 'Тариф' : 'Standard Rate'}</span>
                  <div className="flex flex-col gap-1">
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900 block leading-tight">
                      400 UAH <span className="font-semibold text-slate-500 text-sm">{t.services.translation.unit}</span>
                    </span>
                    <div className="w-full h-px bg-slate-200 my-1"></div>
                    <span className="text-lg sm:text-xl font-extrabold text-slate-900 block leading-tight">
                      4,000 UAH <span className="font-semibold text-slate-500 text-sm">{currentLang === 'uk' ? 'за 1 000 слів' : 'per 1,000 words'}</span>
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Interactive Calculator Block */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-72 h-72 bg-blue-900/40 rounded-full blur-3xl -z-10"></div>
              
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full text-blue-400 font-bold text-xs tracking-wider uppercase mb-4">
                  <Info className="w-3.5 h-3.5" />
                  {t.services.calculator.title}
                </div>
                
                <h3 className="text-xl sm:text-2xl font-extrabold mb-2">{t.services.calculator.title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm mb-8">{t.services.calculator.subtitle}</p>

                {/* Selection switch */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{t.services.calculator.typeLabel}</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-800 p-1 rounded-lg max-w-lg border border-slate-700">
                    <button 
                      type="button"
                      onClick={() => setCalcType('tuition')}
                      className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-md transition-all ${
                        calcType === 'tuition' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.services.calculator.tuitionOpt}
                    </button>
                    <button 
                      type="button"
                      onClick={() => setCalcType('translation')}
                      className={`py-2 px-3 text-xs sm:text-sm font-bold rounded-md transition-all ${
                        calcType === 'translation' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {t.services.calculator.translationOpt}
                    </button>
                  </div>
                </div>

                {/* Range inputs based on type */}
                {calcType === 'tuition' ? (
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-slate-300">{t.services.calculator.hoursLabel}</span>
                      <span className="text-xl font-bold text-blue-400">{calcHours} {currentLang === 'uk' ? 'год.' : 'hrs'}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1" 
                      max="40" 
                      value={calcHours} 
                      onChange={(e) => setCalcHours(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>1 {currentLang === 'uk' ? 'година' : 'hour'}</span>
                      <span>40 {currentLang === 'uk' ? 'годин' : 'hours'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-baseline">
                      <span className="text-sm font-semibold text-slate-300">{t.services.calculator.wordsLabel}</span>
                      <span className="text-xl font-bold text-indigo-400">{calcWords.toLocaleString()} {currentLang === 'uk' ? 'слів' : 'words'}</span>
                    </div>
                    <input 
                      type="range" 
                      min="100" 
                      max="10000" 
                      step="100"
                      value={calcWords} 
                      onChange={(e) => setCalcWords(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>100 {currentLang === 'uk' ? 'слів' : 'words'}</span>
                      <span>10,000 {currentLang === 'uk' ? 'слів' : 'words'}</span>
                    </div>
                  </div>
                )}

                {/* Real-time total evaluation and action */}
                <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">{t.services.calculator.estTotal}</span>
                    <span className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{currentTotal.toLocaleString()} UAH</span>
                  </div>
                  <button 
                    type="button"
                    onClick={() => handleCalculatorCheckout(currentTotal, calcType)}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-extrabold px-6 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>{t.services.calculator.bookBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* POLICIES TAB VIEW */}
        {activeTab === 'policies' && (
          <div className="space-y-12 animate-fadeIn max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm">
              
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <span className="bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-blue-700 font-bold text-xs tracking-wider uppercase mb-3 inline-block">
                  {t.policies.badge}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 mb-4">
                  {t.policies.title}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                  {t.policies.subtitle}
                </p>
              </div>

              <div className="space-y-6">
                
                {/* Delivery block */}
                <div className="flex gap-4 p-6 sm:p-8 bg-blue-50/50 rounded-2xl border border-blue-100/60 transition-all">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {t.policies.delivery.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {t.policies.delivery.desc}
                    </p>
                  </div>
                </div>

                {/* Refund block */}
                <div className="flex gap-4 p-6 sm:p-8 bg-blue-50/50 rounded-2xl border border-blue-100/60 transition-all">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {t.policies.refund.title}
                    </h3>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                      {t.policies.refund.desc}
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* PAYMENT PORTAL VIEW */}
        {activeTab === 'pay' && (
          <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm relative">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#78B43E] rounded-l-3xl"></div>
              
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-100">
                <div className="w-12 h-12 bg-[#78B43E]/10 rounded-xl flex items-center justify-center text-[#78B43E]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">{t.payment.title}</h2>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t.payment.fopName}</p>
                </div>
              </div>

              {/* Quick Amount Selector Segment for Returning Clients */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-8">
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">
                  {t.payment.presets.title}
                </h4>

                {/* Sub-Group 1: Tuition Packages */}
                <div className="mb-5">
                  <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    {t.payment.presets.tuitionTitle}
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    
                    {/* Flexible Tuition Hours Selector Dropdown (1 to 10 hours) */}
                    <div className={`p-2.5 rounded-xl border text-xs font-bold transition-all duration-200 flex flex-col justify-center min-h-[58px] ${
                      activePreset.startsWith('tuition-hours-')
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}>
                      <span className="block text-[9px] font-extrabold text-slate-400 uppercase tracking-wide mb-0.5">
                        {currentLang === 'uk' ? 'Гнучкий пакет годин:' : 'Flexible hours selector:'}
                      </span>
                      <select
                        onChange={(e) => {
                          const hrs = parseInt(e.target.value);
                          if (hrs > 0) {
                            handlePresetSelect(hrs * 400, 'tuition', `tuition-hours-${hrs}`);
                          }
                        }}
                        className="w-full bg-transparent border-0 text-xs font-bold text-slate-700 focus:outline-none p-0 cursor-pointer outline-none"
                        value={activePreset.startsWith('tuition-hours-') ? activePreset.replace('tuition-hours-', '') : ""}
                      >
                        <option value="" disabled>{t.payment.presets.hoursDropdownPlaceholder}</option>
                        <option value="1">{currentLang === 'uk' ? '1 год. (400 грн / ≈ $10)' : '1 hr (400 UAH / ≈ $10)'}</option>
                        <option value="2">{currentLang === 'uk' ? '2 год. (800 грн / ≈ $20)' : '2 hrs (800 UAH / ≈ $20)'}</option>
                        <option value="3">{currentLang === 'uk' ? '3 год. (1 200 грн / ≈ $30)' : '3 hrs (1,200 UAH / ≈ $30)'}</option>
                        <option value="4">{currentLang === 'uk' ? '4 год. (1 600 грн / ≈ $40)' : '4 hrs (1,600 UAH / ≈ $40)'}</option>
                        <option value="5">{currentLang === 'uk' ? '5 год. (2 000 грн / ≈ $50)' : '5 hrs (2,000 UAH / ≈ $50)'}</option>
                        <option value="6">{currentLang === 'uk' ? '6 год. (2 400 грн / ≈ $60)' : '6 hrs (2,400 UAH / ≈ $60)'}</option>
                        <option value="7">{currentLang === 'uk' ? '7 год. (2 800 грн / ≈ $70)' : '7 hrs (2,800 UAH / ≈ $70)'}</option>
                        <option value="8">{currentLang === 'uk' ? '8 год. (3 200 грн / ≈ $80)' : '8 hrs (3,200 UAH / ≈ $80)'}</option>
                        <option value="9">{currentLang === 'uk' ? '9 год. (3 600 грн / ≈ $90)' : '9 hrs (3,600 UAH / ≈ $90)'}</option>
                        <option value="10">{currentLang === 'uk' ? '10 год. (4 000 грн / ≈ $100)' : '10 hrs (4,000 UAH / ≈ $100)'}</option>
                      </select>
                    </div>

                    <button
                      type="button"
                      onClick={() => handlePresetSelect(2000, 'tuition', 'tuition-weekly')}
                      className={`text-left p-3 rounded-xl border text-xs font-bold transition-all duration-200 flex flex-col justify-center min-h-[58px] ${
                        activePreset === 'tuition-weekly'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {t.payment.presets.tuitionWeekly}
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePresetSelect(11000, 'tuition', 'custom-monthly')}
                      className={`text-left p-3 rounded-xl border text-xs font-bold transition-all duration-200 flex flex-col justify-center min-h-[58px] ${
                        activePreset === 'custom-monthly'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {t.payment.presets.customMonthly}
                    </button>
                  </div>
                </div>

                {/* Sub-Group 2: Translation Services */}
                <div className="border-t border-slate-200/60 pt-4">
                  <h5 className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                    {t.payment.presets.translationTitle}
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-end">
                    
                    {/* Standard base translation button */}
                    <button
                      type="button"
                      onClick={() => handlePresetSelect(4000, 'translation', 'translation-1k')}
                      className={`text-left p-3.5 rounded-xl border text-xs font-bold transition-all duration-200 min-h-[56px] flex items-center justify-between ${
                        activePreset === 'translation-1k'
                          ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <span>{t.payment.presets.translationBase}</span>
                    </button>

                    {/* Larger Word Count Specification Dropdown */}
                    <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs space-y-1.5">
                      <span className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wide">
                        {t.payment.presets.specifyWords}
                      </span>
                      
                      {/* Full Width Dropdown */}
                      <select
                        onChange={(e) => {
                          const val = parseInt(e.target.value);
                          if (val > 0) {
                            handleLargeWordSelect(val);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                        value={activePreset.startsWith('translation-large-') ? activePreset.replace('translation-large-', '') : ""}
                      >
                        <option value="" disabled>{t.payment.presets.wordsDropdownPlaceholder}</option>
                        <option value="1500">{currentLang === 'uk' ? '1 500 слів (6 000 грн / ≈ $135)' : '1,500 words (6,000 UAH / ≈ $135)'}</option>
                        <option value="2000">{currentLang === 'uk' ? '2 000 слів (8 000 грн / ≈ $180)' : '2,000 words (8,000 UAH / ≈ $180)'}</option>
                        <option value="3000">{currentLang === 'uk' ? '3 000 слів (12 000 грн / ≈ $270)' : '3,000 words (12,000 UAH / ≈ $270)'}</option>
                        <option value="5000">{currentLang === 'uk' ? '5 000 слів (20 000 грн / ≈ $450)' : '5,000 words (20,000 UAH / ≈ $450)'}</option>
                        <option value="10000">{currentLang === 'uk' ? '10 000 слів (40 000 грн / ≈ $900)' : '10,000 words (40,000 UAH / ≈ $900)'}</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* Custom Reset Button to override presets */}
                <div className="mt-4 flex items-center justify-end border-t border-slate-200/60 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setActivePreset('custom');
                    }}
                    className={`text-xs font-extrabold px-3.5 py-1.5 rounded-lg border transition-all ${
                      activePreset === 'custom'
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {t.payment.presets.custom}
                  </button>
                </div>
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                {t.payment.desc}
              </p>

              <div className="space-y-4">
                
                {/* Service Picker */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.payment.form.serviceType}</label>
                  <select 
                    value={payService} 
                    onChange={(e) => {
                      setPayService(e.target.value);
                      setActivePreset('custom');
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="tuition">{t.services.tuition.title}</option>
                    <option value="translation">{t.services.translation.title}</option>
                  </select>
                </div>

                {/* Amount field */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.payment.form.amount}</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      min="100"
                      step="50"
                      value={payAmount}
                      onChange={(e) => {
                        setPayAmount(parseInt(e.target.value) || 0);
                        setActivePreset('custom');
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-12 py-3 text-sm font-extrabold focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <span className="text-sm font-extrabold text-slate-400">UAH</span>
                    </div>
                  </div>
                </div>

                {/* Client credentials */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.payment.form.clientName}</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    value={payName}
                    onChange={(e) => setPayName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.payment.form.clientEmail}</label>
                    <input 
                      type="email" 
                      placeholder="client@domain.com" 
                      value={payEmail}
                      onChange={(e) => setPayEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{t.payment.form.clientPhone}</label>
                    <input 
                      type="tel" 
                      value={payPhone}
                      onChange={(e) => setPayPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                {/* Submit button supporting dynamic loading animations */}
                <button 
                  type="button"
                  disabled={isSubmitting}
                  onClick={handlePaymentSubmit}
                  className={`w-full bg-[#78B43E] hover:bg-[#689f34] active:scale-[0.99] text-white font-extrabold py-4 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 mt-2 shadow-sm text-base ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></span>
                  ) : (
                    <CreditCard className="w-5 h-5" />
                  )}
                  {isSubmitting 
                    ? (currentLang === 'uk' ? 'Підключення...' : 'Connecting...') 
                    : `${t.payment.form.submit} (${payAmount.toLocaleString()} UAH)`
                  }
                </button>

                <p className="text-[11px] text-slate-400 leading-relaxed text-center mt-3">
                  {t.payment.form.disclaimer}
                </p>
              </div>

              {/* Secure in-app custom error notification replaces browser alert popup */}
              {paymentError && (
                <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-800 text-xs sm:text-sm flex gap-2.5 items-start animate-fadeIn">
                  <span className="text-rose-600 flex-shrink-0 mt-0.5 text-base">⚠️</span>
                  <div>
                    <span className="font-bold block mb-0.5">{t.payment.form.errorHeader}</span>
                    <p>{paymentError}</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </main>

      {/* FOOTER AREA */}
      <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-850 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            
            <div className="space-y-4">
              <span className="font-extrabold text-2xl tracking-tight block">
                Sheridan<span className="text-blue-500">LS</span>
              </span>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                {t.footer.desc}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-200">{t.footer.contacts}</h3>
              
              <ul className="space-y-3.5 flex flex-col md:items-end">
                
                {/* New Legal Entity Line */}
                <li className="flex items-center gap-2 mb-1 text-right">
                  <span className="text-slate-300 font-bold tracking-wide text-sm">{t.footer.legal}</span>
                  <ShieldCheck className="w-4 h-4 text-slate-500" />
                </li>

                <li className="flex items-center gap-3">
                  <a href="mailto:davemcfc@gmail.com" className="text-slate-300 hover:text-white text-sm transition-colors">davemcfc@gmail.com</a>
                  <Mail className="w-5 h-5 text-blue-500" />
                </li>
                <li className="flex items-center gap-3">
                  <a href="tel:+380970627640" className="text-slate-300 hover:text-white text-sm transition-colors">+380 970 627 640</a>
                  <Phone className="w-5 h-5 text-blue-500" />
                </li>
                
                {/* Dynamic Address Config Block for Banking Verification */}
                <li className="space-y-2 text-right">
                  <div className="flex items-start gap-3 justify-end">
                    <div className="flex-grow">
                      <span className="text-slate-300 text-sm leading-relaxed">
                        {currentLang === 'uk' ? 'Адреса: ' : 'Address: '}
                        {regAddress || <span className="text-rose-400 italic">No Address Configured</span>}
                      </span>
                    </div>
                    <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-1" />
                  </div>

                  <div className="flex justify-end pr-8">
                    {isEditingAddress ? (
                      <div className="space-y-2 max-w-md bg-slate-800 p-3 rounded-lg border border-slate-700 text-left">
                        <textarea
                          value={regAddress}
                          onChange={(e) => setRegAddress(e.target.value)}
                          placeholder={t.footer.addressPlaceholder}
                          className="w-full bg-slate-950 border border-slate-700 rounded-md p-2 text-xs text-slate-200 focus:outline-none"
                          rows="2"
                        />
                        <div className="flex justify-end">
                            <button 
                              type="button"
                              onClick={() => setIsEditingAddress(false)}
                              className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] px-3 py-1 rounded-md transition-all uppercase tracking-wider"
                            >
                              {currentLang === 'uk' ? 'Зберегти' : 'Save Address'}
                            </button>
                        </div>
                      </div>
                    ) : (
                      <button 
                        type="button"
                        onClick={() => setIsEditingAddress(true)}
                        className="text-blue-400 hover:text-blue-300 text-xs font-bold inline-flex items-center gap-1 bg-slate-800 hover:bg-slate-750 px-2.5 py-1 rounded border border-slate-700 transition-all"
                      >
                        {t.footer.addressEdit}
                        <Edit2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </li>

              </ul>
            </div>

          </div>

          {/* Legal FOP Signature Footnote */}
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-slate-500 text-xs font-semibold">
              © {new Date().getFullYear()} Sheridan Language Services. {t.footer.legal}. {t.footer.rights}
            </p>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-600 bg-slate-950 px-2 py-1 rounded border border-slate-800 font-bold tracking-widest uppercase">
                LiqPay Certified
              </span>
            </div>
          </div>

        </div>
      </footer>

      {/* Inline styles for tab transitions and layout scrollbar styling */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
      `}} />

    </div>
  );
}
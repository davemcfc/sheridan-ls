import React, { useState, useEffect } from 'react'; 
import { BookOpen, FileText, ShieldCheck, Mail, Phone, MapPin, ArrowRight, CheckCircle, Info, Calendar, CreditCard, Sparkles, Edit2, Globe, AlertTriangle } from 'lucide-react';

const translations = { 
  uk: { 
    nav: { about: 'Про мене', services: 'Послуги та тарифи', policies: 'Правила', pay: 'Платіжний портал' }, 
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
      p1: 'Вітаю! Я професійний перекладач і викладач англійської мови. Протягом більш ніж трьох десятиліть я допомагаю студентам усього світу долати мовні бар\'єри, освоювати складну граматику, підвищувати розмовний рівень і створювати бездоганні переклади.', 
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
      title: 'Правила надання послуг', 
      subtitle: 'Будь ласка, ознайомтеся з умовами доставки та скасування занять перед початком співпраці.', 
      delivery: { 
        title: '1. Політика доставки послуг', 
        desc: 'Усі мовні послуги надаються виключно в цифровому форматі. Навчальні сесії проходять у режимі онлайн-відеозв’язку (Zoom, Google Meet, Skype), а готові файли перекладів доставляються надійними електронними каналами зв’язку (E-mail, месенджери за домовленістю).' 
      }, 
      refund: { 
        title: '2. Правила повернення коштів та скасування', 
        desc: 'Клієнти мають право запросити повне повернення сплачених коштів за заняття або перенести його термін без втрати коштів, за умови, що повідомлення про це надійшло електронною поштою або телефоном щонайменше за 24 години до початку запланованої сесії.' 
      } 
    }, 
    payment: { 
      badge: 'Безпечний шлюз', 
      title: 'Платіжний портал LiqPay', 
      desc: 'Для проведення оплати за послуги викладання або перекладу скористайтеся безпечною платіжною формою нижче. Ви будете перенаправлені на сертифіковану сторінку еквайрингу LiqPay від ПриватБанку.', 
      fopName: 'Отримувач: ФОП Шерідан Девід Альберт', 
      form: { 
        serviceType: 'Тип послуги', 
        amount: 'Сума до сплати (UAH)', 
        clientName: 'ПІБ платника', 
        clientEmail: 'Електронна пошта для квитанції', 
        clientPhone: 'Контактний телефон', 
        submit: 'Оплатити через LiqPay', 
        disclaimer: 'Натискаючи кнопку, ви погоджуєтесь з правилами надання послуг та політикою повернення коштів.', 
        errorMessage: 'Помилка підключення до платіжного шлюзу. Будь ласка, перевірте з\'єднання та спробуйте ще раз або зверніться до підтримки.'
      } 
    }, 
    footer: { 
      desc: 'Професійні, надійні та перевірені часом рішення в сфері вивчення англійської мови та високоточного перекладу.', 
      contacts: 'Контактна інформація', 
      addressEdit: 'Редагувати адресу реєстрації', 
      addressPlaceholder: 'Введіть вашу адресу реєстрації тут...', 
      addressDefault: 'вул. Кринична, 90, м. Хмельницький, Україна 29021', 
      legal: 'ФОП Шерідан Девід Альберт', 
      rights: 'Усі права захищено.' 
    } 
  }, 
  en: { 
    nav: { about: 'About Me', services: 'Services & Rates', policies: 'Policies', pay: 'Payment Portal' }, 
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
      title: 'Service Policies', 
      subtitle: 'Please review our service delivery, cancellation, and refund parameters before commencing scheduling.', 
      delivery: { 
        title: '1. Service Delivery Policy', 
        desc: 'All professional language services are delivered digitally. Language tuition is conducted via online video calls (Zoom, Google Meet, Skype), and finalised translated assets are delivered through secure electronic networks (E-mail or preferred messaging systems).' 
      }, 
      refund: { 
        title: '2. Refund & Cancellation Policy', 
        desc: 'Clients can request a full refund or reschedule lessons with no financial penalty, provided formal cancellation is received via email or phone at least 24 hours prior to the scheduled session.' 
      } 
    }, 
    payment: { 
      badge: 'Secure Gateway', 
      title: 'LiqPay Payment Portal', 
      desc: 'Use the safe, compliant payment portal below to purchase your tuition sessions or translation solutions. You will be redirected to the certified LiqPay billing gateway run by PrivatBank.', 
      fopName: 'Beneficiary: FOP Sheridan David Albert', 
      form: { 
        serviceType: 'Service Type', 
        amount: 'Payment Amount (UAH)', 
        clientName: 'Your Full Name', 
        clientEmail: 'Receipt Email Address', 
        clientPhone: 'Contact Telephone', 
        submit: 'Pay Securely via LiqPay', 
        disclaimer: 'By proceeding, you agree to our service terms, digital delivery, and 24-hour cancellation policies.', 
        errorMessage: 'Payment gateway connection error. Please check your connection and try again or contact support.'
      } 
    }, 
    footer: { 
      desc: 'Professional, reliable, and highly refined English language instruction and translations backed by 35 years of excellence.', 
      contacts: 'Contact Details', 
      addressEdit: 'Configure registration address', 
      addressPlaceholder: 'Input your company registration address...', 
      addressDefault: '90 Krynychna St., Khmelnytskyi, Ukraine 29021', 
      legal: 'FOP Sheridan David Albert', 
      rights: 'All rights reserved.' 
    } 
  } 
};

export default function App() { 
  const [currentLang, setCurrentLang] = useState('uk'); 
  const [activeTab, setActiveTab] = useState('about'); 
  const [regAddress, setRegAddress] = useState(''); 
  const [isEditingAddress, setIsEditingAddress] = useState(false); 
  
  const [calcType, setCalcType] = useState('tuition'); 
  const [calcHours, setCalcHours] = useState(5); 
  const [calcWords, setCalcWords] = useState(1200); 
  
  const [payAmount, setPayAmount] = useState(2000); 
  const [payService, setPayService] = useState('tuition'); 
  const [payName, setPayName] = useState(''); 
  const [payEmail, setPayEmail] = useState(''); 
  const [payPhone, setPayPhone] = useState('+380'); 
  
  // NEW: Store the exact error message from the backend
  const [paymentError, setPaymentError] = useState(''); 
  
  const t = translations[currentLang]; 

  useEffect(() => { 
    setRegAddress(translations[currentLang].footer.addressDefault); 
  }, [currentLang]);

  const changeTab = (tabId) => { 
    setActiveTab(tabId); 
    window.scrollTo(0, 0); 
  }; 

  const handleCalculatorCheckout = (calculatedValue, serviceType) => { 
    setPayAmount(calculatedValue); 
    setPayService(serviceType); 
    changeTab('pay'); 
  }; 

  const getCalculatedTotal = () => { 
    if (calcType === 'tuition') { return calcHours * 400; } 
    else { return calcWords * 4; } 
  }; 
  const currentTotal = getCalculatedTotal();

  // IMPLEMENTED CLAUDE'S FIX: Dynamic Error Handling
  const handlePaymentSubmit = async (e) => { 
    e.preventDefault(); 
    setPaymentError(''); // Clear previous errors
    
    try {
      const response = await fetch('/api/create-liqpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: payAmount,
          currency: 'UAH',
          description: `${payService === 'tuition' ? 'Tuition' : 'Translation'} Services - ${payName}`,
          clientPhone: payPhone,
          clientEmail: payEmail
        }),
      });

      // Claude's Fix: Explicitly parse non-200 responses to extract the server message
      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        const err = new Error('Server returned non-200');
        err.serverMessage = errBody.error || `Server error ${response.status}`;
        throw err;
      }

      const { data, signature } = await response.json();

      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://www.liqpay.ua/api/3/checkout';
      form.acceptCharset = 'utf-8';

      const dataInput = document.createElement('input');
      dataInput.type = 'hidden';
      dataInput.name = 'data';
      dataInput.value = data;
      form.appendChild(dataInput);

      const signatureInput = document.createElement('input');
      signatureInput.type = 'hidden';
      signatureInput.name = 'signature';
      signatureInput.value = signature;
      form.appendChild(signatureInput);

      document.body.appendChild(form);
      form.submit();

    } catch (error) {
      console.error('Payment gateway initialization failed:', error);
      
      // Claude's Fix: Try to get the real server error message
      let displayError = t.payment.form.errorMessage;
      if (error?.serverMessage) {
        displayError = error.serverMessage;
      }
      setPaymentError(displayError);
    }
  };

  return ( 
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header & Nav */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center py-4 gap-4">
            <div className="flex items-center gap-2">
              <Globe className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-slate-900 tracking-tight">Sheridan <span className="text-blue-600">LS</span></span>
            </div>
            
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex gap-6">
                {Object.entries(t.nav).map(([key, label]) => (
                  <button 
                    key={key} 
                    type="button"
                    onClick={() => changeTab(key)}
                    className={`text-sm font-medium transition-colors hover:text-blue-600 ${activeTab === key ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-slate-600'}`}
                  >
                    {label}
                  </button>
                ))}
              </nav>
              
              <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
                <button type="button" onClick={() => setCurrentLang('uk')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${currentLang === 'uk' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>UA</button>
                <button type="button" onClick={() => setCurrentLang('en')} className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${currentLang === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>EN</button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* HERO SECTION - ONLY SHOWS ON ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-100 mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-6">
              <Sparkles className="w-4 h-4" /> {t.hero.badge}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
              {t.hero.title} <br className="hidden sm:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{t.hero.titleAccent}</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button type="button" onClick={() => changeTab('pay')} className="px-8 py-4 bg-[#78B43E] hover:bg-[#689d36] text-white rounded-xl font-bold transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" /> {t.hero.btnPay}
              </button>
              <button type="button" onClick={() => changeTab('services')} className="px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center gap-2">
                {t.hero.btnServices} <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* CONTENT TABS */}
        <div className="space-y-12">
          
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs mb-4">
                  <ShieldCheck className="w-4 h-4" /> {t.about.badge}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.about.title}</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <p>{t.about.p1}</p>
                  <p>{t.about.p2}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {t.about.stats.map((stat, i) => (
                  <div key={i} className={`p-6 rounded-2xl ${i === 0 ? 'col-span-2 bg-blue-600 text-white' : 'bg-white border border-slate-100 shadow-sm'}`}>
                    <div className={`text-4xl font-extrabold mb-1 ${i === 0 ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                    <div className={`text-sm font-medium ${i === 0 ? 'text-blue-100' : 'text-slate-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs mb-4">
                  <BookOpen className="w-4 h-4" /> {t.services.badge}
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{t.services.title}</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.services.tuition.title}</h3>
                  <p className="text-slate-600 mb-6 min-h-[80px]">{t.services.tuition.desc}</p>
                  <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-extrabold text-slate-900">{t.services.tuition.rate}</div>
                      <div className="text-sm text-slate-500">{t.services.tuition.unit}</div>
                    </div>
                    <div className="text-sm font-medium text-[#78B43E] bg-green-50 px-3 py-1 rounded-full">
                      {t.services.tuition.subtext}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:border-blue-200 transition-colors">
                  <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{t.services.translation.title}</h3>
                  <p className="text-slate-600 mb-6 min-h-[80px]">{t.services.translation.desc}</p>
                  <div className="pt-6 border-t border-slate-100 flex items-end justify-between">
                    <div>
                      <div className="text-3xl font-extrabold text-slate-900">{t.services.translation.rate}</div>
                      <div className="text-sm text-slate-500">{t.services.translation.unit}</div>
                    </div>
                    <div className="text-sm font-medium text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                      {t.services.translation.subtext}
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculator Section */}
              <div className="mt-12 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white">
                <div className="max-w-3xl mx-auto">
                  <h3 className="text-2xl font-bold mb-2">{t.services.calculator.title}</h3>
                  <p className="text-slate-400 mb-8">{t.services.calculator.subtitle}</p>

                  <div className="space-y-8">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-3">{t.services.calculator.typeLabel}</label>
                      <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setCalcType('tuition')} className={`py-3 px-4 rounded-xl font-medium transition-all ${calcType === 'tuition' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                          {t.services.calculator.tuitionOpt}
                        </button>
                        <button type="button" onClick={() => setCalcType('translation')} className={`py-3 px-4 rounded-xl font-medium transition-all ${calcType === 'translation' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>
                          {t.services.calculator.translationOpt}
                        </button>
                      </div>
                    </div>

                    {calcType === 'tuition' ? (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-slate-300">{t.services.calculator.hoursLabel}</label>
                          <span className="text-blue-400 font-bold">{calcHours}</span>
                        </div>
                        <input type="range" min="1" max="40" value={calcHours} onChange={(e) => setCalcHours(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"/>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between mb-2">
                          <label className="text-sm font-medium text-slate-300">{t.services.calculator.wordsLabel}</label>
                          <span className="text-indigo-400 font-bold">{calcWords}</span>
                        </div>
                        <input type="range" min="100" max="10000" step="100" value={calcWords} onChange={(e) => setCalcWords(Number(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                      </div>
                    )}

                    <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div>
                        <div className="text-sm text-slate-400 mb-1">{t.services.calculator.estTotal}</div>
                        <div className="text-4xl font-extrabold text-white">{currentTotal.toLocaleString()} UAH</div>
                      </div>
                      <button type="button" onClick={() => handleCalculatorCheckout(currentTotal, calcType)} className="w-full sm:w-auto px-8 py-4 bg-[#78B43E] hover:bg-[#689d36] text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
                        {t.services.calculator.bookBtn} <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POLICIES TAB */}
          {activeTab === 'policies' && (
            <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium text-xs mb-4">
                  <FileText className="w-4 h-4" /> {t.policies.badge}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.policies.title}</h2>
                <p className="text-slate-600">{t.policies.subtitle}</p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex gap-4">
                  <div className="mt-1 bg-blue-50 p-2 rounded-lg text-blue-600 h-fit">
                    <Globe className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t.policies.delivery.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{t.policies.delivery.desc}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex gap-4">
                  <div className="mt-1 bg-red-50 p-2 rounded-lg text-red-600 h-fit">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{t.policies.refund.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{t.policies.refund.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENT TAB */}
          {activeTab === 'pay' && (
            <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium text-xs mb-4">
                  <ShieldCheck className="w-4 h-4" /> {t.payment.badge}
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4">{t.payment.title}</h2>
                <p className="text-slate-600 mb-2">{t.payment.desc}</p>
                <p className="text-sm font-semibold text-slate-900">{t.payment.fopName}</p>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border border-slate-200 p-8 sm:p-10">
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.payment.form.serviceType}</label>
                    <select value={payService} onChange={(e) => setPayService(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow">
                      <option value="tuition">{t.services.tuition.title}</option>
                      <option value="translation">{t.services.translation.title}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.payment.form.amount}</label>
                    <div className="relative">
                      <input type="number" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" />
                      <div className="absolute right-4 top-3.5 text-slate-400 font-bold">UAH</div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.payment.form.clientName}</label>
                    <input type="text" value={payName} onChange={(e) => setPayName(e.target.value)} placeholder="John Doe" className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.payment.form.clientEmail}</label>
                      <input type="email" value={payEmail} onChange={(e) => setPayEmail(e.target.value)} placeholder="email@example.com" className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" required />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t.payment.form.clientPhone}</label>
                      <input type="tel" value={payPhone} onChange={(e) => setPayPhone(e.target.value)} className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow" required />
                    </div>
                  </div>
                  
                  <button type="button" onClick={handlePaymentSubmit} className="w-full py-4 mt-4 bg-[#78B43E] hover:bg-[#689d36] text-white rounded-xl font-extrabold text-lg transition-all shadow-md flex justify-center items-center gap-2">
                    <CreditCard className="w-6 h-6" /> {t.payment.form.submit} ({Number(payAmount).toLocaleString()} UAH)
                  </button>
                  
                  <p className="text-center text-xs text-slate-400 mt-4">{t.payment.form.disclaimer}</p>

                  {/* ERROR DISPLAY BOX (Claude's Fix Location) */}
                  {paymentError && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start text-red-800 animate-in fade-in duration-300">
                      <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 text-red-600" />
                      <div>
                        <h4 className="font-bold text-sm text-red-900">
                          {currentLang === 'uk' ? 'Помилка ініціалізації' : 'Initialization Error'}
                        </h4>
                        <p className="text-sm mt-1">{paymentError}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-6 h-6 text-blue-500" />
                <span className="text-xl font-bold text-white tracking-tight">Sheridan <span className="text-blue-500">LS</span></span>
              </div>
              <p className="text-slate-400 max-w-sm mb-6">{t.footer.desc}</p>
            </div>
            
            <div className="md:text-right">
              <h4 className="text-white font-bold mb-4">{t.footer.contacts}</h4>
              <div className="space-y-3 flex flex-col md:items-end">
                <a href="mailto:davemcfc@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-slate-500" /> davemcfc@gmail.com
                </a>
                <a href="tel:+380970627640" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-slate-500" /> +380 970 627 640
                </a>
                
                {/* Editable Registration Address Block */}
                <div className="flex items-start gap-2 max-w-xs md:text-right md:justify-end mt-2">
                  <MapPin className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                  {isEditingAddress ? (
                    <div className="flex flex-col gap-2 w-full">
                      <textarea 
                        value={regAddress}
                        onChange={(e) => setRegAddress(e.target.value)}
                        className="bg-slate-800 text-white border border-slate-700 rounded-lg p-2 text-sm w-full focus:outline-none focus:border-blue-500"
                        rows="3"
                        placeholder={t.footer.addressPlaceholder}
                      />
                      <button type="button" onClick={() => setIsEditingAddress(false)} className="text-xs bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded self-end">
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 group">
                      <span className="text-sm text-slate-400 leading-tight">{regAddress}</span>
                      <button type="button" onClick={() => setIsEditingAddress(true)} className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-slate-800 rounded" title={t.footer.addressEdit}>
                        <Edit2 className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <div>&copy; {new Date().getFullYear()} {t.footer.legal}. {t.footer.rights}</div>
          </div>
        </div>
      </footer>
    </div>
  ); 
}
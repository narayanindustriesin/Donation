'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type Language = 'en' | 'hi' | 'es';
type Plan = 'oneTime' | 'monthly';

const copy = {
  en: {
    navAbout: 'About',
    title: 'Donate to Narayan Foundation',
    subtitle: 'Powering Vision United World projects in education, health, and climate action.',
    choosePlan: 'Choose donation type',
    oneTime: 'One-Time',
    monthly: 'Monthly',
    amount: 'Choose amount',
    customAmount: 'Custom amount',
    payWith: 'Pay securely with',
    razorpay: 'Razorpay',
    paypal: 'PayPal',
    impactTitle: 'Your impact',
    impact1: '$25 supports 50 meals',
    impact2: '$60 funds school kits for 6 students',
    impact3: '$150 supports a community health camp',
    language: 'Language'
  },
  hi: {
    navAbout: 'परिचय',
    title: 'नारायण फाउंडेशन को दान दें',
    subtitle: 'Vision United World के शिक्षा, स्वास्थ्य और जलवायु प्रोजेक्ट्स को सहयोग दें।',
    choosePlan: 'दान प्रकार चुनें',
    oneTime: 'एक बार',
    monthly: 'मासिक',
    amount: 'राशि चुनें',
    customAmount: 'कस्टम राशि',
    payWith: 'सुरक्षित भुगतान',
    razorpay: 'रेज़रपे',
    paypal: 'पेपाल',
    impactTitle: 'आपका प्रभाव',
    impact1: '$25 से 50 भोजन',
    impact2: '$60 से 6 छात्रों की किट',
    impact3: '$150 से स्वास्थ्य शिविर',
    language: 'भाषा'
  },
  es: {
    navAbout: 'Acerca de',
    title: 'Donar a Narayan Foundation',
    subtitle: 'Impulsando proyectos de Vision United World en educación, salud y clima.',
    choosePlan: 'Elegir tipo de donación',
    oneTime: 'Única',
    monthly: 'Mensual',
    amount: 'Elegir monto',
    customAmount: 'Monto personalizado',
    payWith: 'Pagar con seguridad',
    razorpay: 'Razorpay',
    paypal: 'PayPal',
    impactTitle: 'Tu impacto',
    impact1: '$25 apoya 50 comidas',
    impact2: '$60 financia kits escolares para 6 estudiantes',
    impact3: '$150 apoya un campamento de salud',
    language: 'Idioma'
  }
};

const amounts = [25, 60, 150, 300];

export default function DonationPortal() {
  const [lang, setLang] = useState<Language>('en');
  const [plan, setPlan] = useState<Plan>('oneTime');
  const [selectedAmount, setSelectedAmount] = useState<number>(60);
  const [customAmount, setCustomAmount] = useState<string>('');

  const t = copy[lang];
  const finalAmount = useMemo(() => Number(customAmount) || selectedAmount, [customAmount, selectedAmount]);

  const startPayment = (provider: 'razorpay' | 'paypal') => {
    const mode = plan === 'monthly' ? 'monthly' : 'onetime';
    const params = new URLSearchParams({ amount: String(finalAmount), mode });
    if (provider === 'razorpay') {
      window.open(`https://rzp.io/l/demo-link?${params.toString()}`, '_blank');
      return;
    }
    window.open(`https://www.paypal.com/donate/?hosted_button_id=DEMO123&${params.toString()}`, '_blank');
  };

  return (
    <main className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <strong>Narayan Foundation</strong>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <label htmlFor="lang">{t.language}</label>
          <select id="lang" value={lang} onChange={(e) => setLang(e.target.value as Language)}>
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="es">Español</option>
          </select>
          <Link href="/about">{t.navAbout}</Link>
        </div>
      </div>

      <div className="card">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>

        <h3>{t.choosePlan}</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className={`btn ${plan === 'oneTime' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPlan('oneTime')}>{t.oneTime}</button>
          <button className={`btn ${plan === 'monthly' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setPlan('monthly')}>{t.monthly}</button>
        </div>

        <h3 style={{ marginTop: '1.2rem' }}>{t.amount}</h3>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {amounts.map((amt) => (
            <button key={amt} className={`btn ${selectedAmount === amt ? 'btn-primary' : 'btn-secondary'}`} onClick={() => {setSelectedAmount(amt); setCustomAmount('');}}>
              ${amt}
            </button>
          ))}
          <input
            type="number"
            min="1"
            placeholder={t.customAmount}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            style={{ padding: '0.7rem', borderRadius: 10, border: '1px solid #d1d5db', width: 170 }}
          />
        </div>

        <h3 style={{ marginTop: '1.2rem' }}>{t.payWith}</h3>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" onClick={() => startPayment('razorpay')}>{t.razorpay}</button>
          <button className="btn btn-secondary" onClick={() => startPayment('paypal')}>{t.paypal}</button>
        </div>
      </div>

      <div className="card" style={{ marginTop: '1rem' }}>
        <h2>{t.impactTitle}</h2>
        <ul>
          <li>{t.impact1}</li>
          <li>{t.impact2}</li>
          <li>{t.impact3}</li>
        </ul>
      </div>
    </main>
  );
}

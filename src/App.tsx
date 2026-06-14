import { useState, useEffect } from 'react';
import { Check, ChevronRight, ShoppingBag, Phone, MapPin, ArrowLeft, Leaf, Star, Shield, Package } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type GheeType = 'Cow Ghee' | 'Buffalo Ghee' | 'Classic Ghee';
type SizeOption = '250ml' | '500ml' | '1 Liter';
type PackingType = 'Jar Packing' | 'Pouch Packing';
type Step = 'loading' | 'home' | 'ghee-type' | 'size' | 'packing' | 'details' | 'success';

interface OrderState {
  gheeType: GheeType | null;
  size: SizeOption | null;
  packing: PackingType | null;
  doorNo: string;
  mobile: string;
}

// ─── Loading Screen ───────────────────────────────────────────────────────────

function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [textIdx, setTextIdx] = useState(0);

  const loadingTexts = [
    'Sourcing pure ingredients...',
    'Preparing fresh ghee...',
    'Crafting with tradition...',
    'Almost ready for you...',
  ];

  useEffect(() => {
    let p = 0;
    const interval = setInterval(() => {
      p += 1.4;
      setProgress(Math.min(p, 100));
      setTextIdx(Math.min(Math.floor((p / 100) * loadingTexts.length), loadingTexts.length - 1));
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(onDone, 400);
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-[#7f0000] via-[#a00000] to-[#5c0000] overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-100px] right-[-100px] w-72 h-72 rounded-full bg-amber-500 opacity-10" />
      <div className="absolute bottom-[-80px] left-[-80px] w-64 h-64 rounded-full bg-yellow-400 opacity-10" />
      <div className="absolute top-1/2 right-[-80px] w-48 h-48 rounded-full bg-amber-300 opacity-8" />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-amber-400 opacity-15"
          style={{
            width: `${8 + i * 5}px`,
            height: `${8 + i * 5}px`,
            left: `${8 + i * 11}%`,
            top: `${15 + (i % 4) * 18}%`,
            animation: `droplet ${2 + i * 0.25}s ease-in-out infinite`,
            animationDelay: `${i * 0.35}s`,
          }}
        />
      ))}

      <div className="flex flex-col items-center w-full px-6">
        {/* Logo */}
        <div className="relative flex justify-center mb-8 lg:mb-10">
          <div className="absolute w-44 h-44 lg:w-52 lg:h-52 rounded-full border-2 border-amber-400 opacity-25 pulse-ring" />
          <div className="absolute w-44 h-44 lg:w-52 lg:h-52 rounded-full border-2 border-amber-400 opacity-15 pulse-ring" style={{ animationDelay: '0.6s' }} />
          <div className="w-36 h-36 lg:w-44 lg:h-44 rounded-full bg-white shadow-2xl flex items-center justify-center animate-droplet">
            <img src="/image.png" alt="SK Ghee" className="w-28 h-28 lg:w-36 lg:h-36 object-contain rounded-full" />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center mb-3 animate-fade-in-up">
          <h1 className="text-5xl lg:text-7xl font-display font-black text-white tracking-tight drop-shadow-lg">
            SK <span className="text-amber-400">GHEE</span>
          </h1>
          <p className="text-amber-200 text-sm lg:text-base mt-1.5 tracking-widest uppercase font-medium">
            Shop No. A105 · Erode's Traditional Ghee
          </p>
        </div>

        {/* Wave bars */}
        <div className="flex items-end gap-1.5 my-7 h-10">
          {[1, 0.65, 1, 0.65, 1].map((h, i) => (
            <div
              key={i}
              className="w-2 lg:w-2.5 rounded-full bg-amber-400 wave-bar"
              style={{ height: `${h * 32}px`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>

        {/* Progress */}
        <div className="w-72 lg:w-96">
          <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-amber-200 text-xs lg:text-sm text-center mt-2.5 font-medium tracking-wide">
            {loadingTexts[textIdx]}
          </p>
        </div>
      </div>

      <p className="text-white/35 text-xs absolute bottom-8 tracking-widest uppercase">
        100% Natural · No Additives
      </p>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────

function SiteHeader({ showBack, onBack }: { showBack?: boolean; onBack?: () => void }) {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBack && onBack && (
            <button
              onClick={onBack}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 mr-1"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <img src="/image.png" alt="SK" className="w-9 h-9 rounded-full object-cover shadow" />
          <div>
            <p className="font-display font-bold text-[#7f0000] text-base leading-tight">SK Ghee</p>
            <p className="text-xs text-gray-400 leading-tight hidden sm:block">Shop No. A105 · Erode, Tamil Nadu</p>
            <p className="text-xs text-gray-400 leading-tight sm:hidden">Shop No. A105</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="tel:+919944920584"
            className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#a00000] transition-colors font-medium"
          >
            <Phone size={13} />
            +91 99449 20584
          </a>
          <div className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-3 py-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-green-800 font-semibold">Open</span>
          </div>
        </div>
      </div>
    </header>
  );
}

// ─── Step Progress ────────────────────────────────────────────────────────────

const STEP_KEYS: Step[] = ['ghee-type', 'size', 'packing', 'details'];
const STEP_LABELS = ['Ghee Type', 'Quantity', 'Packing', 'Details'];

function StepProgress({ current }: { current: Step }) {
  const idx = STEP_KEYS.indexOf(current);
  return (
    <div className="bg-white border-b border-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-0">
          {STEP_LABELS.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < idx
                      ? 'bg-green-500 text-white'
                      : i === idx
                      ? 'bg-[#a00000] text-white scale-110 shadow-md'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {i < idx ? <Check size={13} /> : i + 1}
                </div>
                <span className={`text-[10px] sm:text-xs font-medium whitespace-nowrap ${i <= idx ? 'text-gray-700' : 'text-gray-400'}`}>
                  {label}
                </span>
              </div>
              {i < 3 && (
                <div className={`h-0.5 w-8 sm:w-14 lg:w-20 mx-1 mb-4 rounded-full transition-all duration-500 ${i < idx ? 'bg-green-400' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

function HomePage({ onOrder }: { onOrder: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbf2] via-[#fef9ee] to-[#fef3c7]">
      <SiteHeader />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="animate-fade-in-up order-2 lg:order-1">
            <span className="inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-3 py-1.5 rounded-full mb-4 tracking-wider uppercase">
              Erode's Traditional Ghee
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a0a00] leading-tight mb-4">
              Pure Goodness,<br />
              <span className="text-[#a00000]">Delivered</span> to Your Door
            </h1>
            <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Handcrafted from 100% natural milk. No additives, no preservatives.
              Just pure, aromatic ghee made the traditional way in Erode.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: <Leaf size={15} className="text-green-600" />, label: 'All Natural', bg: 'bg-green-50 border-green-100' },
                { icon: <Shield size={15} className="text-blue-600" />, label: 'FSSAI Certified', bg: 'bg-blue-50 border-blue-100' },
                { icon: <Star size={15} className="text-amber-600" />, label: 'Premium Quality', bg: 'bg-amber-50 border-amber-100' },
                { icon: <Package size={15} className="text-purple-600" />, label: 'Jar & Pouch', bg: 'bg-purple-50 border-purple-100' },
              ].map(({ icon, label, bg }) => (
                <div key={label} className={`flex items-center gap-2 ${bg} border rounded-full px-3 py-1.5`}>
                  {icon}
                  <span className="text-xs font-semibold text-gray-700">{label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onOrder}
                className="flex-1 lg:flex-none bg-gradient-to-r from-[#a00000] to-[#c41230] text-white font-bold text-base lg:text-lg py-4 px-8 rounded-2xl shadow-lg shadow-red-200 flex items-center justify-center gap-2.5 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
              >
                <ShoppingBag size={20} />
                Order Now
                <ChevronRight size={18} />
              </button>
              <a
                href="tel:+919944920584"
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 bg-white border-2 border-amber-200 text-gray-700 font-semibold py-4 px-6 rounded-2xl hover:border-amber-400 transition-colors text-sm lg:text-base"
              >
                <Phone size={16} className="text-[#a00000]" />
                Call to Order
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3 flex items-center gap-1.5">
              <Check size={12} className="text-green-500" />
              Cash on Delivery — No online payment needed
            </p>
          </div>

          {/* Right: Product visual */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end animate-float-slow">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-200 rounded-full blur-3xl opacity-50 scale-90" />
              <div className="relative bg-gradient-to-br from-[#a00000] to-[#7f0000] rounded-3xl lg:rounded-[2rem] p-6 lg:p-8 shadow-2xl">
                <img
                  src="/image.png"
                  alt="SK Ghee Products"
                  className="w-52 h-52 sm:w-64 sm:h-64 lg:w-80 lg:h-80 object-contain drop-shadow-2xl"
                />
              </div>
              <div className="absolute -top-4 -right-4 bg-amber-400 text-[#7f0000] rounded-2xl px-3 py-2 shadow-lg">
                <p className="text-xs font-black leading-tight">100%</p>
                <p className="text-xs font-black leading-tight">PURE</p>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg border border-amber-100">
                <p className="text-xs font-semibold text-gray-700">FSSAI Lic No.</p>
                <p className="text-xs text-gray-500">12425007000716</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1a0a00]">Our Products</h2>
          <p className="text-gray-500 text-sm lg:text-base mt-2">Choose from our range of premium ghee varieties</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6 mb-10">
          {[
            {
              name: 'Cow Ghee',
              desc: 'Made from 100% pure cow milk. Light aroma, easy to digest.',
              note: 'Light & Healthy',
              color: 'text-green-700',
              bg: 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-100',
              dot: 'bg-green-500',
            },
            {
              name: 'Buffalo Ghee',
              desc: 'Rich, creamy texture from pure buffalo milk. Full-bodied flavor.',
              note: 'Rich & Creamy',
              color: 'text-blue-700',
              bg: 'bg-gradient-to-br from-blue-50 to-sky-50 border-blue-100',
              dot: 'bg-blue-500',
            },
            {
              name: 'Classic Ghee',
              desc: 'SK\'s signature traditional blend. Balanced and aromatic.',
              note: 'Best Seller',
              color: 'text-amber-700',
              bg: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-100',
              dot: 'bg-amber-500',
            },
          ].map(({ name, desc, note, color, bg, dot }) => (
            <div key={name} className={`rounded-2xl border p-5 lg:p-6 ${bg} hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-lg font-black ${color}`}>
                  {name[0]}
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full bg-white ${color}`}>{note}</span>
              </div>
              <h3 className="font-display font-bold text-gray-800 text-lg mb-1.5">{name}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-3">{desc}</p>
              <div className="flex items-center gap-2">
                {['250ml', '500ml', '1 Liter'].map((s) => (
                  <span key={s} className="text-[11px] bg-white text-gray-500 border border-gray-200 rounded-full px-2 py-0.5 font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA banner */}
        <div className="bg-gradient-to-r from-[#a00000] to-[#c41230] rounded-3xl p-6 lg:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl shadow-red-200">
          <div className="text-center sm:text-left">
            <h3 className="font-display text-xl lg:text-2xl font-bold text-white mb-1">
              Ready to order?
            </h3>
            <p className="text-red-100 text-sm">
              Doorstep delivery · Cash on Delivery · Available in Jar &amp; Pouch
            </p>
          </div>
          <button
            onClick={onOrder}
            className="bg-white text-[#a00000] font-bold py-3 px-8 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 whitespace-nowrap text-sm lg:text-base"
          >
            <ShoppingBag size={18} />
            Order Now
          </button>
        </div>
      </section>

      <footer className="border-t border-amber-100 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <img src="/image.png" alt="SK" className="w-6 h-6 rounded-full" />
            <span className="font-medium text-gray-500">SK Ghee · Shop No. A105 · Erode, Tamil Nadu</span>
          </div>
          <a href="tel:+919944920584" className="hover:text-[#a00000] transition-colors">+91 99449 20584</a>
        </div>
      </footer>
    </div>
  );
}

// ─── Step Page Wrapper ────────────────────────────────────────────────────────

function StepLayout({
  title,
  subtitle,
  step,
  onBack,
  children,
  aside,
}: {
  title: string;
  subtitle: string;
  step: Step;
  onBack: () => void;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbf2] via-[#fef9ee] to-[#fef3c7]">
      <SiteHeader showBack onBack={onBack} />
      <StepProgress current={step} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className={`grid grid-cols-1 ${aside ? 'lg:grid-cols-3' : ''} gap-8 lg:gap-12`}>
          {/* Main form column */}
          <div className={aside ? 'lg:col-span-2' : 'max-w-2xl mx-auto w-full'}>
            <div className="mb-6 step-enter">
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#1a0a00]">{title}</h2>
              <p className="text-gray-500 text-sm sm:text-base mt-1">{subtitle}</p>
            </div>
            {children}
          </div>

          {/* Aside column (desktop only) */}
          {aside && (
            <div className="hidden lg:block">
              {aside}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Order Summary Aside ──────────────────────────────────────────────────────

function OrderAside({ order }: { order: OrderState }) {
  const rows = [
    { label: 'Ghee Type', value: order.gheeType },
    { label: 'Quantity', value: order.size },
    { label: 'Packing', value: order.packing },
  ].filter((r) => r.value);

  return (
    <div className="sticky top-32">
      <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-5 mb-4">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingBag size={16} className="text-[#a00000]" />
          <p className="text-sm font-bold text-gray-700">Your Order</p>
        </div>
        {rows.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">Nothing selected yet</p>
        ) : (
          <div className="space-y-2">
            {rows.map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-500">{label}</span>
                <span className="text-xs font-semibold text-gray-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                  {value}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 bg-amber-50 rounded-xl p-3 flex items-start gap-2">
          <Check size={13} className="text-amber-600 mt-0.5 shrink-0" />
          <p className="text-xs text-amber-700 font-medium">Cash on Delivery — Pay when you receive your order</p>
        </div>
      </div>

      {/* Contact */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <p className="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Need help?</p>
        <a href="tel:+919944920584" className="flex items-center gap-2.5 text-sm text-gray-700 hover:text-[#a00000] transition-colors font-medium">
          <div className="w-8 h-8 bg-red-50 rounded-xl flex items-center justify-center">
            <Phone size={14} className="text-[#a00000]" />
          </div>
          +91 99449 20584
        </a>
      </div>
    </div>
  );
}

// ─── Ghee Type Step ───────────────────────────────────────────────────────────

const GHEE_TYPES = [
  {
    type: 'Cow Ghee' as GheeType,
    desc: 'Made from 100% pure cow milk',
    note: 'Light aroma · Easy to digest',
    color: 'text-green-700',
    bg: 'from-green-50 to-emerald-50 border-green-200',
    activeBg: 'from-green-100 to-emerald-100',
  },
  {
    type: 'Buffalo Ghee' as GheeType,
    desc: 'Rich creamy texture from buffalo milk',
    note: 'Full-bodied · High in fat',
    color: 'text-blue-700',
    bg: 'from-blue-50 to-sky-50 border-blue-200',
    activeBg: 'from-blue-100 to-sky-100',
  },
  {
    type: 'Classic Ghee' as GheeType,
    desc: 'SK signature traditional blend',
    note: 'Balanced flavour · Best seller',
    color: 'text-amber-700',
    bg: 'from-amber-50 to-yellow-50 border-amber-200',
    activeBg: 'from-amber-100 to-yellow-100',
  },
];

function GheeTypeStep({ selected, onSelect, onNext, onBack, order }: {
  selected: GheeType | null;
  onSelect: (t: GheeType) => void;
  onNext: () => void;
  onBack: () => void;
  order: OrderState;
}) {
  return (
    <StepLayout
      title="Choose Ghee Type"
      subtitle="Select the ghee variety you'd like to order"
      step="ghee-type"
      onBack={onBack}
      aside={<OrderAside order={order} />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-4 mb-8 step-enter">
        {GHEE_TYPES.map(({ type, desc, note, color, bg }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`option-card w-full text-left p-4 lg:p-5 rounded-2xl border-2 bg-gradient-to-br ${bg} ${
              selected === type ? 'selected border-amber-500' : 'border-transparent'
            }`}
          >
            <div className="flex sm:flex-col lg:flex-col xl:flex-col items-start sm:items-center lg:items-center gap-3 sm:gap-2">
              <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl font-black ${color} shrink-0`}>
                {type[0]}
              </div>
              <div className="flex-1 sm:text-center lg:text-center">
                <p className="font-bold text-gray-800 text-base">{type}</p>
                <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                <p className={`text-xs font-semibold mt-1.5 ${color}`}>{note}</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ml-auto sm:ml-0 transition-all ${selected === type ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                {selected === type && <Check size={11} className="text-white" strokeWidth={3} />}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full sm:w-auto bg-gradient-to-r from-[#a00000] to-[#c41230] disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:text-gray-400 text-base"
      >
        Continue <ChevronRight size={18} />
      </button>
    </StepLayout>
  );
}

// ─── Size Step ────────────────────────────────────────────────────────────────

const SIZES = [
  { size: '250ml' as SizeOption, ml: '250', ideal: 'Great for trying', badge: '' },
  { size: '500ml' as SizeOption, ml: '500', ideal: 'Most popular', badge: 'HOT' },
  { size: '1 Liter' as SizeOption, ml: '1000', ideal: 'Best value', badge: '' },
];

function SizeStep({ selected, onSelect, onNext, onBack, order }: {
  selected: SizeOption | null;
  onSelect: (s: SizeOption) => void;
  onNext: () => void;
  onBack: () => void;
  order: OrderState;
}) {
  return (
    <StepLayout
      title="Select Quantity"
      subtitle="Choose the pack size that suits you best"
      step="size"
      onBack={onBack}
      aside={<OrderAside order={order} />}
    >
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-8 step-enter">
        {SIZES.map(({ size, ml, ideal, badge }) => (
          <button
            key={size}
            onClick={() => onSelect(size)}
            className={`option-card flex flex-col items-center py-5 sm:py-7 px-2 sm:px-4 rounded-2xl border-2 bg-white ${
              selected === size ? 'selected border-amber-500 bg-amber-50' : 'border-gray-100 hover:border-amber-200'
            }`}
          >
            <div className="relative mb-3">
              <svg width="44" height="52" viewBox="0 0 44 52" fill="none">
                <rect x="9" y="7" width="26" height="5" rx="2.5" fill={selected === size ? '#f59e0b' : '#d1d5db'} />
                <rect x="5" y="11" width="34" height="34" rx="7" fill={selected === size ? '#fef3c7' : '#f3f4f6'} />
                <rect x="5" y="11" width="34" height="34" rx="7" stroke={selected === size ? '#f59e0b' : '#e5e7eb'} strokeWidth="1.5" />
                <ellipse cx="22" cy="28" rx="11" ry="7" fill={selected === size ? '#fbbf24' : '#e5e7eb'} opacity="0.6" />
                <rect x="11" y="3" width="22" height="5" rx="2.5" fill={selected === size ? '#d97706' : '#9ca3af'} />
              </svg>
              {badge && (
                <span className="absolute -top-1 -right-2 bg-[#a00000] text-white text-[8px] font-black rounded-full px-1.5 py-0.5 leading-tight">
                  {badge}
                </span>
              )}
            </div>
            <p className={`text-lg sm:text-xl font-bold ${selected === size ? 'text-amber-700' : 'text-gray-700'}`}>
              {ml}<span className="text-xs font-normal ml-0.5">ml</span>
            </p>
            <p className={`text-[10px] sm:text-xs mt-1 font-medium ${selected === size ? 'text-amber-600' : 'text-gray-400'}`}>
              {ideal}
            </p>
            <div className={`w-4 h-4 rounded-full border-2 mt-2.5 flex items-center justify-center transition-all ${selected === size ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
              {selected === size && <Check size={9} className="text-white" strokeWidth={3} />}
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full sm:w-auto bg-gradient-to-r from-[#a00000] to-[#c41230] disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:text-gray-400 text-base"
      >
        Continue <ChevronRight size={18} />
      </button>
    </StepLayout>
  );
}

// ─── Packing Step ─────────────────────────────────────────────────────────────

const PACKINGS = [
  { type: 'Jar Packing' as PackingType, icon: '🫙', desc: 'Rigid glass/plastic jar with secure lid', feature: 'Reusable · Air-tight seal · Easy to handle' },
  { type: 'Pouch Packing' as PackingType, icon: '🛍️', desc: 'Sealed food-grade flexible pouch', feature: 'Lightweight · Easy to store · Space-saving' },
];

function PackingStep({ selected, onSelect, onNext, onBack, order }: {
  selected: PackingType | null;
  onSelect: (p: PackingType) => void;
  onNext: () => void;
  onBack: () => void;
  order: OrderState;
}) {
  return (
    <StepLayout
      title="Choose Packing"
      subtitle="Select your preferred packaging type"
      step="packing"
      onBack={onBack}
      aside={<OrderAside order={order} />}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 step-enter">
        {PACKINGS.map(({ type, icon, desc, feature }) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={`option-card w-full text-left p-5 lg:p-6 rounded-2xl border-2 bg-white ${
              selected === type ? 'selected border-amber-500 bg-amber-50' : 'border-gray-100 hover:border-amber-200'
            }`}
          >
            <div className="flex items-center gap-4 sm:flex-col sm:items-start">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-3xl sm:text-4xl shadow-sm shrink-0">
                {icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-gray-800 text-base">{type}</p>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${selected === type ? 'bg-amber-500 border-amber-500' : 'border-gray-300'}`}>
                    {selected === type && <Check size={11} className="text-white" strokeWidth={3} />}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
                <p className="text-xs text-amber-600 font-semibold mt-2">{feature}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={onNext}
        disabled={!selected}
        className="w-full sm:w-auto bg-gradient-to-r from-[#a00000] to-[#c41230] disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-red-100 flex items-center justify-center gap-2 transition-all hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:text-gray-400 text-base"
      >
        Continue <ChevronRight size={18} />
      </button>
    </StepLayout>
  );
}

// ─── Details Step ─────────────────────────────────────────────────────────────

function DetailsStep({ order, onDoorNo, onMobile, onPlace, onBack }: {
  order: OrderState;
  onDoorNo: (v: string) => void;
  onMobile: (v: string) => void;
  onPlace: () => void;
  onBack: () => void;
}) {
  const valid =
    order.doorNo.trim().length >= 2 &&
    /^\d{10}$/.test(order.mobile.trim());

  return (
    <StepLayout
      title="Delivery Details"
      subtitle="Enter your address and contact number"
      step="details"
      onBack={onBack}
      aside={<OrderAside order={order} />}
    >
      <div className="step-enter">
        {/* Order summary card */}
        <div className="bg-white rounded-2xl border border-amber-100 shadow-sm p-4 sm:p-5 mb-6 lg:hidden">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Your Order Summary</p>
          {[
            { label: 'Ghee Type', value: order.gheeType },
            { label: 'Quantity', value: order.size },
            { label: 'Packing', value: order.packing },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-semibold text-gray-800">{value}</span>
            </div>
          ))}
          <div className="mt-3 bg-amber-50 rounded-xl p-3 flex items-center gap-2">
            <Check size={13} className="text-amber-600 shrink-0" />
            <p className="text-xs font-semibold text-amber-700">Cash on Delivery</p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <MapPin size={15} className="text-[#a00000]" />
                Door / Flat Number
              </label>
              <input
                type="text"
                value={order.doorNo}
                onChange={(e) => onDoorNo(e.target.value)}
                placeholder="e.g. Door No 12, Flat 3B, A105..."
                className="w-full border-2 border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white text-gray-800 placeholder-gray-400"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                <Phone size={15} className="text-[#a00000]" />
                Mobile Number
              </label>
              <div className="flex gap-2">
                <div className="border-2 border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-500 bg-gray-50 font-semibold shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  value={order.mobile}
                  onChange={(e) => onMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="10-digit mobile number"
                  className="flex-1 border-2 border-gray-200 focus:border-amber-500 rounded-xl px-4 py-3 text-sm outline-none transition-colors bg-white text-gray-800 placeholder-gray-400"
                />
              </div>
              {order.mobile.length > 0 && order.mobile.length < 10 && (
                <p className="text-xs text-red-500 mt-1.5 ml-1">Please enter a valid 10-digit number</p>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onPlace}
          disabled={!valid}
          className="whatsapp-btn w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 px-8 rounded-2xl flex items-center justify-center gap-3 text-base"
        >
          <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          Place Order via WhatsApp
        </button>
        <p className="text-xs text-gray-400 mt-2.5">
          Your order details will be sent to us via WhatsApp
        </p>
      </div>
    </StepLayout>
  );
}

// ─── Success Screen ───────────────────────────────────────────────────────────

function SuccessScreen({ order, onNewOrder }: { order: OrderState; onNewOrder: () => void }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fffbf2] via-[#fef9ee] to-[#fef3c7]">
      <SiteHeader />
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center animate-scale-in">
        <div className="relative flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center shadow-lg">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Check size={30} className="text-white" strokeWidth={3} />
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-4 border-green-300 opacity-40 pulse-ring" />
          </div>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-black text-[#1a0a00] mb-2">Order Placed!</h2>
        <p className="text-gray-600 text-sm sm:text-base mb-8 max-w-sm mx-auto">
          Your order has been sent to SK Ghee via WhatsApp. We'll confirm your delivery shortly.
        </p>

        <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-5 sm:p-6 mb-6 text-left">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Order Summary</p>
          {[
            { label: 'Ghee Type', value: order.gheeType },
            { label: 'Quantity', value: order.size },
            { label: 'Packing', value: order.packing },
            { label: 'Door No.', value: order.doorNo },
            { label: 'Mobile', value: `+91 ${order.mobile}` },
            { label: 'Payment', value: 'Cash on Delivery' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className="text-sm font-semibold text-gray-800">{value}</span>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6">
          <p className="text-sm text-amber-800">
            Our team will contact you at <strong>+91 {order.mobile}</strong> to confirm delivery.
          </p>
        </div>

        <button
          onClick={onNewOrder}
          className="w-full bg-gradient-to-r from-[#a00000] to-[#c41230] text-white font-bold py-4 rounded-2xl shadow-lg shadow-red-100 transition-all hover:shadow-xl hover:-translate-y-0.5 text-base"
        >
          Place Another Order
        </button>
      </div>
    </div>
  );
}

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [step, setStep] = useState<Step>('loading');
  const [order, setOrder] = useState<OrderState>({
    gheeType: null,
    size: null,
    packing: null,
    doorNo: '',
    mobile: '',
  });

  const reset = () => {
    setOrder({ gheeType: null, size: null, packing: null, doorNo: '', mobile: '' });
    setStep('home');
  };

  const handlePlaceOrder = () => {
    const msg =
      `*New Order — SK Ghee*\n\n` +
      `*Ghee Type:* ${order.gheeType}\n` +
      `*Quantity:* ${order.size}\n` +
      `*Packing:* ${order.packing}\n` +
      `*Door No:* ${order.doorNo}\n` +
      `*Mobile:* +91 ${order.mobile}\n` +
      `*Payment:* Cash on Delivery\n\n` +
      `_Order placed via SK Ghee website_`;

    window.open(`https://wa.me/919944920584?text=${encodeURIComponent(msg)}`, '_blank');
    setStep('success');
  };

  if (step === 'loading') return <LoadingScreen onDone={() => setStep('home')} />;
  if (step === 'home') return <HomePage onOrder={() => setStep('ghee-type')} />;

  if (step === 'ghee-type')
    return (
      <GheeTypeStep
        selected={order.gheeType}
        onSelect={(t) => setOrder((o) => ({ ...o, gheeType: t }))}
        onNext={() => setStep('size')}
        onBack={() => setStep('home')}
        order={order}
      />
    );

  if (step === 'size')
    return (
      <SizeStep
        selected={order.size}
        onSelect={(s) => setOrder((o) => ({ ...o, size: s }))}
        onNext={() => setStep('packing')}
        onBack={() => setStep('ghee-type')}
        order={order}
      />
    );

  if (step === 'packing')
    return (
      <PackingStep
        selected={order.packing}
        onSelect={(p) => setOrder((o) => ({ ...o, packing: p }))}
        onNext={() => setStep('details')}
        onBack={() => setStep('size')}
        order={order}
      />
    );

  if (step === 'details')
    return (
      <DetailsStep
        order={order}
        onDoorNo={(v) => setOrder((o) => ({ ...o, doorNo: v }))}
        onMobile={(v) => setOrder((o) => ({ ...o, mobile: v }))}
        onPlace={handlePlaceOrder}
        onBack={() => setStep('packing')}
      />
    );

  if (step === 'success')
    return <SuccessScreen order={order} onNewOrder={reset} />;

  return null;
}

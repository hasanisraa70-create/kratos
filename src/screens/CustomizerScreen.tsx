import React, { useState } from 'react';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Sliders, 
  Sparkles, 
  HelpCircle, 
  ShoppingBag, 
  ShieldCheck, 
  RotateCw,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Insole3DViewer } from '../components/3d/Insole3DViewer';
import { PRODUCTS, COLORWAYS } from '../data/mockData';
import { ProductColor } from '../types';

export const CustomizerScreen: React.FC = () => {
  const {
    customBuild,
    updateCustomBuild,
    addToCart,
    setCurrentScreen,
    showToast,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [current3DAngle, setCurrent3DAngle] = useState<'perspective' | 'top' | 'bottom' | 'side' | 'heel'>('perspective');

  const steps = [
    { num: 1, label: 'System', title: 'Select Base System' },
    { num: 2, label: 'Size', title: 'Footwear Sizing' },
    { num: 3, label: 'Color', title: 'Colorway' },
    { num: 4, label: 'Tuning', title: 'Biomechanical Calibration' },
    { num: 5, label: 'Summary', title: 'Review & Build' },
  ];

  const availableSizes = [
    'US M 7 / W 8.5',
    'US M 7.5 / W 9',
    'US M 8 / W 9.5',
    'US M 8.5 / W 10',
    'US M 9 / W 10.5',
    'US M 9.5 / W 11',
    'US M 10 / W 11.5',
    'US M 10.5 / W 12',
    'US M 11 / W 12.5',
    'US M 12 / W 13.5',
    'US M 13 / W 14.5',
  ];

  const handleStepChange = (newStep: 1 | 2 | 3 | 4 | 5) => {
    setStep(newStep);
    // Auto-focus camera for optimal view in each step
    if (newStep === 3) setCurrent3DAngle('top');
    else if (newStep === 4) setCurrent3DAngle('heel');
    else if (newStep === 5) setCurrent3DAngle('perspective');
    else setCurrent3DAngle('perspective');
  };

  const handleFinishAndCheckout = () => {
    addToCart({
      productId: customBuild.productId,
      name: `Custom ${customBuild.productName}`,
      price: customBuild.totalPrice,
      image: customBuild.productId.includes('carbon') ? PRODUCTS[0].image : PRODUCTS[1].image,
      size: `${customBuild.size} (${customBuild.width})`,
      colorName: customBuild.color.name,
      colorHex: customBuild.color.hex,
      quantity: 1,
      customizationDetails: {
        arch: `${customBuild.archHeight} Arch`,
        flex: `${customBuild.flexStiffness} Flex`,
        engraving: customBuild.laserEngravingText.trim() || undefined,
      },
    });
    showToast('Custom insole ready! Proceeding to checkout...');
    setCurrentScreen('checkout');
  };

  return (
    <div
      className={`flex-1 flex flex-col pb-48 transition-colors ${
        isLight ? 'bg-[#F9FAFB] text-gray-900' : 'bg-[#101010] text-white'
      }`}
    >
      {/* TOP HEADER */}
      <div
        className={`sticky top-0 z-40 backdrop-blur-md px-4 py-3 border-b flex items-center justify-between transition-colors ${
          isLight
            ? 'bg-white/95 border-gray-200 text-gray-900 shadow-xs'
            : 'bg-[#101010]/95 border-white/10 text-white'
        }`}
      >
        <div className="flex items-center gap-2">
          {step > 1 ? (
            <button
              onClick={() => handleStepChange((step - 1) as any)}
              className={`p-1.5 -ml-1.5 rounded-full transition-colors ${
                isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen('home')}
              className={`p-1.5 -ml-1.5 rounded-full transition-colors ${
                isLight ? 'text-gray-600 hover:text-black hover:bg-gray-100' : 'text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <div>
            <span className="text-[9px] font-mono text-[#A38448] uppercase font-bold tracking-widest block">
              CUSTOM INSOLE LAB • STEP {step}/5
            </span>
            <h1 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {steps[step - 1].title}
            </h1>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-[9px] block font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
            TOTAL
          </span>
          <span className="text-sm font-mono font-black text-[#A38448]">
            ${customBuild.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* STEP PROGRESS STEPPER */}
      <div
        className={`px-4 py-2.5 border-b transition-colors ${
          isLight ? 'bg-gray-50 border-gray-200' : 'bg-[#141518] border-white/5'
        }`}
      >
        <div className="grid grid-cols-5 gap-1">
          {steps.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;

            return (
              <button
                key={s.num}
                onClick={() => handleStepChange(s.num as any)}
                className="flex flex-col items-center gap-1 group text-center"
              >
                <div
                  className={`h-1.5 w-full rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#C6A66B]'
                      : isCompleted
                      ? isLight
                        ? 'bg-gray-800'
                        : 'bg-white/80'
                      : isLight
                      ? 'bg-gray-200'
                      : 'bg-zinc-800'
                  }`}
                />
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider transition-colors ${
                    isCurrent
                      ? 'text-[#A38448] font-bold'
                      : isCompleted
                      ? isLight
                        ? 'text-gray-800 font-semibold'
                        : 'text-zinc-300'
                      : isLight
                      ? 'text-gray-400'
                      : 'text-zinc-600'
                  }`}
                >
                  {s.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D INSOLE SHOWCASE STAGE */}
      <div className="px-4 pt-3 pb-1">
        <Insole3DViewer
          color={customBuild.color}
          engravingText={customBuild.laserEngravingText}
          archHeight={customBuild.archHeight}
          height="280px"
          showControls={true}
          viewAngle={current3DAngle}
          onAngleChange={setCurrent3DAngle}
        />

        {/* Live Spec Indicator Pill below 3D canvas */}
        <div
          className={`mt-2 flex items-center justify-between text-[10px] font-mono px-3 py-1.5 rounded-xl border transition-colors ${
            isLight
              ? 'bg-white border-gray-200 text-gray-700 shadow-xs'
              : 'bg-[#16171a] border-white/5 text-zinc-400'
          }`}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A66B] animate-pulse" />
            <span className={`font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {customBuild.productName.split(' ')[1] || 'Insole'}
            </span>
            <span>• {customBuild.size}</span>
          </span>
          <span className="text-[#A38448] font-bold truncate max-w-[150px]">
            {customBuild.laserEngravingText ? `"${customBuild.laserEngravingText}"` : customBuild.color.name}
          </span>
        </div>
      </div>

      {/* STEP CONFIGURATION BODY */}
      <div className="px-4 py-4 space-y-4 flex-1">
        {/* STEP 1: SELECT PRODUCT */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                1. Choose Base Insole System
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Select between pure 3K carbon propulsion or non-carbon orthotic arch support.
              </p>
            </div>

            <div className="space-y-3">
              {/* Option A: Carbon Fiber Performance */}
              <div
                onClick={() =>
                  updateCustomBuild({
                    productId: PRODUCTS[0].id,
                    productName: PRODUCTS[0].name,
                    basePrice: PRODUCTS[0].price,
                  })
                }
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  customBuild.productId === PRODUCTS[0].id
                    ? isLight
                      ? 'bg-[#FFFDF7] border-[#C6A66B] shadow-md ring-1 ring-[#C6A66B]/50'
                      : 'bg-[#18191e] border-[#C6A66B] shadow-[0_0_15px_rgba(198,166,107,0.25)]'
                    : isLight
                    ? 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                    : 'bg-[#141518] border-white/10 hover:border-white/25'
                }`}
              >
                {customBuild.productId === PRODUCTS[0].id && (
                  <span className="absolute top-3.5 right-3.5 p-1 rounded-full bg-[#C6A66B] text-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
                <span className="text-[9px] font-mono font-bold text-[#A38448] uppercase tracking-wider">
                  AEROSPACE 3K PREPREG CARBON
                </span>
                <h3 className={`text-sm font-bold mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Kratos Carbon Fiber Performance Insole
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                  Engineered with continuous carbon fiber for explosive propulsion, maximum kinetic energy return, and rigid midfoot anti-twist.
                </p>
                <div className={`mt-3 flex items-center justify-between pt-2 border-t ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
                  <span className={`text-sm font-mono font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>$89.00</span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>Weight: 42g • Thickness: 3.2mm</span>
                </div>
              </div>

              {/* Option B: Non-Carbon High Arch */}
              <div
                onClick={() =>
                  updateCustomBuild({
                    productId: PRODUCTS[1].id,
                    productName: PRODUCTS[1].name,
                    basePrice: PRODUCTS[1].price,
                  })
                }
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  customBuild.productId === PRODUCTS[1].id
                    ? isLight
                      ? 'bg-[#FFFDF7] border-[#C6A66B] shadow-md ring-1 ring-[#C6A66B]/50'
                      : 'bg-[#18191e] border-[#C6A66B] shadow-[0_0_15px_rgba(198,166,107,0.25)]'
                    : isLight
                    ? 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                    : 'bg-[#141518] border-white/10 hover:border-white/25'
                }`}
              >
                {customBuild.productId === PRODUCTS[1].id && (
                  <span className="absolute top-3.5 right-3.5 p-1 rounded-full bg-[#C6A66B] text-black">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
                <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase tracking-wider">
                  BIOMECHANICAL TPU CRADLE
                </span>
                <h3 className={`text-sm font-bold mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  Kratos Non-Carbon High Arch Support
                </h3>
                <p className={`text-xs mt-1 leading-relaxed ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                  Adaptive biomechanical arch bridge with medical-grade Poron shock damping for plantar fasciitis relief and long-mileage fatigue delay.
                </p>
                <div className={`mt-3 flex items-center justify-between pt-2 border-t ${isLight ? 'border-gray-100' : 'border-white/5'}`}>
                  <span className={`text-sm font-mono font-black ${isLight ? 'text-gray-900' : 'text-white'}`}>$59.00</span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>Weight: 48g • Dynamic Flex</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT SIZE */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-sm font-black uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                  2. Select Size & Foot Width
                </h2>
                <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                  Precision athletic sizing with standard and wide fit options.
                </p>
              </div>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-[11px] font-mono text-[#A38448] hover:underline flex items-center gap-1 font-bold"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Size Guide</span>
              </button>
            </div>

            {/* Foot Width Toggle */}
            <div className="space-y-1.5">
              <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Foot Width Profile:
              </span>
              <div className="grid grid-cols-2 gap-2">
                {(['Standard', 'Wide'] as const).map((w) => (
                  <button
                    key={w}
                    onClick={() => updateCustomBuild({ width: w })}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                      customBuild.width === w
                        ? 'bg-[#C6A66B] border-[#C6A66B] text-black shadow-md'
                        : isLight
                        ? 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 shadow-xs'
                        : 'bg-[#16171b] border-white/10 text-zinc-300 hover:border-white/20'
                    }`}
                  >
                    <span>{w === 'Standard' ? 'Standard Width (D)' : 'Wide Fit (EE)'}</span>
                    {customBuild.width === w && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes Grid */}
            <div className="space-y-1.5">
              <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                Shoe Size (US Men / Women):
              </span>
              <div className="grid grid-cols-3 gap-2">
                {availableSizes.map((sz) => {
                  const isSelected = customBuild.size === sz;
                  return (
                    <button
                      key={sz}
                      onClick={() => updateCustomBuild({ size: sz })}
                      className={`py-3 px-1 rounded-xl text-xs font-mono text-center transition-all border ${
                        isSelected
                          ? 'bg-[#C6A66B] border-[#C6A66B] text-black font-extrabold shadow-md scale-102'
                          : isLight
                          ? 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 shadow-xs'
                          : 'bg-[#16171a] border-white/10 text-zinc-300 hover:border-white/30'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: SELECT COLORWAY */}
        {step === 3 && (
          <div className="space-y-3">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                3. Choose Aesthetic Colorway
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Select your top-sheet antimicrobial finish and carbon weave accent tint.
              </p>
            </div>

            <div className="space-y-2.5">
              {COLORWAYS.map((col) => {
                const isSelected = customBuild.color.id === col.id;
                return (
                  <div
                    key={col.id}
                    onClick={() => {
                      updateCustomBuild({ color: col });
                      setCurrent3DAngle('top');
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? isLight
                          ? 'bg-[#FFFDF7] border-[#C6A66B] shadow-md ring-1 ring-[#C6A66B]/50'
                          : 'bg-[#18191e] border-[#C6A66B] shadow-[0_0_15px_rgba(198,166,107,0.2)]'
                        : isLight
                        ? 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                        : 'bg-[#141518] border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full border-2 border-white/40 flex items-center justify-center shrink-0 shadow"
                        style={{ backgroundColor: col.hex }}
                      >
                        {isSelected && (
                          <Check
                            className={`w-4 h-4 ${
                              col.hex === '#202020' ? 'text-white' : 'text-black'
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>{col.name}</h4>
                        <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                          Silver-ion anti-friction weave
                        </span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-[#A38448] font-bold">
                      INCLUDED
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: BIOMECHANICAL CALIBRATION & LASER ENGRAVING */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                4. Biomechanical Calibration & Engraving
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Tune your arch height, stiffness flex, and personalize with custom laser etching.
              </p>
            </div>

            {/* 1. Arch Support Profile */}
            <div className="space-y-1.5">
              <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                1. Arch Support Height Profile:
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['Low', 'Neutral', 'High'] as const).map((arch) => (
                  <button
                    key={arch}
                    onClick={() => {
                      updateCustomBuild({ archHeight: arch });
                      setCurrent3DAngle('side');
                    }}
                    className={`py-2.5 px-2 rounded-xl text-xs font-bold border transition-all ${
                      customBuild.archHeight === arch
                        ? 'bg-[#C6A66B] border-[#C6A66B] text-black shadow-md'
                        : isLight
                        ? 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 shadow-xs'
                        : 'bg-[#16171b] border-white/10 text-zinc-300'
                    }`}
                  >
                    {arch} Arch
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Flex Stiffness */}
            <div className="space-y-1.5">
              <span className={`text-[10px] font-mono uppercase ${isLight ? 'text-gray-600 font-semibold' : 'text-zinc-400'}`}>
                2. Carbon Flex Rating:
              </span>
              <div className="space-y-2">
                {[
                  { id: 'Medium', label: 'Performance Flex (Responsive Daily Training)', extra: 0 },
                  { id: 'Rigid Competition', label: 'Rigid Track Competition (Max Spring Energy Return)', extra: 10 },
                ].map((flex) => {
                  const isSelected = customBuild.flexStiffness === flex.id;
                  return (
                    <button
                      key={flex.id}
                      onClick={() => updateCustomBuild({ flexStiffness: flex.id as any })}
                      className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex justify-between items-center ${
                        isSelected
                          ? isLight
                            ? 'bg-[#FFFDF7] border-[#C6A66B] text-gray-900 font-bold shadow-xs'
                            : 'bg-[#18191e] border-[#C6A66B] text-white font-bold'
                          : isLight
                          ? 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 shadow-xs'
                          : 'bg-[#141518] border-white/10 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <span>{flex.label}</span>
                      <span className="text-xs font-mono text-[#A38448] font-bold">
                        {flex.extra === 0 ? '+$0' : `+$${flex.extra}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Custom Laser Engraving */}
            <div
              className={`p-4 rounded-2xl border space-y-2 transition-colors ${
                isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#16171a] border-[#C6A66B]/30'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono uppercase text-[#A38448] font-bold">
                  3. Custom Laser Heel Engraving (+$15.00)
                </span>
                <span className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>MAX 6 CHARS</span>
              </div>
              <p className={`text-[11px] ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Precision laser etched directly onto the 3K carbon deck (updates live on 3D heel model).
              </p>
              <input
                type="text"
                maxLength={6}
                value={customBuild.laserEngravingText}
                onFocus={() => setCurrent3DAngle('heel')}
                onChange={(e) => {
                  updateCustomBuild({ laserEngravingText: e.target.value.toUpperCase() });
                  setCurrent3DAngle('heel');
                }}
                placeholder="e.g. MV-24, KRT-07"
                className={`w-full border rounded-xl px-4 py-2.5 text-base font-mono uppercase tracking-[0.25em] text-center font-black focus:outline-none focus:border-[#C6A66B] transition-colors ${
                  isLight
                    ? 'bg-gray-50 border-gray-300 text-gray-900 focus:bg-white'
                    : 'bg-black/70 border-white/20 text-[#C6A66B]'
                }`}
              />
            </div>
          </div>
        )}

        {/* STEP 5: FINAL SPECIFICATION REVIEW */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className={`text-sm font-black uppercase tracking-wide ${isLight ? 'text-gray-900' : 'text-white'}`}>
                5. Review Your Custom Insole Spec
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Verify your personalized build before submitting to manufacturing.
              </p>
            </div>

            {/* Summary Card */}
            <div
              className={`p-4 rounded-3xl border-2 space-y-3.5 shadow-xl transition-colors ${
                isLight
                  ? 'bg-white border-[#C6A66B]/60 text-gray-900'
                  : 'bg-[#16171b] border-[#C6A66B]/40 text-white'
              }`}
            >
              <div className={`flex justify-between items-start pb-2 border-b ${isLight ? 'border-gray-200' : 'border-white/10'}`}>
                <div>
                  <span className="text-[9px] font-mono text-[#A38448] font-bold uppercase tracking-wider">
                    SPECIFICATION BREAKDOWN
                  </span>
                  <h3 className={`text-sm font-bold mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {customBuild.productName}
                  </h3>
                </div>
                <span className="text-lg font-mono font-black text-[#A38448]">
                  ${customBuild.totalPrice.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <div className="flex justify-between">
                  <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Shoe Size & Width:</span>
                  <span className={`font-mono font-bold ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {customBuild.size} ({customBuild.width})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Aesthetic Colorway:</span>
                  <span className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    <span
                      className="w-3 h-3 rounded-full border border-black/20 inline-block shadow-xs"
                      style={{ backgroundColor: customBuild.color.hex }}
                    />
                    {customBuild.color.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Arch Calibration:</span>
                  <span className={`font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>{customBuild.archHeight} Arch</span>
                </div>
                <div className="flex justify-between">
                  <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Carbon Flex Rating:</span>
                  <span className={`font-mono ${isLight ? 'text-gray-900' : 'text-white'}`}>{customBuild.flexStiffness}</span>
                </div>
                {customBuild.laserEngravingText && (
                  <div className="flex justify-between">
                    <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>Laser Etched Initials:</span>
                    <span className="font-mono text-[#A38448] font-bold">
                      &quot;{customBuild.laserEngravingText}&quot; (+$15.00)
                    </span>
                  </div>
                )}
              </div>

              <div className={`pt-2 border-t flex items-center gap-2 text-[10px] ${isLight ? 'border-gray-200 text-gray-600' : 'border-white/10 text-zinc-400'}`}>
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Backed by Kratos 6-Month Performance Warranty</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PERSISTENT BOTTOM ACTION BAR (DOCKED DIRECTLY ABOVE BOTTOM NAV BAR) */}
      <div
        className={`fixed bottom-[58px] inset-x-0 z-40 backdrop-blur-xl border-t p-3 max-w-lg mx-auto flex items-center gap-2 shadow-2xl transition-colors ${
          isLight
            ? 'bg-white/98 border-gray-200'
            : 'bg-[#101010]/98 border-white/10'
        }`}
      >
        {step > 1 && (
          <button
            onClick={() => handleStepChange((step - 1) as any)}
            className={`py-3.5 px-4 rounded-2xl border font-bold text-xs uppercase transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 border-gray-200 text-gray-800'
                : 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
            }`}
          >
            Back
          </button>
        )}

        {step < 5 ? (
          <button
            onClick={() => handleStepChange((step + 1) as any)}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-98"
          >
            <span>Continue To {steps[step].label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleFinishAndCheckout}
            className="flex-1 py-3.5 px-4 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl active:scale-98"
          >
            <span>PROCEED TO CHECKOUT • ${customBuild.totalPrice.toFixed(2)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 space-y-3 shadow-2xl transition-colors ${
              isLight
                ? 'bg-white border-gray-200 text-gray-900'
                : 'bg-[#16171b] border-white/15 text-white'
            }`}
          >
            <h4 className="text-xs font-mono font-bold text-[#A38448] uppercase">
              ATHLETIC SIZING CONVERSION GUIDE
            </h4>
            <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
              Kratos insoles are true-to-size drop-in replacements. Remove factory sockliner before inserting.
            </p>
            <div className="text-xs font-mono space-y-1">
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-gray-100 text-gray-800' : 'border-white/5'}`}>
                <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>US Men 9 / Women 10.5</span>
                <span>EU 42.5 • 27.5 cm</span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-gray-100 text-gray-800' : 'border-white/5'}`}>
                <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>US Men 9.5 / Women 11</span>
                <span>EU 43 • 28.0 cm</span>
              </div>
              <div className={`flex justify-between py-1 border-b ${isLight ? 'border-gray-100 text-gray-800' : 'border-white/5'}`}>
                <span className={isLight ? 'text-gray-500' : 'text-zinc-400'}>US Men 10 / Women 11.5</span>
                <span>EU 44 • 28.5 cm</span>
              </div>
            </div>
            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#C6A66B] text-black font-bold text-xs uppercase mt-2"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

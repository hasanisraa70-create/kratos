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
  Tag,
  Info,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Insole3DViewer } from '../components/3d/Insole3DViewer';
import { ProductColor } from '../types';

export const CustomizerScreen: React.FC = () => {
  const {
    products,
    customBuild,
    updateCustomBuild,
    addToCart,
    setCurrentScreen,
    showToast,
    theme,
  } = useApp();

  const isLight = theme === 'light';

  // 4 Core Steps as required: Product -> Size -> Color -> Additional Customization -> Review
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [current3DAngle, setCurrent3DAngle] = useState<'perspective' | 'top' | 'bottom' | 'side' | 'heel'>('perspective');

  const steps = [
    { num: 1, label: '1. Insole', title: 'Step 1: Select Kratos Model' },
    { num: 2, label: '2. Size', title: 'Step 2: Select Shoe Size' },
    { num: 3, label: '3. Color', title: 'Step 3: Select Colorway' },
    { num: 4, label: '4. Tuning', title: 'Step 4: Additional Customization' },
    { num: 5, label: '5. Review', title: 'Step 5: Review & Order' },
  ];

  // Active product details
  const activeProduct = products.find((p) => p.id === customBuild.productId) || products[0];
  const config = activeProduct.customizationConfig || {
    allowArchProfile: true,
    allowFootWidth: true,
    allowStiffness: true,
    allowTopCover: true,
    allowCushioning: true,
    allowLaserEngraving: true,
  };

  const availableSizes = activeProduct.sizes || [
    'US M 7 / W 8.5',
    'US M 8 / W 9.5',
    'US M 9 / W 10.5',
    'US M 9.5 / W 11',
    'US M 10 / W 11.5',
    'US M 11 / W 12.5',
    'US M 12 / W 13.5',
  ];

  const handleStepChange = (newStep: 1 | 2 | 3 | 4 | 5) => {
    setStep(newStep);
    // Camera angle focus helper
    if (newStep === 3) setCurrent3DAngle('top');
    else if (newStep === 4) setCurrent3DAngle('heel');
    else setCurrent3DAngle('perspective');
  };

  const handleSelectProduct = (product: typeof products[0]) => {
    updateCustomBuild({
      productId: product.id,
      productName: product.name,
      basePrice: product.price,
      color: product.colorways[0],
      size: product.sizes[4] || product.sizes[0],
    });
  };

  // Direct checkout transition
  const handleContinueToOrder = () => {
    addToCart({
      productId: customBuild.productId,
      name: `Custom ${customBuild.productName}`,
      price: customBuild.totalPrice,
      image: activeProduct.image,
      size: `${customBuild.size} (${customBuild.width})`,
      colorName: customBuild.color.name,
      colorHex: customBuild.color.hex,
      quantity: 1,
      customizationDetails: {
        arch: config.allowArchProfile ? `${customBuild.archHeight} Arch` : undefined,
        flex: config.allowStiffness ? customBuild.flexStiffness : undefined,
        width: config.allowFootWidth ? customBuild.width : undefined,
        cushioning: config.allowCushioning ? customBuild.cushioning : undefined,
        topCover: config.allowTopCover ? customBuild.topCover : undefined,
        engraving: config.allowLaserEngraving && customBuild.laserEngravingText.trim()
          ? customBuild.laserEngravingText.trim().toUpperCase()
          : undefined,
      },
    });
    showToast('Customized insole ready! Opening order checkout...', 'success');
    setCurrentScreen('checkout');
  };

  return (
    <div
      className={`flex-1 flex flex-col pb-44 transition-colors ${
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
              STALL CUSTOMIZER • STEP {step}/5
            </span>
            <h1 className={`text-xs font-black uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
              {steps[step - 1].title}
            </h1>
          </div>
        </div>

        <div className="text-right">
          <span className={`text-[9px] block font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
            EST. TOTAL
          </span>
          <span className="text-sm font-mono font-black text-[#A38448]">
            ${customBuild.totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      {/* STEP PROGRESS STEPPER */}
      <div
        className={`px-4 py-2 border-b transition-colors ${
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

      {/* 3D INSOLE LIVE PREVIEW STAGE */}
      <div className="px-4 pt-3 pb-1">
        <Insole3DViewer
          color={customBuild.color}
          engravingText={config.allowLaserEngraving ? customBuild.laserEngravingText : ''}
          archHeight={customBuild.archHeight}
          height="260px"
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
              {customBuild.productName}
            </span>
            <span>• {customBuild.size}</span>
          </span>
          <span className="text-[#A38448] font-bold truncate max-w-[140px]">
            {customBuild.laserEngravingText ? `"${customBuild.laserEngravingText}"` : customBuild.color.name}
          </span>
        </div>
      </div>

      {/* STEP CONFIGURATION BODY */}
      <div className="px-4 py-3 space-y-4 flex-1">
        {/* STEP 1: SELECT PRODUCT */}
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]`}>
                CHOOSE INSOLE BASE MODEL
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Select an insole platform tailored to your athletic sport and arch needs.
              </p>
            </div>

            <div className="space-y-2.5">
              {products.map((p) => {
                const isSelected = customBuild.productId === p.id;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProduct(p)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? isLight
                          ? 'border-[#C6A66B] bg-[#FFFDF7] shadow-md ring-1 ring-[#C6A66B]'
                          : 'border-[#C6A66B] bg-[#1a1712] shadow-md ring-1 ring-[#C6A66B]/50'
                        : isLight
                        ? 'bg-white border-gray-200 hover:border-gray-300 shadow-xs'
                        : 'bg-[#15161a] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[8px] font-mono px-1.5 py-0.2 rounded bg-black/5 text-[#A38448] font-bold uppercase">
                            {p.tag}
                          </span>
                          <span className="text-[8px] font-mono text-emerald-600 font-bold">
                            {p.availability || 'In Stock'}
                          </span>
                        </div>
                        <h3 className={`text-xs font-bold uppercase tracking-tight mt-0.5 ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          {p.name}
                        </h3>
                        <p className={`text-[10px] line-clamp-1 ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                          {p.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-xs font-mono font-black text-[#A38448] block">
                        ${p.price.toFixed(2)}
                      </span>
                      {isSelected ? (
                        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#C6A66B] text-black mt-1">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="text-[10px] text-gray-400 mt-1 block">Select</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: SELECT SIZE */}
        {step === 2 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]`}>
                  SELECT YOUR SHOE SIZE
                </h2>
                <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                  Direct drop-in replacement for your running or court footwear.
                </p>
              </div>
              <button
                onClick={() => setShowSizeGuide(true)}
                className="text-[11px] font-mono text-[#A38448] underline font-bold"
              >
                Size Guide
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availableSizes.map((sz) => {
                const isSelected = customBuild.size === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => updateCustomBuild({ size: sz })}
                    className={`py-3 px-2 rounded-xl text-center text-xs font-mono transition-all border ${
                      isSelected
                        ? 'bg-[#C6A66B] border-[#C6A66B] text-black font-black shadow-md'
                        : isLight
                        ? 'bg-white border-gray-200 text-gray-800 hover:border-gray-300 shadow-xs'
                        : 'bg-[#15161a] border-white/10 text-zinc-300 hover:border-white/30'
                    }`}
                  >
                    {sz}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: SELECT COLORWAY */}
        {step === 3 && (
          <div className="space-y-3">
            <div>
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]`}>
                SELECT COLORWAY
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Active colorway renders live on the 3D insole model.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {activeProduct.colorways.map((col) => {
                const isSelected = customBuild.color.id === col.id;
                return (
                  <button
                    key={col.id}
                    onClick={() => updateCustomBuild({ color: col })}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? isLight
                          ? 'border-[#C6A66B] bg-[#FFFDF7] shadow-sm ring-1 ring-[#C6A66B]'
                          : 'border-[#C6A66B] bg-[#1a1712] shadow-sm ring-1 ring-[#C6A66B]/50'
                        : isLight
                        ? 'bg-white border-gray-200 hover:border-gray-300'
                        : 'bg-[#15161a] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-black/20 shadow-xs shrink-0"
                        style={{ backgroundColor: col.hex }}
                      />
                      <div>
                        <h3 className={`text-xs font-bold uppercase tracking-tight ${isLight ? 'text-gray-900' : 'text-white'}`}>
                          {col.name}
                        </h3>
                        <p className={`text-[10px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                          Hex: {col.hex} • Carbon Accent
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#C6A66B] text-black flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: ADDITIONAL CUSTOMIZATION (CONFIGURABLE PER PRODUCT) */}
        {step === 4 && (
          <div className="space-y-4">
            <div>
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]`}>
                ADDITIONAL BIOMECHANICAL OPTIONS
              </h2>
              <p className={`text-[11px] ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                Configurable parameters for {activeProduct.name}. Options not supported by this insole are locked.
              </p>
            </div>

            {/* 1. Foot Width Profile */}
            {config.allowFootWidth && (
              <div className={`p-3.5 rounded-2xl border space-y-2 ${isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'}`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>Foot Width Profile</span>
                  <span className="font-mono text-[#A38448]">{customBuild.width}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['Standard', 'Wide'] as const).map((w) => (
                    <button
                      key={w}
                      onClick={() => updateCustomBuild({ width: w })}
                      className={`py-2 px-3 rounded-xl text-xs font-bold uppercase transition-all ${
                        customBuild.width === w
                          ? 'bg-[#C6A66B] text-black font-black'
                          : isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-zinc-300'
                      }`}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Arch Support Profile */}
            {config.allowArchProfile && (
              <div className={`p-3.5 rounded-2xl border space-y-2 ${isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'}`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>Arch Support Profile</span>
                  <span className="font-mono text-[#A38448]">{customBuild.archHeight} Arch</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Neutral', 'High'] as const).map((arch) => (
                    <button
                      key={arch}
                      onClick={() => updateCustomBuild({ archHeight: arch })}
                      className={`py-2 px-2 rounded-xl text-xs font-bold uppercase transition-all ${
                        customBuild.archHeight === arch
                          ? 'bg-[#C6A66B] text-black font-black'
                          : isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-zinc-300'
                      }`}
                    >
                      {arch}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Carbon Fiber Stiffness */}
            {config.allowStiffness ? (
              <div className={`p-3.5 rounded-2xl border space-y-2 ${isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'}`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>Carbon Plate Stiffness</span>
                  <span className="font-mono text-[#A38448]">
                    {customBuild.flexStiffness}
                    {customBuild.flexStiffness === 'Ultra-Stiff Track' ? ' (+$10)' : ''}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Flexible', 'Semi-Rigid', 'Ultra-Stiff Track'] as const).map((stiff) => (
                    <button
                      key={stiff}
                      onClick={() => updateCustomBuild({ flexStiffness: stiff })}
                      className={`py-2 px-1 rounded-xl text-[11px] font-bold uppercase transition-all ${
                        customBuild.flexStiffness === stiff
                          ? 'bg-[#C6A66B] text-black font-black'
                          : isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-zinc-300'
                      }`}
                    >
                      {stiff.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs opacity-70 ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px]">Carbon Stiffness: Fixed factory tuned for this non-carbon composite model.</span>
              </div>
            )}

            {/* 4. Top Cover Material */}
            {config.allowTopCover && (
              <div className={`p-3.5 rounded-2xl border space-y-2 ${isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'}`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>Top Cover Fabric</span>
                  <span className="font-mono text-[#A38448]">{customBuild.topCover}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {(['Standard Grip', 'Perforated Aeration', 'Ultra-Plush Velvet'] as const).map((tc) => (
                    <button
                      key={tc}
                      onClick={() => updateCustomBuild({ topCover: tc })}
                      className={`py-2 px-1 rounded-xl text-[10px] font-bold uppercase transition-all ${
                        customBuild.topCover === tc
                          ? 'bg-[#C6A66B] text-black font-black'
                          : isLight ? 'bg-gray-100 text-gray-700' : 'bg-white/5 text-zinc-300'
                      }`}
                    >
                      {tc.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Custom Laser Heel Engraving */}
            {config.allowLaserEngraving ? (
              <div className={`p-3.5 rounded-2xl border space-y-2.5 ${isLight ? 'bg-white border-gray-200' : 'bg-[#15161a] border-white/10'}`}>
                <div className="flex items-center justify-between text-xs font-bold uppercase">
                  <span>Laser Heel Engraving</span>
                  <span className="font-mono text-[#A38448] font-bold">+$15.00</span>
                </div>
                <input
                  type="text"
                  maxLength={12}
                  value={customBuild.laserEngravingText}
                  onChange={(e) => updateCustomBuild({ laserEngravingText: e.target.value.toUpperCase() })}
                  placeholder="e.g. MARCUS-07"
                  className={`w-full px-3 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider border focus:outline-none focus:border-[#C6A66B] ${
                    isLight
                      ? 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'
                      : 'bg-[#101010] border-white/15 text-white placeholder-zinc-500'
                  }`}
                />
                <p className={`text-[10px] ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                  Custom initials or bib number laser etched directly onto the carbon heel cup.
                </p>
              </div>
            ) : (
              <div className={`p-3 rounded-xl border flex items-center gap-2 text-xs opacity-70 ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-white/5 border-white/10'}`}>
                <Lock className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[11px]">Laser Engraving: Not available for non-carbon surface materials.</span>
              </div>
            )}
          </div>
        )}

        {/* STEP 5: REVIEW SELECTION & SUMMARY */}
        {step === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className={`text-xs font-mono font-bold uppercase tracking-wider text-[#A38448]`}>
                ORDER CONFIGURATION SUMMARY
              </h2>
              <p className={`text-xs ${isLight ? 'text-gray-600' : 'text-zinc-400'}`}>
                Review your customized specifications before placing the stall order.
              </p>
            </div>

            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isLight ? 'bg-white border-gray-200 shadow-sm' : 'bg-[#15161a] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div>
                  <h3 className={`text-sm font-bold uppercase ${isLight ? 'text-gray-900' : 'text-white'}`}>
                    {customBuild.productName}
                  </h3>
                  <p className={`text-[11px] font-mono ${isLight ? 'text-gray-500' : 'text-zinc-400'}`}>
                    Colorway: {customBuild.color.name}
                  </p>
                </div>
                <span className="text-base font-mono font-black text-[#A38448]">
                  ${customBuild.totalPrice.toFixed(2)}
                </span>
              </div>

              {/* Spec breakdown matrix */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded-xl bg-gray-50 text-gray-800">
                  <span className="text-[9px] text-gray-500 block">SIZE</span>
                  <span className="font-bold">{customBuild.size}</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 text-gray-800">
                  <span className="text-[9px] text-gray-500 block">WIDTH</span>
                  <span className="font-bold">{customBuild.width}</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 text-gray-800">
                  <span className="text-[9px] text-gray-500 block">ARCH PROFILE</span>
                  <span className="font-bold">{customBuild.archHeight} Arch</span>
                </div>
                <div className="p-2 rounded-xl bg-gray-50 text-gray-800">
                  <span className="text-[9px] text-gray-500 block">STIFFNESS</span>
                  <span className="font-bold">{customBuild.flexStiffness}</span>
                </div>
              </div>

              {customBuild.laserEngravingText && (
                <div className="p-2.5 rounded-xl bg-[#C6A66B]/15 border border-[#C6A66B]/30 flex items-center justify-between text-xs font-mono">
                  <span>LASER HEEL ENGRAVING:</span>
                  <span className="font-bold text-[#A38448] tracking-widest">
                    &quot;{customBuild.laserEngravingText}&quot;
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* DOCKED STICKY BOTTOM ACTION BAR */}
      <div
        className={`fixed bottom-[58px] inset-x-0 z-40 backdrop-blur-xl border-t p-3 max-w-lg mx-auto flex gap-2 shadow-2xl transition-colors ${
          isLight ? 'bg-white/98 border-gray-200' : 'bg-[#101010]/98 border-white/10'
        }`}
      >
        {step < 5 ? (
          <button
            onClick={() => handleStepChange((step + 1) as any)}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
          >
            <span>NEXT: {steps[step].label}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            onClick={handleContinueToOrder}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg active:scale-98"
          >
            <span>CONTINUE TO ORDER (${customBuild.totalPrice.toFixed(2)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Size Guide Modal */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`w-full max-w-sm rounded-3xl border p-5 space-y-4 shadow-2xl ${
              isLight ? 'bg-white border-gray-200 text-gray-900' : 'bg-[#16171b] border-white/15 text-white'
            }`}
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-xs font-mono font-bold text-[#A38448] uppercase">
                ATHLETIC SIZING CONVERSION
              </span>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-xs font-mono text-gray-400 hover:text-black"
              >
                CLOSE
              </button>
            </div>

            <table className="w-full text-xs font-mono">
              <thead>
                <tr className="border-b text-left text-gray-500">
                  <th className="pb-1">US MEN</th>
                  <th className="pb-1">US WOMEN</th>
                  <th className="pb-1">EU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="py-1">7.0</td><td>8.5</td><td>40</td></tr>
                <tr><td className="py-1">8.0</td><td>9.5</td><td>41</td></tr>
                <tr><td className="py-1">9.0</td><td>10.5</td><td>42.5</td></tr>
                <tr><td className="py-1">10.0</td><td>11.5</td><td>44</td></tr>
                <tr><td className="py-1">11.0</td><td>12.5</td><td>45</td></tr>
                <tr><td className="py-1">12.0</td><td>13.5</td><td>46.5</td></tr>
              </tbody>
            </table>

            <button
              onClick={() => setShowSizeGuide(false)}
              className="w-full py-2.5 rounded-xl bg-[#C6A66B] text-black font-bold text-xs uppercase"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

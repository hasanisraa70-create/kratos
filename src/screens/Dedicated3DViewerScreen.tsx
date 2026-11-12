import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Layers, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  RefreshCw, 
  Sliders, 
  Eye, 
  Check 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Insole3DViewer } from '../components/3d/Insole3DViewer';
import { ProductColor } from '../types';

export const Dedicated3DViewerScreen: React.FC = () => {
  const { selectedProduct, setCurrentScreen, startCustomizerForProduct, theme } = useApp();
  const isLight = theme === 'light';
  const product = selectedProduct;
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colorways[0]);

  return (
    <div
      className={`flex-1 flex flex-col justify-between overflow-hidden relative transition-colors ${
        isLight ? 'bg-[#F4F6F8] text-gray-900' : 'bg-[#0b0c0e] text-white'
      }`}
    >
      {/* Top Bar with back & product name */}
      <div
        className={`relative z-20 px-4 py-3 backdrop-blur-md border-b flex items-center justify-between transition-colors ${
          isLight
            ? 'bg-white/90 border-gray-200 text-gray-900 shadow-xs'
            : 'bg-black/60 border-white/10 text-white'
        }`}
      >
        <button
          onClick={() => setCurrentScreen('product-details')}
          className={`p-2 -ml-2 rounded-full transition-colors ${
            isLight ? 'text-gray-700 hover:text-black hover:bg-gray-100' : 'text-white/80 hover:text-white hover:bg-white/10'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="text-center">
          <span className="text-[10px] font-mono uppercase text-[#A38448] font-bold block">
            360° PRECISION VIEWER
          </span>
          <h2 className={`text-xs font-bold uppercase tracking-wider ${isLight ? 'text-gray-900' : 'text-white'}`}>
            {product.name}
          </h2>
        </div>

        <span className="w-8" />
      </div>

      {/* Main Full-Screen 3D Insole Canvas */}
      <div className="relative flex-1 flex flex-col items-center justify-center p-2">
        <Insole3DViewer
          color={selectedColor}
          height="450px"
          showControls={true}
        />
        <p className="text-[9px] font-mono text-zinc-400 mt-1 text-center">
          Interactive 3D Prototype Model • Drag to rotate 360° • Pinch / scroll to zoom
        </p>
      </div>

      {/* Bottom Swatches & Action Bar */}
      <div
        className={`relative z-20 p-4 space-y-3 transition-colors ${
          isLight
            ? 'bg-gradient-to-t from-white via-white/95 to-transparent'
            : 'bg-gradient-to-t from-black via-black/80 to-transparent'
        }`}
      >
        {/* Colorway swatches for live 3D preview */}
        <div className="flex items-center justify-center gap-3 py-1">
          {product.colorways.map((col) => {
            const isSelected = selectedColor.id === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setSelectedColor(col)}
                className={`relative w-8 h-8 rounded-full border-2 transition-all ${
                  isSelected ? 'border-[#C6A66B] scale-110 shadow-lg ring-2 ring-[#C6A66B]/30' : 'border-black/20 hover:border-black/40'
                }`}
                style={{ backgroundColor: col.hex }}
                title={col.name}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 m-auto ${
                      col.hex === '#202020' ? 'text-white' : 'text-black'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Dual Actions: Customize / Back to Details */}
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentScreen('product-details')}
            className={`flex-1 py-3 px-4 rounded-xl border font-bold text-xs uppercase tracking-wider transition-colors ${
              isLight
                ? 'bg-gray-100 hover:bg-gray-200 border-gray-300 text-gray-800'
                : 'bg-white/10 hover:bg-white/15 border-white/20 text-white'
            }`}
          >
            Product Specs
          </button>

          <button
            onClick={() => startCustomizerForProduct(product)}
            className="flex-1 py-3 px-4 rounded-xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-1.5 active:scale-98"
          >
            <Sliders className="w-4 h-4" />
            <span>Customize This Insole</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw, X, CheckCircle2, Ruler, Sun, RotateCw, Maximize2 } from 'lucide-react';
import { Product, ProductColor } from '../../types';

interface ARViewerSimulationProps {
  product: Product;
  color: ProductColor;
  onClose: () => void;
}

export const ARViewerSimulation: React.FC<ARViewerSimulationProps> = ({
  product,
  color,
  onClose,
}) => {
  const [isPlaced, setIsPlaced] = useState(false);
  const [isPlaneDetected, setIsPlaneDetected] = useState(false);
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(25);
  const [measureMode, setMeasureMode] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Request actual camera if accessible, or smoothly fallback to high-fidelity AR gym/floor camera feed
  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      ?.getUserMedia({ video: { facingMode: 'environment' } })
      .then((s) => {
        stream = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          setCameraActive(true);
        }
      })
      .catch(() => {
        // Fallback to simulated athletic gym hardwood floor
        setCameraActive(false);
      });

    // Simulate surface plane detection after 1.2s
    const timer = setTimeout(() => {
      setIsPlaneDetected(true);
    }, 1200);

    return () => {
      clearTimeout(timer);
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden text-white font-sans">
      {/* Background Camera Feed / Photorealistic AR Scene */}
      <div className="absolute inset-0 z-0">
        {cameraActive ? (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full relative overflow-hidden bg-stone-900">
            {/* Realistic Athletic Floor Texture Background */}
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80"
              alt="Floor Surface"
              className="w-full h-full object-cover brightness-60"
            />
            {/* AR Plane Grid Tracking Mesh */}
            <div className="absolute inset-0 bg-[radial-gradient(#C6A66B_1px,transparent_1px)] [background-size:24px_24px] opacity-35" />
          </div>
        )}

        {/* Dynamic AR Reticle & Floor Anchor */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {!isPlaced ? (
            <div className="flex flex-col items-center gap-3 animate-pulse">
              <div className="relative w-44 h-44 rounded-full border-2 border-dashed border-[#C6A66B] flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-[#C6A66B]/30 border border-[#C6A66B] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#C6A66B]" />
                </div>
                {/* 4 Corner Markers */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#C6A66B]" />
                <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#C6A66B]" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#C6A66B]" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#C6A66B]" />
              </div>
              <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#C6A66B]/50 text-xs font-mono font-bold tracking-wider text-[#C6A66B]">
                {isPlaneDetected ? 'SURFACE DETECTED • TAP TO PLACE' : 'SCANNING HORIZONTAL SURFACE...'}
              </div>
            </div>
          ) : (
            /* Rendered 3D Insole in AR World Coordinates */
            <div
              className="relative transition-transform duration-200 cursor-move pointer-events-auto"
              style={{
                transform: `scale(${scale / 100}) rotate(${rotation}deg)`,
              }}
              onClick={() => setRotation((prev) => (prev + 30) % 360)}
            >
              {/* Ground Contact Shadow */}
              <div className="absolute -inset-4 bg-black/60 rounded-full blur-xl transform translate-y-6" />

              {/* Realistic 3D Insole Top Presentation */}
              <div className="relative w-56 h-80 rounded-[45%_45%_35%_35%] carbon-pattern border-2 border-[#C6A66B]/40 shadow-2xl flex flex-col items-center justify-between p-4 overflow-hidden">
                {/* Athletic Carbon Fiber Aesthetic Details */}
                <div className="w-full flex justify-between items-center text-[10px] font-mono text-[#C6A66B] font-bold">
                  <span>KRATOS 3K</span>
                  <span>1:1 SCALE</span>
                </div>

                {/* Heel Lock Pod */}
                <div
                  className="w-28 h-28 rounded-full border border-white/20 flex flex-col items-center justify-center text-center p-2"
                  style={{ backgroundColor: color.hex }}
                >
                  <span className="text-[10px] font-bold text-white tracking-widest uppercase">
                    AEROSPACE SHANK
                  </span>
                  <span className="text-[8px] text-white/80 font-mono mt-0.5">
                    HIGH TORSIONAL LOCK
                  </span>
                </div>

                {/* Laser Engraving / Size Badge */}
                <div className="w-full text-center">
                  <span className="inline-block px-3 py-1 rounded bg-black/80 border border-[#C6A66B]/60 text-[10px] font-mono font-bold text-[#C6A66B]">
                    US M 9.5 / W 11
                  </span>
                </div>

                {/* Real-world dimension ruler lines when active */}
                {measureMode && (
                  <div className="absolute inset-0 border border-emerald-400/80 bg-emerald-950/20 flex flex-col justify-between p-2 text-[10px] font-mono text-emerald-400">
                    <span className="flex justify-between">
                      <span>WIDTH: 94mm</span>
                      <span>ARCH: 36mm</span>
                    </span>
                    <span className="text-center font-bold">LENGTH: 282mm (US 9.5)</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Controls Overlay */}
      <div className="relative z-10 px-5 pt-12 pb-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest uppercase">
            AR QUICK LOOK • {scale}%
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMeasureMode(!measureMode)}
            className={`p-2 rounded-full border transition-all ${
              measureMode
                ? 'bg-emerald-500 border-emerald-400 text-black'
                : 'bg-black/60 border-white/20 text-white hover:bg-white/10'
            }`}
            title="Toggle Shoe Measurement Grid"
          >
            <Ruler className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all"
            title="Close AR"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bottom Floating Control Bar */}
      <div className="relative z-10 px-5 pb-10 pt-4 flex flex-col items-center gap-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
        {!isPlaced ? (
          <button
            onClick={() => setIsPlaced(true)}
            className="w-full py-3.5 px-6 rounded-2xl bg-[#C6A66B] hover:bg-[#D4B579] text-black font-extrabold text-sm tracking-wider uppercase transition-all shadow-xl active:scale-98 flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Place Insole In Room</span>
          </button>
        ) : (
          <div className="w-full space-y-3">
            {/* Quick AR adjustment controls */}
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-black/75 backdrop-blur-md border border-white/15 text-xs font-mono">
              <span className="text-white/60">Scale:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScale((s) => Math.max(70, s - 10))}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                >
                  -
                </button>
                <span className="text-[#C6A66B] font-bold">{scale}%</span>
                <button
                  onClick={() => setScale((s) => Math.min(130, s + 10))}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20"
                >
                  +
                </button>
              </div>

              <span className="text-white/60">Rotate:</span>
              <button
                onClick={() => setRotation((r) => (r + 45) % 360)}
                className="flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[#C6A66B]"
              >
                <RotateCw className="w-3.5 h-3.5" />
                <span>{rotation}°</span>
              </button>

              <button
                onClick={() => setIsPlaced(false)}
                className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-white/80"
              >
                Reset
              </button>
            </div>

            <p className="text-[11px] text-center text-white/60">
              Drag to reposition • Tap insole to rotate • Move camera closer to inspect 3K weave
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

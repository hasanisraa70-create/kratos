import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, ZoomOut, Layers, Eye, RefreshCw } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductColor } from '../../types';

interface Insole3DViewerProps {
  color?: ProductColor;
  engravingText?: string;
  archHeight?: 'Low' | 'Neutral' | 'High';
  height?: string;
  showControls?: boolean;
  viewAngle?: 'perspective' | 'top' | 'bottom' | 'side' | 'heel';
  onAngleChange?: (angle: 'perspective' | 'top' | 'bottom' | 'side' | 'heel') => void;
  onOpenFullscreen?: () => void;
}

export const Insole3DViewer: React.FC<Insole3DViewerProps> = ({
  color,
  engravingText = '',
  archHeight = 'Neutral',
  height = '320px',
  showControls = true,
  viewAngle,
  onAngleChange,
  onOpenFullscreen,
}) => {
  const { theme } = useApp();
  const isLight = theme === 'light';

  const mountRef = useRef<HTMLDivElement>(null);
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [activeAngle, setActiveAngle] = useState<'perspective' | 'top' | 'bottom' | 'side' | 'heel'>('perspective');
  const [isExploded, setIsExploded] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // References to three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const groupRef = useRef<THREE.Group | null>(null);
  const topLayerRef = useRef<THREE.Mesh | null>(null);
  const foamLayerRef = useRef<THREE.Mesh | null>(null);
  const carbonPlateRef = useRef<THREE.Mesh | null>(null);
  const heelCushionRef = useRef<THREE.Mesh | null>(null);

  // Drag interaction state
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const rotationVelocityRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const heightPx = container.clientHeight || 320;

    // SCENE
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // CAMERA - positioned with lookAt dead-center (0, 0, 0)
    const camera = new THREE.PerspectiveCamera(45, width / heightPx, 0.1, 100);
    camera.position.set(0, 0.6, 4.4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, heightPx);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight1.position.set(4, 6, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xc6a66b, 1.4); // Gold rim light
    dirLight2.position.set(-4, -2, 4);
    scene.add(dirLight2);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.0);
    backLight.position.set(0, -4, -4);
    scene.add(backLight);

    // MAIN GROUP (centered at 0, 0, 0)
    const mainGroup = new THREE.Group();
    groupRef.current = mainGroup;
    scene.add(mainGroup);

    // Dynamic Canvas Texture for Carbon Fiber Weave + Engraving
    const createCarbonTexture = (accentColorHex: string, engraving: string) => {
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.CanvasTexture(canvas);

      // Carbon weave base
      ctx.fillStyle = '#111215';
      ctx.fillRect(0, 0, 512, 512);

      // 3K Carbon twill weave pattern
      const twillSize = 16;
      for (let x = 0; x < 512; x += twillSize) {
        for (let y = 0; y < 512; y += twillSize) {
          const isAlt = (Math.floor(x / twillSize) + Math.floor(y / twillSize)) % 2 === 0;
          ctx.fillStyle = isAlt ? '#1e2128' : '#0c0d10';
          ctx.fillRect(x, y, twillSize, twillSize);

          // Diagonal weave highlight
          ctx.strokeStyle = isAlt ? 'rgba(255,255,255,0.09)' : 'rgba(0,0,0,0.5)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(x + twillSize, y + twillSize);
          ctx.stroke();
        }
      }

      // Kratos Carbon Fiber Technical Badge Graphic
      ctx.strokeStyle = accentColorHex || '#C6A66B';
      ctx.lineWidth = 3;
      ctx.strokeRect(170, 190, 172, 85);

      ctx.fillStyle = accentColorHex || '#C6A66B';
      ctx.font = 'bold 24px "SF Pro Display", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('KRATOS 3K', 256, 230);

      ctx.fillStyle = '#888888';
      ctx.font = 'bold 11px monospace';
      ctx.fillText('AEROSPACE COMPOSITE', 256, 255);

      // Custom Laser Engraving on Heel
      if (engraving && engraving.trim().length > 0) {
        ctx.fillStyle = 'rgba(255, 235, 190, 0.98)';
        ctx.font = 'bold 28px monospace';
        ctx.fillText(`• ${engraving.toUpperCase()} •`, 256, 400);

        ctx.fillStyle = 'rgba(198, 166, 107, 0.85)';
        ctx.font = '11px monospace';
        ctx.fillText('PRECISION LASER ETCHED', 256, 425);
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      return texture;
    };

    const carbonTexture = createCarbonTexture(color?.accentHex || '#C6A66B', engravingText);

    // Contoured athletic insole shape
    const insoleShape = new THREE.Shape();
    insoleShape.moveTo(-0.5, -1.5); // Heel center
    insoleShape.bezierCurveTo(-0.7, -1.5, -0.8, -1.1, -0.8, -0.7); // Lateral heel
    insoleShape.bezierCurveTo(-0.8, -0.3, -0.65, 0.2, -0.75, 0.75); // Forefoot lateral
    insoleShape.bezierCurveTo(-0.8, 1.2, -0.45, 1.6, 0.0, 1.65); // Toe apex
    insoleShape.bezierCurveTo(0.45, 1.6, 0.7, 1.2, 0.65, 0.75); // Big toe medial
    insoleShape.bezierCurveTo(0.55, 0.2, 0.3, -0.3, 0.4, -0.8); // Medial arch contour
    insoleShape.bezierCurveTo(0.5, -1.2, 0.5, -1.5, 0.0, -1.5); // Heel cup medial

    const extrudeSettings = {
      steps: 4,
      depth: 0.08,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.03,
      bevelOffset: 0,
      bevelSegments: 4,
    };

    // 1. TOP ANTIMICROBIAL COVER LAYER
    const topGeometry = new THREE.ExtrudeGeometry(insoleShape, { ...extrudeSettings, depth: 0.04 });
    topGeometry.center(); // Centers vertex bounds to (0,0,0)!

    // Subtle arch curvature deformation
    const pos = topGeometry.attributes.position;
    const archFactor = archHeight === 'High' ? 0.35 : archHeight === 'Low' ? 0.16 : 0.26;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      // Lift the medial arch zone
      if (y > -0.8 && y < 0.4 && x > -0.1) {
        const factor = Math.sin(((y + 0.8) / 1.2) * Math.PI) * archFactor * (x + 0.25);
        pos.setZ(i, pos.getZ(i) + factor);
      }
      // Cup the heel
      if (y < -0.9) {
        const heelDist = Math.sqrt(x * x + (y + 1.2) * (y + 1.2));
        pos.setZ(i, pos.getZ(i) + heelDist * 0.12);
      }
    }
    topGeometry.computeVertexNormals();

    const topMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color?.hex || '#C6A66B'),
      metalness: 0.25,
      roughness: 0.5,
      map: carbonTexture,
    });
    const topLayer = new THREE.Mesh(topGeometry, topMaterial);
    topLayer.position.z = 0.06;
    topLayerRef.current = topLayer;
    mainGroup.add(topLayer);

    // 2. DUAL DENSITY FOAM INTERMEDIATE LAYER
    const foamGeometry = topGeometry.clone();
    const foamMaterial = new THREE.MeshStandardMaterial({
      color: 0x202124,
      roughness: 0.85,
      metalness: 0.1,
    });
    const foamLayer = new THREE.Mesh(foamGeometry, foamMaterial);
    foamLayer.position.z = 0.02;
    foamLayerRef.current = foamLayer;
    mainGroup.add(foamLayer);

    // 3. CARBON FIBER SHANK / SOLE PLATE
    const carbonGeometry = topGeometry.clone();
    const carbonMaterial = new THREE.MeshStandardMaterial({
      color: 0x111215,
      roughness: 0.25,
      metalness: 0.8,
      map: carbonTexture,
    });
    const carbonPlate = new THREE.Mesh(carbonGeometry, carbonMaterial);
    carbonPlate.position.z = -0.04;
    carbonPlateRef.current = carbonPlate;
    mainGroup.add(carbonPlate);

    // 4. PORON HEEL SHOCK CUSHION POD
    const heelPodGeo = new THREE.CylinderGeometry(0.3, 0.32, 0.05, 32);
    const heelPodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color(color?.accentHex || '#C6A66B'),
      roughness: 0.3,
      metalness: 0.4,
    });
    const heelPod = new THREE.Mesh(heelPodGeo, heelPodMat);
    heelPod.position.set(0, -1.1, -0.08);
    heelPod.rotation.x = Math.PI / 2;
    heelCushionRef.current = heelPod;
    mainGroup.add(heelPod);

    // Recenter the entire mainGroup bounding box so the pivot point is (0,0,0)
    const box = new THREE.Box3().setFromObject(mainGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    mainGroup.children.forEach((child) => {
      child.position.sub(center);
    });

    // Default orientation: dynamic 3/4 perspective angled naturally in center view
    mainGroup.rotation.set(-0.7, 0.3, -0.2);

    // Soft ground contact shadow plane centered directly underneath
    const shadowGeo = new THREE.PlaneGeometry(3.0, 3.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.45,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.2;
    scene.add(shadowMesh);

    // Pointer / Touch Events
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDraggingRef.current = true;
      setIsAutoRotate(false);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current || !groupRef.current) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePositionRef.current.x;
      const deltaY = clientY - previousMousePositionRef.current.y;

      groupRef.current.rotation.y += deltaX * 0.012;
      groupRef.current.rotation.x += deltaY * 0.012;

      rotationVelocityRef.current = { x: deltaY * 0.003, y: deltaX * 0.003 };
      previousMousePositionRef.current = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    domElement.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp);

    // ANIMATION LOOP
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (groupRef.current) {
        if (isAutoRotate && !isDraggingRef.current) {
          groupRef.current.rotation.y += 0.009;
        }

        // Inertia damping
        if (!isDraggingRef.current && (Math.abs(rotationVelocityRef.current.x) > 0.0001 || Math.abs(rotationVelocityRef.current.y) > 0.0001)) {
          groupRef.current.rotation.x += rotationVelocityRef.current.x;
          groupRef.current.rotation.y += rotationVelocityRef.current.y;
          rotationVelocityRef.current.x *= 0.92;
          rotationVelocityRef.current.y *= 0.92;
        }
      }

      if (cameraRef.current) {
        cameraRef.current.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      domElement.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      domElement.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', handlePointerUp);
      renderer.dispose();
    };
  }, [archHeight]);

  // Handle color & engraving texture updates
  useEffect(() => {
    if (topLayerRef.current && color) {
      const mat = topLayerRef.current.material as THREE.MeshStandardMaterial;
      mat.color.set(color.hex);
      mat.needsUpdate = true;
    }
    if (heelCushionRef.current && color) {
      const podMat = heelCushionRef.current.material as THREE.MeshStandardMaterial;
      podMat.color.set(color.accentHex);
      podMat.needsUpdate = true;
    }
  }, [color]);

  // Handle Exploded Layers View
  useEffect(() => {
    if (!topLayerRef.current || !foamLayerRef.current || !carbonPlateRef.current || !heelCushionRef.current) return;

    if (isExploded) {
      topLayerRef.current.position.z = 0.55;
      foamLayerRef.current.position.z = 0.2;
      carbonPlateRef.current.position.z = -0.25;
      heelCushionRef.current.position.z = -0.65;
    } else {
      topLayerRef.current.position.z = 0.06;
      foamLayerRef.current.position.z = 0.02;
      carbonPlateRef.current.position.z = -0.04;
      heelCushionRef.current.position.z = -0.08;
    }
  }, [isExploded]);

  // Camera presets
  const setCameraPreset = (preset: 'perspective' | 'top' | 'bottom' | 'side' | 'heel') => {
    setActiveAngle(preset);
    if (onAngleChange) onAngleChange(preset);
    setIsAutoRotate(false);
    if (!groupRef.current) return;

    switch (preset) {
      case 'perspective':
        groupRef.current.rotation.set(-0.7, 0.3, -0.2);
        break;
      case 'top':
        groupRef.current.rotation.set(0, 0, 0);
        break;
      case 'bottom':
        groupRef.current.rotation.set(Math.PI, 0, Math.PI);
        break;
      case 'side':
        groupRef.current.rotation.set(-0.1, -Math.PI / 2, 0);
        break;
      case 'heel':
        // Focused view angled on heel showing laser engraving clearly
        groupRef.current.rotation.set(-0.4, 0.05, 0);
        break;
    }
  };

  // Sync external viewAngle changes
  useEffect(() => {
    if (viewAngle && viewAngle !== activeAngle) {
      setCameraPreset(viewAngle);
    }
  }, [viewAngle]);

  const handleZoom = (delta: number) => {
    if (!cameraRef.current) return;
    const newZoom = Math.min(Math.max(zoomLevel + delta, 0.7), 1.7);
    setZoomLevel(newZoom);
    cameraRef.current.zoom = newZoom;
    cameraRef.current.updateProjectionMatrix();
  };

  const resetCamera = () => {
    setCameraPreset('perspective');
    setZoomLevel(1);
    if (cameraRef.current) {
      cameraRef.current.zoom = 1;
      cameraRef.current.updateProjectionMatrix();
    }
    setIsAutoRotate(false);
    setIsExploded(false);
  };

  return (
    <div
      className={`relative w-full rounded-3xl overflow-hidden border transition-all ${
        isLight
          ? 'bg-gradient-to-b from-[#F6F8FA] via-[#EEF2F6] to-[#E2E8F0] border-gray-200/90 shadow-md'
          : 'bg-gradient-to-b from-[#18191e] via-[#121316] to-[#0a0a0c] border-white/10 shadow-2xl'
      }`}
    >
      {/* 3D Canvas Container */}
      <div
        ref={mountRef}
        style={{ height }}
        className="w-full cursor-grab active:cursor-grabbing select-none flex items-center justify-center"
      />

      {/* Floating 360 Rotation Hint */}
      <div
        className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-md border text-[10px] font-mono uppercase tracking-wider pointer-events-none transition-colors ${
          isLight
            ? 'bg-white/85 border-gray-200 text-gray-800 shadow-xs'
            : 'bg-black/60 border-white/15 text-white/90'
        }`}
      >
        <RotateCw className="w-3 h-3 text-[#C6A66B] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-bold">360° Interactive 3D Model</span>
      </div>

      {/* Top Right Action Badges */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {onOpenFullscreen && (
          <button
            onClick={onOpenFullscreen}
            className={`p-1.5 rounded-full backdrop-blur-md border transition-all active:scale-95 ${
              isLight
                ? 'bg-white/90 hover:bg-white text-gray-800 border-gray-200 shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
            }`}
            title="Full Screen 3D Viewer"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Camera Presets & Exploded Layers Bar */}
      {showControls && (
        <div className="absolute bottom-2.5 inset-x-2.5 flex flex-wrap items-center justify-between gap-1.5 pointer-events-auto">
          {/* Preset Angle Chips */}
          <div
            className={`flex items-center gap-1 backdrop-blur-md p-1 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white/90 border-gray-200 shadow-sm'
                : 'bg-black/75 border-white/10'
            }`}
          >
            {(['perspective', 'top', 'bottom', 'side', 'heel'] as const).map((angle) => (
              <button
                key={angle}
                onClick={() => setCameraPreset(angle)}
                className={`px-2 py-1 rounded-lg text-[9px] font-bold uppercase transition-all ${
                  activeAngle === angle
                    ? 'bg-[#C6A66B] text-black shadow-sm'
                    : isLight
                    ? 'text-gray-600 hover:text-black hover:bg-gray-100'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {angle === 'perspective' ? '3D' : angle}
              </button>
            ))}
          </div>

          {/* Action Tools */}
          <div
            className={`flex items-center gap-1 backdrop-blur-md p-1 rounded-xl border transition-colors ${
              isLight
                ? 'bg-white/90 border-gray-200 shadow-sm'
                : 'bg-black/75 border-white/10'
            }`}
          >
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`p-1.5 rounded-lg text-xs transition-all flex items-center gap-1 ${
                isExploded
                  ? 'bg-[#C6A66B] text-black font-bold'
                  : isLight
                  ? 'text-gray-700 hover:bg-gray-100 hover:text-black'
                  : 'text-white/80 hover:bg-white/10'
              }`}
              title="Explode Engineering Layers"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="text-[9px] hidden sm:inline">Layers</span>
            </button>

            <button
              onClick={() => setIsAutoRotate(!isAutoRotate)}
              className={`p-1.5 rounded-lg text-xs transition-all ${
                isAutoRotate
                  ? 'text-[#C6A66B]'
                  : isLight
                  ? 'text-gray-600 hover:text-black'
                  : 'text-white/60 hover:text-white'
              }`}
              title="Toggle Auto Spin"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleZoom(0.15)}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleZoom(-0.15)}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={resetCamera}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight
                  ? 'text-gray-700 hover:text-black hover:bg-gray-100'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
              title="Reset View"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Exploded Layers Callout Overlay */}
      {isExploded && (
        <div
          className={`absolute top-11 left-3 backdrop-blur-md p-2 rounded-xl border text-[10px] space-y-1 shadow-xl max-w-[200px] animate-fadeIn transition-colors ${
            isLight
              ? 'bg-white/95 border-gray-300 text-gray-800'
              : 'bg-black/90 border-[#C6A66B]/40 text-white/90'
          }`}
        >
          <div className="font-bold text-[#A38448] uppercase tracking-wider text-[9px]">
            Exploded Assembly:
          </div>
          <div>1. Antimicrobial Top Sheet</div>
          <div>2. Dual High-Rebound PU Foam</div>
          <div>3. 100% 3K Carbon Plate</div>
          <div>4. Poron Impact Heel Pod</div>
        </div>
      )}
    </div>
  );
};

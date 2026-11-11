import React, { useState } from 'react';
import { X, Code2, Copy, Check, Smartphone, Layers, Cpu, Box } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FlutterSpecModal: React.FC = () => {
  const { showFlutterSpec, setShowFlutterSpec, showToast } = useApp();
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  if (!showFlutterSpec) return null;

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSection(id);
    showToast('Flutter snippet copied to clipboard');
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const dartThemeSnippet = `// lib/core/theme/kratos_theme.dart
import 'package:flutter/material.dart';

class KratosTheme {
  static const Color primaryBlack = Color(0xFF101010);
  static const Color secondaryCharcoal = Color(0xFF202020);
  static const Color accentGold = Color(0xFFC6A66B);
  static const Color accentGoldLight = Color(0xFFEAD7A1);
  static const Color backgroundWhite = Color(0xFFFFFFFF);
  static const Color secondaryBackground = Color(0xFFF5F5F5);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: primaryBlack,
      colorScheme: const ColorScheme.dark(
        primary: accentGold,
        onPrimary: Colors.black,
        surface: secondaryCharcoal,
        onSurface: Colors.white,
      ),
      fontFamily: 'SF Pro Display',
    );
  }
}`;

  const dartWidgetSnippet = `// lib/features/customizer/presentation/widgets/customization_stepper.dart
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

class CustomizationStepper extends ConsumerWidget {
  final int currentStep;
  final Function(int) onStepTapped;

  const CustomizationStepper({
    super.key,
    required this.currentStep,
    required this.onStepTapped,
  });

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final steps = ['Product', 'Size', 'Color', 'Tuning', 'Preview'];

    return Row(
      children: List.generate(steps.length, (index) {
        final isActive = index + 1 == currentStep;
        final isDone = index + 1 < currentStep;

        return Expanded(
          child: Column(
            children: [
              Container(
                height: 4,
                margin: const EdgeInsets.symmetric(horizontal: 2),
                decoration: BoxDecoration(
                  color: isActive
                      ? KratosTheme.accentGold
                      : isDone
                          ? Colors.white
                          : Colors.grey.shade800,
                  borderRadius: BorderRadius.circular(2),
                ),
              ),
              const SizedBox(height: 4),
              Text(
                steps[index].toUpperCase(),
                style: TextStyle(
                  fontSize: 9,
                  fontWeight: isActive ? FontWeight.bold : FontWeight.normal,
                  color: isActive ? KratosTheme.accentGold : Colors.grey,
                ),
              ),
            ],
          ),
        );
      }),
    );
  }
}`;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[85vh] rounded-3xl bg-[#14151a] border border-white/15 flex flex-col overflow-hidden text-white shadow-2xl">
        {/* Header */}
        <div className="px-6 py-4 bg-[#181a20] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#C6A66B]/20 text-[#C6A66B]">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black uppercase text-white tracking-wider">
                FLUTTER 3.X ARCHITECTURE & WIDGET TREE SPECIFICATION
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Ready for Dart • Material 3 • Riverpod • GoRouter • ModelViewer Plus
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowFlutterSpec(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar text-xs">
          {/* Component Mapping Grid */}
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#C6A66B] uppercase font-bold tracking-wider">
              1. DIRECT REUSABLE FLUTTER WIDGET MAPPINGS
            </span>
            <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
              {[
                { react: 'ProductCard', flutter: 'KratosProductCard.dart (StatelessWidget)' },
                { react: 'ProductViewer', flutter: 'Kratos3DViewer.dart (model_viewer_plus / flutter_scene)' },
                { react: 'ColorSelector', flutter: 'ColorwaySwatchSelector.dart' },
                { react: 'SizeSelector', flutter: 'AthleticSizeGrid.dart' },
                { react: 'CustomizationStepper', flutter: 'CustomizationStepper.dart (StateNotifier)' },
                { react: 'CartItem', flutter: 'CartItemTile.dart (Dismissible)' },
                { react: 'OrderTimeline', flutter: 'OrderTimelineStepper.dart' },
                { react: 'BottomNavigation', flutter: 'KratosBottomNavBar.dart (NavigationDestination)' },
                { react: 'PrimaryButton', flutter: 'KratosAthleticButton.dart (ElevatedButton)' },
                { react: 'ProductSpecCard', flutter: 'ProductSpecificationSheet.dart' },
              ].map((m) => (
                <div key={m.react} className="p-2.5 rounded-xl bg-black/50 border border-white/5 space-y-0.5">
                  <span className="text-zinc-400 text-[10px] block">UI Component:</span>
                  <span className="text-[#C6A66B] font-bold">{m.react}</span>
                  <span className="text-white text-[10px] block font-sans">{m.flutter}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 3D & AR Rendering Engine in Flutter */}
          <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-[#C6A66B] font-mono font-bold">
              <Box className="w-4 h-4" />
              <span>3D & AR INTEGRATION IN FLUTTER</span>
            </div>
            <p className="text-zinc-300 leading-relaxed text-[11px]">
              For Flutter production deployment, the 3D insole experience uses <code>model_viewer_plus: ^1.7.0</code> (powered by Google&apos;s Filament engine) or <code>flutter_cube</code> to load <code>.glb</code> assets with real-time metallic roughness carbon textures. Platform AR uses <code>arkit_plugin</code> on iOS and <code>arcore_flutter_plugin</code> on Android with surface detection!
            </p>
          </div>

          {/* Snippet 1: Theme Tokens */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#C6A66B] uppercase font-bold">
                2. DART KRATOS DESIGN TOKENS
              </span>
              <button
                onClick={() => copyCode(dartThemeSnippet, 'theme')}
                className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-white"
              >
                {copiedSection === 'theme' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'theme' ? 'Copied' : 'Copy Dart'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-zinc-300 overflow-x-auto">
              {dartThemeSnippet}
            </pre>
          </div>

          {/* Snippet 2: CustomizationStepper Widget */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono text-[#C6A66B] uppercase font-bold">
                3. STEPPER WIDGET CODE (RIVERPOD INTEGRATION)
              </span>
              <button
                onClick={() => copyCode(dartWidgetSnippet, 'stepper')}
                className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-white"
              >
                {copiedSection === 'stepper' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'stepper' ? 'Copied' : 'Copy Dart'}</span>
              </button>
            </div>
            <pre className="p-3 rounded-2xl bg-black/80 border border-white/10 text-[11px] font-mono text-zinc-300 overflow-x-auto">
              {dartWidgetSnippet}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#181a20] border-t border-white/10 flex justify-between items-center">
          <span className="text-[10px] font-mono text-zinc-500">
            ALL ASSETS PRE-CONFIGURED FOR DART / FLUTTER EXPORT
          </span>
          <button
            onClick={() => setShowFlutterSpec(false)}
            className="px-4 py-1.5 rounded-xl bg-[#C6A66B] text-black font-extrabold text-xs uppercase"
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
};

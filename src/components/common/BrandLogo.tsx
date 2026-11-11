import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const isDark = variant === 'dark';
  const isGold = variant === 'gold';

  const textColor = isGold
    ? 'text-[#C6A66B]'
    : isDark
    ? 'text-[#101010]'
    : 'text-white';

  const subColor = isGold
    ? 'text-[#EAD7A1]'
    : isDark
    ? 'text-[#777777]'
    : 'text-[#A0A0A0]';

  const iconSize = {
    sm: 18,
    md: 24,
    lg: 32,
    xl: 44,
  }[size];

  const fontSize = {
    sm: 'text-sm tracking-[0.2em]',
    md: 'text-base tracking-[0.25em]',
    lg: 'text-xl tracking-[0.3em]',
    xl: 'text-3xl tracking-[0.35em]',
  }[size];

  const subFontSize = {
    sm: 'text-[7px]',
    md: 'text-[9px]',
    lg: 'text-[11px]',
    xl: 'text-[13px]',
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Kratos Precision Chevron / Carbon Monogram Mark */}
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105"
      >
        <path
          d="M6 4L16 16L6 28H11L18.5 19L26 28H31L20.5 16L30 4H25L17.5 13L10.5 4H6Z"
          fill={isGold ? '#C6A66B' : isDark ? '#101010' : '#FFFFFF'}
        />
        <path
          d="M16 16L19 12.5L22 16L16 23.5L10 16L13 12.5L16 16Z"
          fill={isGold ? '#EAD7A1' : '#C6A66B'}
          opacity="0.9"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span className={`font-black uppercase font-mono ${fontSize} ${textColor}`}>
          KRATOS
        </span>
        {showSubtitle && (
          <span
            className={`font-semibold uppercase tracking-[0.32em] mt-0.5 ${subFontSize} ${subColor}`}
          >
            PERFORMANCE SYSTEMS
          </span>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import logoDark from '../../assets/kratos-logo-dark.png';
import logoWhite from '../../assets/kratos-logo-white.png';
import logoGold from '../../assets/kratos-logo-gold.png';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  className = '',
}) => {
  const getLogoSrc = () => {
    switch (variant) {
      case 'dark':
        return logoDark;
      case 'gold':
        return logoGold;
      case 'light':
      default:
        return logoWhite;
    }
  };

  const sizeClasses = {
    sm: 'h-8 max-w-[150px]',
    md: 'h-10 max-w-[180px]',
    lg: 'h-14 max-w-[220px]',
    xl: 'h-20 max-w-[280px]',
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={getLogoSrc()}
        alt="KRATOS - Carbon Insoles Engineered For Performance"
        className={`${sizeClasses} w-auto object-contain transition-all duration-200 hover:scale-[1.02] drop-shadow-xs`}
        loading="eager"
      />
    </div>
  );
};

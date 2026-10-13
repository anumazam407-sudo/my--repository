import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dark' | 'light';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  const textSize = size === 'sm' ? 'text-lg tracking-[0.2em]' : size === 'lg' ? 'text-3xl tracking-[0.28em]' : 'text-2xl tracking-[0.24em]';
  const subtitleSize = size === 'sm' ? 'text-[8px] tracking-[0.3em]' : 'text-[10px] tracking-[0.35em]';

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      <div className="flex items-center gap-2">
        {/* Luxury Crest Monogram */}
        <div
          className={`flex items-center justify-center rounded-full transition-all duration-300 ${
            size === 'sm' ? 'w-6 h-6 border' : size === 'lg' ? 'w-10 h-10 border-2' : 'w-8 h-8 border'
          } ${
            isLight
              ? 'border-[#D4AF37] text-[#D4AF37] bg-black/20'
              : 'border-[#9E7D4B] text-[#9E7D4B] bg-[#FAF8F5]'
          }`}
        >
          <span className="font-serif italic font-bold leading-none translate-y-[-0.5px]">Z</span>
        </div>

        {/* Wordmark */}
        <span
          className={`font-serif font-semibold uppercase ${textSize} ${
            isLight ? 'text-white' : 'text-[#1E1B18]'
          }`}
        >
          ZAYRAH
        </span>
      </div>

      {showSubtitle && (
        <span
          className={`uppercase font-sans font-medium mt-0.5 ${subtitleSize} ${
            isLight ? 'text-amber-200/80' : 'text-[#8C6239]'
          }`}
        >
          Haute Couture • Pakistan
        </span>
      )}
    </div>
  );
};

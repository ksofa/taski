import React from "react";

interface SuccessScreenProps {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title = "Заявка отправлена!",
  subtitle = "Мы свяжемся с вами в ближайшее время.",
  buttonText = "На главную",
  onButtonClick,
}) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center py-12 px-4 sm:px-6 md:px-8 bg-white rounded-2xl shadow-lg w-full max-w-md mx-auto">
      {/* Иллюстрация успеха */}
      <div className="mb-6">
        {/* SVG из Figma, можно заменить на <img src="/success.svg" ... /> если есть файл */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <rect width="80" height="80" rx="24" fill="#E6F4EA"/>
          <path d="M24 41.5L36.5 54L56 34.5" stroke="#0FB14D" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2 className="text-[22px] sm:text-[26px] font-semibold text-[#222] text-center mb-2">{title}</h2>
      <p className="text-[15px] sm:text-[16px] text-[#666769] text-center mb-6">{subtitle}</p>
      <button
        className="w-full h-12 bg-main-colorsaqua text-white rounded-[12px] font-medium text-[16px] hover:bg-[#3771C8] transition"
        onClick={onButtonClick}
      >
        {buttonText}
      </button>
    </div>
  );
}; 
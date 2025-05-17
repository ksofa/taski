import React from "react";
import { Card } from "../../components/ui/card";

interface StartScreenProps {
  onSelect: (action: "login" | "register" | "createProject") => void;
}

const options = [
  {
    key: "login",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><path d="M17 6h5a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2h-5" stroke="#3771C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13 22l-5-6 5-6M8 16h14" stroke="#3771C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    title: "Авторизация",
    subtitle: "Войдите в систему под своим логином и паролем",
  },
  {
    key: "register",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><rect x="4" y="20" width="24" height="8" rx="4" stroke="#A5A5A7" strokeWidth="2"/><circle cx="16" cy="12" r="6" stroke="#A5A5A7" strokeWidth="2"/><path d="M22 12h2M16 6v2M10 12H8M16 18v2" stroke="#A5A5A7" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Регистрация",
    subtitle: "Создайте нового пользователя: Физическое или Юридическое лицо",
  },
  {
    key: "createProject",
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="12" stroke="#A5A5A7" strokeWidth="2"/><path d="M16 10v8M12 16h8" stroke="#A5A5A7" strokeWidth="2" strokeLinecap="round"/></svg>
    ),
    title: "Создать проект",
    subtitle: "Для не авторизованного или зарегистрированного пользователя",
  },
];

export const StartScreen: React.FC<StartScreenProps> = ({ onSelect }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#5B7FC7] px-0 sm:px-4 md:px-6 lg:px-8">
      <div className="w-full sm:max-w-4xl bg-[#F3F5F8] rounded-none sm:rounded-xl p-0 flex flex-col" style={{ minHeight: "100vh" }}>
        <div className="px-2 sm:px-8 md:px-12 pt-3 sm:pt-8 pb-0">
          <h2 className="text-base sm:text-xl font-medium text-[#222] mb-3 sm:mb-8">Выберите способ входа</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center p-1 sm:p-6">
          <div className="w-full max-w-full sm:max-w-md flex flex-col gap-2 sm:gap-4">
            {options.map((opt, idx) => (
              <button
                key={opt.key}
                onClick={() => onSelect(opt.key as any)}
                className={`flex items-center w-full bg-white rounded-none sm:rounded-lg px-2 sm:px-6 py-4 sm:py-4 shadow-sm border transition hover:bg-[#F3F5F8] focus:outline-none ${idx === 0 ? 'border-[#B6D0F7] bg-[#F3F7FE]' : 'border-transparent'}`}
                style={{ minHeight: "64px" }}
              >
                <span className="mr-2 sm:mr-4 flex-shrink-0">
                  <svg width="24" height="24" fill="none" viewBox="0 0 32 32" className="w-6 h-6 sm:w-8 sm:h-8">
                    {opt.icon.props.children}
                  </svg>
                </span>
                <span className="flex flex-col text-left">
                  <span className="font-semibold text-sm sm:text-base text-[#222]">{opt.title}</span>
                  <span className="text-xs sm:text-xs text-[#A5A5A7] mt-0.5">{opt.subtitle}</span>
                </span>
                <span className="ml-auto flex-shrink-0">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6"><path d="M9 6l6 6-6 6" stroke="#3771C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
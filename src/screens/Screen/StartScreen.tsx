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
    <div className="min-h-screen flex items-center justify-center bg-[#5B7FC7]">
      <div className="w-full max-w-4xl bg-[#F3F5F8] rounded-xl p-0 flex flex-col" style={{ minHeight: 600 }}>
        <div className="px-12 pt-8 pb-0">
          <h2 className="text-xl font-medium text-[#222] mb-8">Выберите способ входа</h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-md flex flex-col gap-4">
            {options.map((opt, idx) => (
              <button
                key={opt.key}
                onClick={() => onSelect(opt.key as any)}
                className={`flex items-center w-full bg-white rounded-lg px-6 py-4 shadow-sm border transition hover:bg-[#F3F5F8] focus:outline-none ${idx === 0 ? 'border-[#B6D0F7] bg-[#F3F7FE]' : 'border-transparent'}`}
                style={{ minHeight: 72 }}
              >
                <span className="mr-4 flex-shrink-0">{opt.icon}</span>
                <span className="flex flex-col text-left">
                  <span className="font-semibold text-base text-[#222]">{opt.title}</span>
                  <span className="text-xs text-[#A5A5A7] mt-0.5">{opt.subtitle}</span>
                </span>
                <span className="ml-auto flex-shrink-0">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" stroke="#3771C8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 
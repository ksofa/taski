import { ChevronDownIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

export const HeaderByAnima = ({ onProfileClick }: { onProfileClick?: () => void }): JSX.Element => {
  // Current date and time data
  const dateInfo = {
    date: "Сегодня 21 февраля",
    time: "14:03 МСК",
  };

  // User account data
  const accountInfo = {
    balance: "1 000 000₽",
    role: "Исполнитель",
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 w-full bg-neutralneutral-100 border-b border-[#ececec]">
      {/* Left section - Logo and date/time */}
      <div className="flex items-center gap-8">
        {/* Logo */}
        <div className="flex h-10 items-center gap-1">
          <div className="relative w-[26.59px] h-10">
            <div className="relative w-[19px] h-9 top-0.5 left-1">
              <img
                className="top-2 left-0 absolute w-[11px] h-3"
                alt="Polygon"
                src="/polygon-1.svg"
              />
              <img
                className="top-6 left-0 absolute w-[11px] h-3"
                alt="Polygon"
                src="/polygon-1.svg"
              />
              <img
                className="top-[17px] left-2 absolute w-[11px] h-3"
                alt="Polygon"
                src="/polygon-2.svg"
              />
              <img
                className="top-0 left-2 absolute w-[11px] h-3"
                alt="Polygon"
                src="/polygon-2.svg"
              />
            </div>
          </div>
          <div className="font-medium text-neutralneutral-10 text-base">
            TASKA
          </div>
        </div>

        {/* Date and time */}
        <div className="flex items-center gap-3">
          <div className="text-neutralneutral-60 font-paragraph-16-medium text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
            {dateInfo.date}
          </div>
          <div className="text-neutralneutral-10 font-paragraph-16-medium text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
            {dateInfo.time}
          </div>
        </div>
      </div>

      {/* Middle section - Hidden breadcrumbs (opacity-0 in original) */}
      <div className="flex items-center opacity-0 gap-1">
        <div className="flex justify-center gap-2.5 rounded-sm items-center">
          <div className="text-neutralneutral-10 font-paragraph-16 text-[length:var(--paragraph-16-font-size)] leading-[var(--paragraph-16-line-height)]">
            Проекты
          </div>
        </div>
        <img className="w-5 h-5" alt="Chevron right" />
        <div className="font-paragraph-16-medium text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
          Разработка личного кабинета МТС и сервиса
        </div>
        <img className="w-5 h-5" alt="Chevron right" />
        <div className="font-paragraph-16-medium text-neutralneutral-60 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
          Команда
        </div>
      </div>

      {/* Right section - Controls and user info */}
      <div className="flex items-center gap-2">
        {/* Notification button */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 rounded-full border-[#dededf]"
        >
          <img className="w-6 h-6" alt="Notifications" src="/frame-2.svg" />
        </Button>

        {/* Settings button */}
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-[#dededf]"
        >
          <img className="w-6 h-6" alt="Settings" src="/frame-3.svg" />
        </Button>

        {/* Balance display */}
        <Button
          variant="outline"
          className="h-12 px-3 rounded-full border-[#dededf] flex items-center gap-1"
        >
          <div className="flex w-8 h-8 items-center justify-center">
            <img className="w-6 h-6" alt="Balance icon" src="/frame-4.svg" />
          </div>
          <div className="flex items-center gap-1">
            <span className="font-paragraph-16-medium text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
              Счет:
            </span>
            <span className="font-paragraph-16-medium text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
              {accountInfo.balance}
            </span>
            <img className="w-6 h-6" alt="Balance details" src="/frame-1.svg" />
          </div>
        </Button>

        {/* User role selector */}
        <Button
          variant="outline"
          className="h-12 px-4 rounded-full border-[#dededf] flex items-center gap-2"
          onClick={onProfileClick}
        >
          <img className="w-6 h-6" alt="Person" src="/person.svg" />
          <div className="flex items-center gap-1">
            <span className="font-paragraph-16-medium text-neutralneutral-10 text-[length:var(--paragraph-16-medium-font-size)] leading-[var(--paragraph-16-medium-line-height)]">
              {accountInfo.role}
            </span>
            <ChevronDownIcon className="w-6 h-6" />
          </div>
        </Button>
      </div>
    </header>
  );
};

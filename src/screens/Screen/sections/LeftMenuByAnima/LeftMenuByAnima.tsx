import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";

interface LeftMenuByAnimaProps {
  onViewChange: (view: string) => void;
  activeView: string;
}

const menuItems = [
  { id: "projects", icon: "/project.svg", label: "Проекты", alt: "Project" },
  { id: "teams", icon: "/team.svg", label: "Команды", alt: "Team" },
  {
    id: "chats",
    icon: "/chat.svg",
    label: "Чаты",
    alt: "Chat",
    hasNotification: true,
  },
  { id: "applications", icon: "/stamp.svg", label: "Заявки", alt: "Stamp" },
];

export const LeftMenuByAnima = ({ onViewChange, activeView }: LeftMenuByAnimaProps): JSX.Element => {
  return (
    <nav className="flex flex-col h-[1000px] items-start justify-between p-6 bg-neutralneutral-100 border-r border-[#ececec]">
      <div className="flex flex-col items-start gap-6 self-stretch w-full">
        {menuItems.map((item) => (
          <div 
            key={item.id} 
            className="flex flex-col items-center gap-1 cursor-pointer"
            onClick={() => onViewChange(item.id)}
          >
            <div className="relative">
              <Button
                variant={activeView === item.id ? "default" : "outline"}
                size="icon"
                className={`w-12 h-12 rounded-[100px] ${
                  activeView === item.id 
                    ? "bg-main-colorsaqua border-main-colorsaqua" 
                    : "border border-solid border-[#dededf] bg-neutralneutral-100"
                } p-0`}
              >
                <img 
                  className={`w-6 h-6 ${activeView === item.id ? "filter brightness-0 invert" : ""}`} 
                  alt={item.alt} 
                  src={item.icon} 
                />
              </Button>

              {item.hasNotification && (
                <Badge className="absolute top-1 right-0 w-3 h-3 p-0 flex items-center justify-center bg-main-colorsaqua rounded-full border-[1.5px] border-solid border-[#f4f4f4]">
                  <span className="sr-only">New notifications</span>
                </Badge>
              )}
            </div>

            <span className={`font-left-menu font-[number:var(--left-menu-font-weight)] ${
              activeView === item.id ? "text-main-colorsaqua" : "text-neutralneutral-10"
            } text-[length:var(--left-menu-font-size)] leading-[var(--left-menu-line-height)] tracking-[var(--left-menu-letter-spacing)] [font-style:var(--left-menu-font-style)]`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-1">
        <Button
          variant="outline"
          size="icon"
          className="w-12 h-12 rounded-[100px] border border-solid border-[#dededf] bg-neutralneutral-100 p-0"
        >
          <img className="w-6 h-6" alt="Frame" src="/frame.svg" />
        </Button>

        <span className="font-left-menu font-[number:var(--left-menu-font-weight)] text-neutralneutral-20 text-[length:var(--left-menu-font-size)] tracking-[var(--left-menu-letter-spacing)] leading-[var(--left-menu-line-height)] [font-style:var(--left-menu-font-style)]">
          Выйти
        </span>
      </div>
    </nav>
  );
};
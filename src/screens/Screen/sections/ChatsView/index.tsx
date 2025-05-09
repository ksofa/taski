import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Search } from "lucide-react";

export const ChatsView = () => {
  const chats = [
    {
      id: 1,
      name: "Команда проекта А",
      lastMessage: "Давайте обсудим дизайн главной страницы",
      time: "14:30",
      unread: 3,
    },
    {
      id: 2,
      name: "Техническая поддержка",
      lastMessage: "Проблема решена, спасибо за обращение",
      time: "12:15",
      unread: 0,
    },
    {
      id: 3,
      name: "Маркетинг",
      lastMessage: "Новая кампания запущена успешно",
      time: "Вчера",
      unread: 1,
    },
  ];

  return (
    <div className="flex h-full">
      {/* Chat list */}
      <div className="w-80 border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Input
            placeholder="Поиск чата..."
            className="flex-1"
          />
          <Button size="icon" variant="ghost">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2">
          {chats.map((chat) => (
            <Card key={chat.id} className="cursor-pointer hover:bg-gray-50">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/40?img=${chat.id}`} />
                    <AvatarFallback>{chat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{chat.name}</p>
                      <span className="text-xs text-gray-500">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                  {chat.unread > 0 && (
                    <span className="bg-main-colorsaqua text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {chat.unread}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chat content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">Команда проекта А</h2>
          <p className="text-sm text-gray-500">3 участника</p>
        </div>

        <div className="flex-1 p-4 overflow-y-auto">
          <div className="text-center text-gray-500 text-sm">
            Выберите чат для начала общения
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              placeholder="Введите сообщение..."
              className="flex-1"
            />
            <Button>Отправить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
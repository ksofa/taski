import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Search } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useChatMessages } from "../../../../hooks/useChatMessages";
import { sendMessage } from "../../../../api/chats";
import { CreateChatModal } from "./CreateChatModal";

export const ChatsView = () => {
  const userId = "test-user-id"; // TODO: получить из авторизации
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Получаем чаты из Firestore
  const [chatsSnap] = useCollection(collection(db, "chats"));
  const chats = chatsSnap?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  // Получаем сообщения выбранного чата
  const { messages, loading: loadingMessages } = useChatMessages(selectedChat || "");

  const handleSend = async () => {
    if (selectedChat && text.trim()) {
      await sendMessage({ chatId: selectedChat, senderId: userId, text });
      setText("");
    }
  };

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
        <Button className="w-full mb-4" onClick={() => setShowCreateModal(true)}>
          Создать чат
        </Button>
        <div className="space-y-2">
          {chats.map((chat: any) => (
            <Card
              key={chat.id}
              className={`cursor-pointer hover:bg-gray-50 ${selectedChat === chat.id ? "bg-gray-100" : ""}`}
              onClick={() => setSelectedChat(chat.id)}
            >
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://i.pravatar.cc/40?img=${chat.id}`} />
                    <AvatarFallback>{chat.id[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <p className="font-medium truncate">{chat.projectId || chat.id}</p>
                      {/* Можно добавить время последнего сообщения */}
                    </div>
                    {/* Можно добавить последнее сообщение */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {showCreateModal && (
          <CreateChatModal onClose={() => setShowCreateModal(false)} />
        )}
      </div>
      {/* Chat content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="font-semibold">
            {selectedChat ? `Чат ${selectedChat}` : "Выберите чат"}
          </h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedChat ? (
            loadingMessages ? (
              <div>Загрузка сообщений...</div>
            ) : (
              <div className="flex flex-col gap-2">
                {messages.map((msg: any) => (
                  <div key={msg.id} className="flex gap-2 items-center">
                    <span className="font-bold text-main-colorsaqua">{msg.senderId}:</span>
                    <span>{msg.text}</span>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="text-center text-gray-500 text-sm">
              Выберите чат для начала общения
            </div>
          )}
        </div>
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <Input
              placeholder="Введите сообщение..."
              className="flex-1"
              value={text}
              onChange={e => setText(e.target.value)}
              disabled={!selectedChat}
              onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
            />
            <Button onClick={handleSend} disabled={!selectedChat || !text.trim()}>
              Отправить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
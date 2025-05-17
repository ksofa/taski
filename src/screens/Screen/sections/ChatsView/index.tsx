import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { Search } from "lucide-react";
import { CreateChatModal } from "./CreateChatModal";
import { useAuth } from "../../../../hooks/useAuth";

export const ChatsView = () => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [mobileView, setMobileView] = useState<'projects' | 'chats' | 'chatContent'>('projects');
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // MOCK DATA
  const projects = [
    { id: '1', title: 'Разработка личного кабинета МТС', avatarUrl: '/mts.png', updatedAt: { seconds: 1711041300 } },
    { id: '2', title: 'Сервис автоматической аналитики', avatarUrl: '/auto.png', updatedAt: { seconds: 1711038000 } },
    { id: '3', title: 'Сервис логистического учета', avatarUrl: '/logistic.png', updatedAt: { seconds: 1711040400 } },
    { id: '4', title: 'Умный поиск. Нейросеть', avatarUrl: '/vk.png', updatedAt: { seconds: 1711035780 } },
  ];
  const chats = [
    { id: 'c1', title: 'Общий чат', lastMsg: 'Pylsing: Мне непонятно вообще...', time: '30 мин', unread: 9 },
    { id: 'c2', title: 'Юлия А.', lastMsg: 'Pylsing: Думаю нормально, да...', time: '7 мин', unread: 1 },
    { id: 'c3', title: 'Владислав К.', lastMsg: 'Pylsing: Смотри, заказчик хочет...', time: 'Сейчас', unread: 2 },
    { id: 'c4', title: 'Анастасия С.', lastMsg: 'Pylsing: Аналитика не понятная, ну...', time: 'час назад', unread: 0 },
    { id: 'c5', title: 'Юлия Д.', lastMsg: 'Мне нужно подготовить...', time: '47 мин', unread: 0 },
    { id: 'c6', title: 'Александр Р.', lastMsg: 'Pylsing: Короче я поговорю с...', time: '56 мин', unread: 0 },
    { id: 'c7', title: 'Денис В.', lastMsg: 'Pylsing: Нужны правки, давай...', time: '59 мин', unread: 1 },
  ];
  const messages = [
    { id: 1, user: 'me', text: 'С пониманием бяда', time: '16:07', status: 'read' },
    { id: 2, user: 'me', text: 'Надо разбираться', time: '16:44', status: 'read' },
    { id: 3, user: 'me', text: 'Отпишу когда пойму, что делать дальше', time: '16:44', status: 'sent' },
    { id: 4, user: 'Юлия К.', text: 'Ответить', time: '16:44', status: '', reply: true },
    { id: 5, user: 'Юлия К.', text: 'Я тоже уже ничего не пойму', time: '16:44', status: '' },
    { id: 6, user: 'Юлия К.', text: 'Полная аналитика по странице.docx\n2.7 MB\nВот файл, тут все подготовила. Заказчик правда говорит все не то', time: '16:44', status: '', file: true },
    { id: 7, user: 'Константин К.', text: 'Короче я поговорю с ним. Но я сам нихера не понимаю', time: '16:44', status: '', highlight: true },
    { id: 8, user: 'Юлия К.', text: 'Вот файл, тут все подготовила. Заказчик правда говорит все не то', time: '16:44', status: '' },
    { id: 9, user: 'Юлия К.', text: 'ПСИХОЛОГ: ВЫ ДОЛЖНЫ ХВАЛИТЬ СЕБЯ КАЖДЫЙ ДЕНЬ\nЯ:', time: '16:44', status: '', image: true },
  ];

  const handleSend = async () => {
    setText("");
  };

  const showProjects = !isMobile || mobileView === 'projects';
  const showChats = !isMobile || mobileView === 'chats';
  const showChatContent = !isMobile || mobileView === 'chatContent';

  if (authLoading) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xl">Загрузка...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-24px)] bg-[#F6F7F9] rounded-2xl shadow p-2 gap-2 overflow-hidden flex-col md:flex-row">
      {/* Projects list */}
      {showProjects && (
        <aside className="w-full md:w-[260px] bg-white rounded-xl p-4 flex flex-col gap-4 border border-[#ECECEC] md:block">
          <h2 className="text-lg font-semibold text-[#222] mb-2">Проекты</h2>
          <div className="flex flex-col gap-2 flex-1">
            {projects.map(p => (
              <div key={p.id} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-[#F3F7FE] cursor-pointer transition ${selectedProject === p.id ? 'bg-[#F3F7FE]' : ''}`} onClick={() => {
                setSelectedProject(p.id);
                setSelectedChat(null);
                if (isMobile) setMobileView('chats');
              }}>
                <img src={p.avatarUrl} alt={p.title} className="w-12 h-12 rounded-full object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[#222] text-sm truncate">{p.title}</div>
                  <div className="text-xs text-[#A5A5A7] mt-1">{new Date(p.updatedAt.seconds * 1000).toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-auto border border-[#ECECEC] rounded-xl py-2 text-[#A5A5A7] hover:bg-[#F3F7FE] transition">Архив</button>
        </aside>
      )}
      {/* Chats list */}
      {showChats && selectedProject && (
        <aside className="w-full md:w-[320px] bg-white rounded-xl p-4 flex flex-col gap-4 border border-[#ECECEC] md:block">
          <div className="flex items-center justify-between mb-2">
            {isMobile && <button onClick={() => setMobileView('projects')} className="mr-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F7FE] transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
            <h2 className="text-lg font-semibold text-[#222]">Чаты</h2>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F7FE] transition" onClick={() => setShowCreateModal(true)}>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="9" stroke="#A5A5A7" strokeWidth="2"/><path d="M8 10h4" stroke="#A5A5A7" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
          </div>
          <div className="flex flex-col gap-1 flex-1 overflow-y-auto">
            {chats.map(chat => (
              <div key={chat.id} className={`flex items-center gap-3 p-2 rounded-lg hover:bg-[#F3F7FE] cursor-pointer transition ${selectedChat === chat.id ? 'bg-[#F3F7FE]' : ''}`} onClick={() => {
                setSelectedChat(chat.id);
                if (isMobile) setMobileView('chatContent');
              }}>
                <div className="w-10 h-10 rounded-full bg-[#F3F7FE] flex items-center justify-center text-[#A5A5A7] font-bold text-lg">{chat.title[0]}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-[#222] text-sm truncate">{chat.title}</span>
                    <span className="text-xs text-[#A5A5A7] ml-2 whitespace-nowrap">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center mt-0.5">
                    <span className="text-xs text-[#A5A5A7] truncate">{chat.lastMsg}</span>
                    {chat.unread > 0 && <span className="ml-2 bg-[#2982FD] text-white text-xs rounded-full px-2 py-0.5 font-bold">{chat.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {showCreateModal && <CreateChatModal onClose={() => setShowCreateModal(false)} />}
        </aside>
      )}
      {/* Chat content */}
      {showChatContent && selectedChat && (
        <main className="flex-1 flex flex-col bg-[#F6F7F9] rounded-xl p-4 border border-[#ECECEC] min-w-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#F3F7FE] flex items-center justify-center text-[#A5A5A7] font-bold text-lg">C</div>
              <div>
                <div className="font-semibold text-[#222] text-base">{chats.find(c => c.id === selectedChat)?.title || selectedChat}</div>
                <div className="text-xs text-[#A5A5A7]">{chats.find(c => c.id === selectedChat)?.lastMsg}</div>
              </div>
            </div>
            {isMobile && <button onClick={() => setMobileView('chats')} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#F3F7FE] transition"><svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg></button>}
          </div>
          <div className="flex-1 flex flex-col gap-2 overflow-y-auto pb-4">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.user === 'me' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] rounded-xl px-4 py-2 text-sm shadow ${msg.user === 'me' ? 'bg-[#E6F4EA] text-[#222]' : 'bg-white text-[#222]'} ${msg.reply ? 'border-l-4 border-[#2982FD]' : ''} ${msg.highlight ? 'bg-[#F3F7FE]' : ''}`}>
                  {msg.file && <div className="mb-1 flex items-center gap-2"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="3" y="3" width="14" height="14" rx="2" fill="#F3F7FE" stroke="#A5A5A7" strokeWidth="1.5"/><path d="M7 8h6M7 12h4" stroke="#A5A5A7" strokeWidth="1.5" strokeLinecap="round"/></svg><span className="text-xs text-[#2982FD] font-medium">Полная аналитика по странице.docx</span><span className="text-xs text-[#A5A5A7]">2.7 MB</span></div>}
                  {msg.highlight && <div className="mb-1 text-[#2982FD] font-medium">{msg.text}</div>}
                  {!msg.file && !msg.highlight && <div>{msg.text}</div>}
                  <div className="flex justify-end items-center gap-2 mt-1">
                    {msg.status === 'read' && <svg width="16" height="16" fill="none" viewBox="0 0 16 16"><path d="M4 8l3 3 5-5" stroke="#2982FD" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                    <span className="text-xs text-[#A5A5A7]">{msg.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-2 border-t border-[#ECECEC] pt-2 sticky bottom-0 bg-[#F6F7F9] z-10">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#F3F7FE] transition">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#A5A5A7" strokeWidth="2"/><path d="M8 12h8" stroke="#A5A5A7" strokeWidth="2" strokeLinecap="round"/></svg>
            </button>
            <input className="flex-1 h-10 rounded-full border border-[#ECECEC] px-4 text-sm bg-white outline-none" placeholder="Написать сообщение..." value={text} onChange={e => setText(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSend(); }} />
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2982FD] hover:bg-[#3771C8] transition" onClick={handleSend} disabled={!text.trim()}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M3 12l18-7-7 18-2.5-7L3 12z" fill="#fff"/></svg>
            </button>
          </div>
        </main>
      )}
    </div>
  );
};
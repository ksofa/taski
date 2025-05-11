import React, { useState } from "react";
import { registerUser } from "../../api/auth";

interface RegisterScreenProps {
  onBack: () => void;
  onLogin: () => void;
}

const categories = [
  "Разработчик",
  "Дизайнер",
  "Аналитик",
  "Менеджер",
  "Тестировщик",
];

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ onBack, onLogin }) => {
  const [role, setRole] = useState<"executor" | "customer">("executor");
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLoading(true);
    setError(null);
    try {
      await registerUser({
        email,
        password,
        name: role === "executor" ? name : company || name,
        role,
        categories: role === "executor" && category ? [category] : [],
      });
      onLogin(); // После регистрации переходим на логин
    } catch (e: any) {
      setError(e.message || "Ошибка регистрации");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3F5F8]">
      <div className="w-full max-w-xl bg-white rounded-2xl p-10 shadow flex flex-col gap-6" style={{ minWidth: 420 }}>
        <button onClick={onBack} className="mb-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition self-start">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
        <h2 className="text-2xl font-semibold mb-2">Регистрация</h2>
        <div className="bg-[#F8F9FB] rounded-xl p-8 flex flex-col gap-4 border border-[#ECECEC]">
          <div className="flex gap-2 mb-2">
            <button
              className={`px-4 py-1 rounded-full border text-sm font-medium transition ${role === "executor" ? "bg-[#F3F7FE] border-[#5B7FC7] text-[#3771C8]" : "bg-white border-[#ECECEC] text-[#222]"}`}
              onClick={() => setRole("executor")}
            >
              Исполнитель
            </button>
            <button
              className={`px-4 py-1 rounded-full border text-sm font-medium transition ${role === "customer" ? "bg-[#F3F7FE] border-[#5B7FC7] text-[#3771C8]" : "bg-white border-[#ECECEC] text-[#222]"}`}
              onClick={() => setRole("customer")}
            >
              Заказчик
            </button>
          </div>
          <input type="text" placeholder="ФИО" className="border rounded-lg px-4 py-3 bg-white text-base outline-none" value={name} onChange={e => setName(e.target.value)} />
          {role === "executor" ? (
            <div className="relative">
              <select
                className="border rounded-lg px-4 py-3 bg-white text-base outline-none w-full appearance-none"
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="">Выберите категории / профессию</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="#A5A5A7" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </span>
            </div>
          ) : (
            <input type="text" placeholder="Название компании" className="border rounded-lg px-4 py-3 bg-white text-base outline-none" value={company} onChange={e => setCompany(e.target.value)} />
          )}
          <input type="email" placeholder="Почта" className="border rounded-lg px-4 py-3 bg-white text-base outline-none" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Пароль" className="border rounded-lg px-4 py-3 bg-white text-base outline-none" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <div className="text-center text-sm text-[#222]">Уже есть аккаунт? <button onClick={onLogin} className="text-[#3771C8] hover:underline">Авторизация</button></div>
        </div>
        <button
          className="w-full mt-4 bg-[#5B7FC7] hover:bg-[#4070C4] text-white rounded-full py-3 text-lg font-semibold transition disabled:opacity-60"
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Регистрация..." : "Зарегистрироваться"}
        </button>
      </div>
    </div>
  );
}; 
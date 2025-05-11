import React, { useState } from "react";
import { createChat } from "../../../../api/chats";

interface CreateChatModalProps {
  onClose: () => void;
}

export const CreateChatModal: React.FC<CreateChatModalProps> = ({ onClose }) => {
  const [members, setMembers] = useState("");
  const [projectId, setProjectId] = useState("");
  const [type, setType] = useState<"private" | "group">("private");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      await createChat({
        members: members.split(",").map(m => m.trim()).filter(Boolean),
        projectId: projectId || undefined,
        type,
      });
      onClose();
    } catch (e: any) {
      setError(e.message || "Ошибка создания чата");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
      <div className="bg-white rounded-xl p-8 shadow-lg min-w-[320px] flex flex-col gap-4">
        <h2 className="text-xl font-semibold mb-2">Создать чат</h2>
        <input
          type="text"
          placeholder="ID участников (через запятую)"
          className="border rounded-lg px-4 py-2"
          value={members}
          onChange={e => setMembers(e.target.value)}
        />
        <input
          type="text"
          placeholder="ID проекта (опционально)"
          className="border rounded-lg px-4 py-2"
          value={projectId}
          onChange={e => setProjectId(e.target.value)}
        />
        <select
          className="border rounded-lg px-4 py-2"
          value={type}
          onChange={e => setType(e.target.value as any)}
        >
          <option value="private">Приватный</option>
          <option value="group">Групповой</option>
        </select>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <div className="flex gap-2 mt-4">
          <button
            className="flex-1 bg-gray-200 rounded py-2 font-medium"
            onClick={onClose}
            disabled={loading}
          >
            Отмена
          </button>
          <button
            className="flex-1 bg-[#5B7FC7] text-white rounded py-2 font-medium disabled:opacity-60"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Создание..." : "Создать"}
          </button>
        </div>
      </div>
    </div>
  );
}; 
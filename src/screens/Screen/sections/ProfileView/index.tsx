import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const ProfileView = () => {
  const { user, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [edit, setEdit] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!user?.uid) return;
    setLoading(true);
    // Подписка на изменения профиля в real-time
    const unsub = onSnapshot(doc(db, "users", user.uid), (snap) => {
      setProfile(snap.data());
      setForm(snap.data() || {});
      setLoading(false);
    }, (e) => {
      setError(e.message || "Ошибка загрузки профиля");
      setLoading(false);
    });
    return () => unsub();
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), form);
      setProfile({ ...profile, ...form });
      setEdit(false);
    } catch (e: any) {
      setError(e.message || "Ошибка сохранения профиля");
    }
    setSaving(false);
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.uid || !e.target.files || !e.target.files[0]) return;
    setSaving(true);
    try {
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      await updateDoc(doc(db, "users", user.uid), { avatar: url });
      setProfile((p: any) => ({ ...p, avatar: url }));
      setForm((f: any) => ({ ...f, avatar: url }));
    } catch (e: any) {
      setError(e.message || "Ошибка загрузки аватара");
    }
    setSaving(false);
  };

  if (authLoading || loading) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xl">Загрузка профиля...</div>;
  }
  if (error) {
    return <div className="flex items-center justify-center h-full text-red-500 text-xl">{error}</div>;
  }
  if (!profile) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xl">Профиль не найден</div>;
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#F8F8FA] p-12">
      <div className="bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        <div className="relative group">
          <img
            src={form.avatar || "/image.png"}
            alt="Аватар"
            className="w-32 h-32 rounded-full object-cover border-4 border-[#E6F4EA] cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleAvatarChange}
          />
          <div className="absolute top-0 right-0 bg-main-colorsgreen rounded-full px-3 py-1 text-white font-bold text-lg shadow-lg">
            {form.rating ?? 0}
          </div>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black bg-opacity-40 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">Изменить аватар</div>
        </div>
        {edit ? (
          <>
            <div className="flex flex-col items-center gap-2 w-full">
              <input
                name="name"
                value={form.name || ""}
                onChange={handleChange}
                className="text-2xl font-bold text-[#222] text-center border-b border-[#ECECEC] focus:outline-none mb-2 bg-transparent"
                placeholder="Имя"
                disabled={saving}
              />
              <div className="flex gap-2 mb-2">
                <input
                  name="status"
                  value={form.status || ""}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-full border border-[#dd8126] text-main-colorsorange text-sm font-medium bg-transparent focus:outline-none"
                  placeholder="Статус"
                  disabled={saving}
                />
                <input
                  name="available"
                  value={form.available || ""}
                  onChange={handleChange}
                  className="px-3 py-1 rounded-full border border-[#a5a5a7] text-[#A5A5A7] text-sm font-medium bg-transparent focus:outline-none"
                  placeholder="Доступность"
                  disabled={saving}
                />
              </div>
            </div>
            <div className="flex gap-8 mt-4">
              <input
                name="activeProjects"
                type="number"
                value={form.activeProjects ?? 0}
                onChange={handleChange}
                className="text-main-colorsaqua text-3xl font-bold text-center border-b border-[#ECECEC] focus:outline-none bg-transparent"
                placeholder="Активные проекты"
                disabled={saving}
              />
              <input
                name="teamCount"
                type="number"
                value={form.teamCount ?? 0}
                onChange={handleChange}
                className="text-main-colorsaqua text-3xl font-bold text-center border-b border-[#ECECEC] focus:outline-none bg-transparent"
                placeholder="Участник команд"
                disabled={saving}
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button
                className="px-6 py-3 border border-[#ECECEC] rounded-[12px] font-medium"
                onClick={() => setEdit(false)}
                disabled={saving}
              >
                Отмена
              </button>
              <button
                className="px-6 py-3 bg-main-colorsaqua text-white rounded-[12px] font-medium disabled:opacity-60"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col items-center gap-2">
              <div className="flex gap-2 mb-2">
                <span className="px-3 py-1 rounded-full border border-[#dd8126] text-main-colorsorange text-sm font-medium bg-transparent">
                  {profile.status || "Не указан"}
                </span>
                {profile.available && (
                  <span className="px-3 py-1 rounded-full border border-[#a5a5a7] text-[#A5A5A7] text-sm font-medium bg-transparent">
                    {profile.available}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-[#222]">{profile.name || profile.email}</h2>
            </div>
            <div className="flex gap-8 mt-4">
              <div className="flex flex-col items-center">
                <span className="text-main-colorsaqua text-3xl font-bold">{profile.activeProjects ?? 0}</span>
                <span className="text-[#222] text-base font-medium">Активные проекты</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-main-colorsaqua text-3xl font-bold">{profile.teamCount ?? 0}</span>
                <span className="text-[#222] text-base font-medium">Участник команд</span>
              </div>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                className="px-6 py-3 border border-[#ECECEC] rounded-[12px] font-medium"
                onClick={() => setEdit(true)}
              >
                Редактировать
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}; 
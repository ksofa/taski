import React, { useEffect, useState } from "react";
import { getProjects } from "../../api/projects";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const ProjectsListScreen: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    getProjects().then((data) => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F3F5F8] flex flex-col">
      {/* Хедер */}
      <header className="bg-white border-b border-[#E6EAF2] px-4 sm:px-6 md:px-8 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <img src="/logo.svg" alt="TASKA" className="h-6 sm:h-7" />
          <span className="text-[#A5A5A7] text-xs sm:text-sm ml-2 sm:ml-4">Сегодня 21 февраля</span>
          <span className="text-[#222] text-xs sm:text-sm font-medium ml-1 sm:ml-2">14:03 МСК</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {/* ... фильтры, иконки, счет */}
        </div>
      </header>
      {/* Контент */}
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Боковое меню */}
        <aside className="w-full md:w-56 bg-[#F3F5F8] border-b md:border-b-0 md:border-r border-[#E6EAF2] flex flex-row md:flex-col items-center md:items-start py-3 md:py-6 px-4 md:px-0 overflow-x-auto md:overflow-x-visible">
          {/* ... пункты меню */}
        </aside>
        {/* Список проектов */}
        <section className="flex-1 p-4 sm:p-6 md:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Проекты</h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
            <input className="rounded-lg border px-3 sm:px-4 py-2 w-full sm:w-72" placeholder="Искать проект" />
            {/* ... фильтры */}
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2982FD]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="cursor-pointer bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-[#ECECEC] flex flex-col gap-2 hover:shadow-md transition"
                  onClick={() => navigate(`/projects/${project.id}`)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {/* Лого */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#F3F7FE] rounded-lg flex items-center justify-center">
                      {/* Здесь будет иконка/лого */}
                    </div>
                    <span className="text-sm sm:text-base font-medium">{project.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.status.map((s: string) => (
                      <span key={s} className="border rounded px-2 py-0.5 text-xs text-green-600 border-green-300 bg-green-50">{s}</span>
                    ))}
                  </div>
                  <div className="text-xs text-[#A5A5A7]">РП: {project.manager}</div>
                  <div className="text-xs text-[#A5A5A7]">Клиент: {project.client}</div>
                  {/* Кнопка "Команда" только для РП */}
                  {user && (user.role === 'rp' || user.id === project.manager) && (
                    <button
                      className="mt-2 px-4 py-2 bg-[#2982FD] text-white rounded-lg text-sm font-medium hover:bg-[#3771C8]"
                      onClick={e => {
                        e.stopPropagation();
                        navigate(`/projects/${project.id}/team`);
                      }}
                    >
                      Команда
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}; 
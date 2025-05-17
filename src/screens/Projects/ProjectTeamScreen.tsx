import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectTeam, addTeamMember, removeTeamMember, updateTeamRoles } from "../../api/projects";
import { createSpecialistProposal, createCalculationRequest } from "../../api/projects";
import { ProjectTeam, TeamMember } from "../../types/project";
import { useAuth } from "../../hooks/useAuth";
import { SpecialistProposalForm } from "../../components/Proposals/SpecialistProposalForm";
import { CalculationRequestForm } from "../../components/Proposals/CalculationRequestForm";

export const ProjectTeamScreen = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [team, setTeam] = useState<ProjectTeam | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState<Partial<TeamMember>>({});
  const [selectedSpecialist, setSelectedSpecialist] = useState<TeamMember | null>(null);
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [showCalculationForm, setShowCalculationForm] = useState(false);

  useEffect(() => {
    if (id) {
      getProjectTeam(id).then(setTeam);
    }
  }, [id]);

  const handleAddMember = async () => {
    if (!id || !newMember.name || !newMember.role) return;
    const member: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role,
      rating: newMember.rating || 0,
      status: 'available',
      ...newMember
    };
    await addTeamMember(id, member);
    setNewMember({});
    setIsAddingMember(false);
    getProjectTeam(id).then(setTeam);
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!id) return;
    await removeTeamMember(id, memberId);
    getProjectTeam(id).then(setTeam);
  };

  const handleSendProposal = async (data: { rate: number; coverLetter: string }) => {
    if (!id || !selectedSpecialist) return;
    await createSpecialistProposal(id, selectedSpecialist.id, data);
    setShowProposalForm(false);
    setSelectedSpecialist(null);
  };

  const handleSendCalculationRequest = async (data: { estimatedHours: number; rate: number }) => {
    if (!id || !selectedSpecialist) return;
    await createCalculationRequest(id, selectedSpecialist.id, data);
    setShowCalculationForm(false);
    setSelectedSpecialist(null);
  };

  if (!team || !user) return null;
  if (team.manager !== user.id && user.role !== "rp") {
    return <div className="p-8 text-xl text-gray-400">Нет доступа</div>;
  }

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center px-0 md:px-0 pt-0 md:pt-0">
      <div className="w-full max-w-full md:max-w-[1200px] flex-1 flex flex-col items-center px-2 sm:px-4 md:px-8">
        <div className="w-full bg-white rounded-[24px] p-4 sm:p-8 flex flex-col gap-8 border border-[#ECECEC] shadow-sm mt-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h1 className="text-[28px] font-bold text-[#222] tracking-tight">Команда проекта</h1>
            <button
              onClick={() => setIsAddingMember(true)}
              className="px-6 py-3 bg-[#2982FD] text-white rounded-[12px] font-semibold text-base hover:bg-[#3771C8] transition shadow-sm"
            >
              <span className="flex items-center gap-2"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="8" fill="#fff"/><path d="M10 6v8M6 10h8" stroke="#2982FD" strokeWidth="2" strokeLinecap="round"/></svg>Добавить в команду</span>
            </button>
          </div>

          {/* Роли и статистика */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-4">
            <div className="bg-[#F8F8FA] rounded-[16px] p-6 flex flex-col gap-2 border border-[#ECECEC]">
              <h3 className="text-[16px] font-semibold text-[#222] mb-2">Роли</h3>
              {team.roles.map((role, idx) => (
                <div key={idx} className="flex justify-between items-center mb-1">
                  <span className="text-[15px] text-[#666769]">{role.role}</span>
                  <span className="text-[15px] font-semibold text-[#222]">{role.count}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#F8F8FA] rounded-[16px] p-6 flex flex-col gap-2 border border-[#ECECEC]">
              <h3 className="text-[16px] font-semibold text-[#222] mb-2">Дата старта</h3>
              <p className="text-[15px] text-[#666769]">{team.startDate}</p>
            </div>
            <div className="bg-[#F8F8FA] rounded-[16px] p-6 flex flex-col gap-2 border border-[#ECECEC]">
              <h3 className="text-[16px] font-semibold text-[#222] mb-2">Срок реализации</h3>
              <p className="text-[15px] text-[#666769]">{team.estimatedDuration}</p>
            </div>
          </div>

          {/* Список участников */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {team.members.map((member) => (
              <div key={member.id} className="bg-[#F8F8FA] rounded-[16px] p-5 flex flex-col gap-3 border border-[#ECECEC] shadow-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-14 h-14 rounded-full bg-[#E6EAF2] flex items-center justify-center text-[#2982FD] text-xl font-bold overflow-hidden">
                    {member.avatar ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover rounded-full" /> : member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[#222] text-lg truncate">{member.name}</div>
                    <div className="text-[15px] text-[#666769] truncate">{member.role}</div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${member.status === 'available' ? 'bg-[#E6F4EA] text-[#0FB14D]' : 'bg-[#FCE8E6] text-[#ED533F]'}`}>{member.status === 'available' ? 'Свободен(а)' : 'Занят(а)'}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[15px] font-medium text-[#222]">Рейтинг:</span>
                  <span className="text-[15px] text-[#666769]">{member.rating}</span>
                </div>
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => {
                      setSelectedSpecialist(member);
                      setShowProposalForm(true);
                    }}
                    className="flex-1 px-4 py-2 bg-[#2982FD] text-white rounded-[10px] font-semibold text-base hover:bg-[#3771C8] transition"
                  >
                    Предложение
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSpecialist(member);
                      setShowCalculationForm(true);
                    }}
                    className="flex-1 px-4 py-2 border border-[#ECECEC] rounded-[10px] font-semibold text-base hover:bg-[#F3F7FE] transition"
                  >
                    Расчет
                  </button>
                  <button
                    onClick={() => handleRemoveMember(member.id)}
                    className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ED533F] text-[#ED533F] hover:bg-[#FCE8E6] transition"
                    title="Удалить"
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="8" fill="#ED533F"/><path d="M7 10h6" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Модальное окно добавления участника */}
          {isAddingMember && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-[20px] p-6 w-full max-w-[420px] shadow-xl border border-[#ECECEC] flex flex-col gap-4">
                <h2 className="text-[22px] font-bold text-[#222] mb-2">Добавить в команду</h2>
                <input
                  type="text"
                  placeholder="Имя"
                  className="w-full border border-[#ECECEC] rounded-[10px] px-4 py-3 text-[15px]"
                  value={newMember.name || ''}
                  onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Роль"
                  className="w-full border border-[#ECECEC] rounded-[10px] px-4 py-3 text-[15px]"
                  value={newMember.role || ''}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Рейтинг"
                  className="w-full border border-[#ECECEC] rounded-[10px] px-4 py-3 text-[15px]"
                  value={newMember.rating || ''}
                  onChange={(e) => setNewMember({ ...newMember, rating: Number(e.target.value) })}
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setIsAddingMember(false)}
                    className="px-5 py-2 border border-[#ECECEC] rounded-[10px] font-semibold text-base hover:bg-[#F3F7FE] transition"
                  >
                    Отмена
                  </button>
                  <button
                    onClick={handleAddMember}
                    className="px-5 py-2 bg-[#2982FD] text-white rounded-[10px] font-semibold text-base hover:bg-[#3771C8] transition"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Форма предложения специалисту */}
          {showProposalForm && selectedSpecialist && (
            <SpecialistProposalForm
              specialist={selectedSpecialist}
              onSubmit={handleSendProposal}
              onCancel={() => {
                setShowProposalForm(false);
                setSelectedSpecialist(null);
              }}
            />
          )}

          {/* Форма заявки на расчет */}
          {showCalculationForm && selectedSpecialist && (
            <CalculationRequestForm
              onSubmit={handleSendCalculationRequest}
              onCancel={() => {
                setShowCalculationForm(false);
                setSelectedSpecialist(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}; 
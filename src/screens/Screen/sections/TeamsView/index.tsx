import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../../components/ui/avatar";

export const TeamsView = () => {
  const teams = [
    {
      id: 1,
      name: "Команда разработки",
      members: [
        { name: "Анна К.", role: "Project Manager" },
        { name: "Иван С.", role: "Frontend Developer" },
        { name: "Мария Д.", role: "Designer" },
      ],
      project: "Мобильное приложение",
    },
    {
      id: 2,
      name: "Дизайн команда",
      members: [
        { name: "Петр В.", role: "Lead Designer" },
        { name: "Елена М.", role: "UI/UX Designer" },
      ],
      project: "Редизайн веб-сайта",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Команды</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {teams.map((team) => (
          <Card key={team.id} className="bg-white">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-[16px] sm:text-[18px] font-medium text-[#333539] mb-1">{team.name}</h3>
                  <p className="text-[13px] sm:text-[14px] text-[#666769]">{team.project}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-[#F8F9FB] rounded-lg px-2 sm:px-3 py-1.5 sm:py-2">
                      <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                        <AvatarImage src={`https://avatar.vercel.sh/${member.name}`} />
                        <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-[12px] sm:text-[13px] font-medium text-[#333539]">{member.name}</span>
                        <span className="text-[11px] sm:text-[12px] text-[#666769]">{member.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
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
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Команды</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {teams.map((team) => (
          <Card key={team.id}>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">{team.name}</h3>
              <p className="text-gray-600 mb-4">Проект: {team.project}</p>
              
              <div className="space-y-4">
                <h4 className="font-medium text-sm text-gray-500">Участники команды:</h4>
                {team.members.map((member, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={`https://i.pravatar.cc/40?img=${index}`} />
                      <AvatarFallback>{member.name.split(' ')[0][0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { ProjectBoardScreen } from '../../../../screens/Projects/ProjectBoardScreen';

export const ProjectsView = () => {
  const [selectedProjectId, setSelectedProjectId] = React.useState<string | null>(null);

  // TODO: заменить на реальные проекты из API
  const projects = [
    { id: '1', title: 'Проект 1', description: 'Описание проекта', deadline: '20.03.2024', status: 'В процессе' },
    { id: '2', title: 'Проект 2', description: 'Описание проекта', deadline: '21.03.2024', status: 'В процессе' },
    { id: '3', title: 'Проект 3', description: 'Описание проекта', deadline: '22.03.2024', status: 'В процессе' },
    { id: '4', title: 'Проект 4', description: 'Описание проекта', deadline: '23.03.2024', status: 'В процессе' },
    { id: '5', title: 'Проект 5', description: 'Описание проекта', deadline: '24.03.2024', status: 'В процессе' },
    { id: '6', title: 'Проект 6', description: 'Описание проекта', deadline: '25.03.2024', status: 'В процессе' },
  ];

  if (selectedProjectId) {
    return (
      <div className="relative">
        <button
          className="absolute top-4 left-4 z-10 px-4 py-2 bg-main-colorsaqua text-white rounded-lg text-sm font-medium hover:bg-[#3771C8]"
          onClick={() => setSelectedProjectId(null)}
        >
          ← Назад к проектам
        </button>
        <div className="pt-12">
          <ProjectBoardScreen projectId={selectedProjectId} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">Проекты</h1>
      
      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Активные</TabsTrigger>
          <TabsTrigger value="completed">Завершенные</TabsTrigger>
          <TabsTrigger value="archived">В архиве</TabsTrigger>
        </TabsList>
        
        <TabsContent value="active">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((project) => (
              <Card key={project.id}>
                <CardContent
                  className="p-6 cursor-pointer hover:bg-main-colorsbackground"
                  onClick={() => setSelectedProjectId(project.id)}
                >
                  <h3 className="font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Дедлайн: {project.deadline}</span>
                    <span className="text-sm font-medium text-main-colorsaqua">{project.status}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="text-center py-8 text-gray-500">
            Завершенные проекты
          </div>
        </TabsContent>
        
        <TabsContent value="archived">
          <div className="text-center py-8 text-gray-500">
            Архивированные проекты
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
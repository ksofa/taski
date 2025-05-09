import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";

export const ProjectsView = () => {
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
            {[1, 2, 3, 4, 5, 6].map((project) => (
              <Card key={project}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Проект {project}</h3>
                  <p className="text-gray-600 mb-4">Описание проекта</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Дедлайн: 20.03.2024</span>
                    <span className="text-sm font-medium text-main-colorsaqua">В процессе</span>
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
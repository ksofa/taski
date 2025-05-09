import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";

export const ApplicationsView = () => {
  const applications = [
    {
      id: 1,
      title: "Разработка мобильного приложения",
      status: "new",
      budget: "500,000₽",
      deadline: "20.03.2024",
      description: "Требуется разработка мобильного приложения для iOS и Android",
    },
    {
      id: 2,
      title: "Дизайн корпоративного сайта",
      status: "in_progress",
      budget: "300,000₽",
      deadline: "15.04.2024",
      description: "Редизайн существующего корпоративного сайта",
    },
    {
      id: 3,
      title: "SEO-оптимизация",
      status: "completed",
      budget: "150,000₽",
      deadline: "01.03.2024",
      description: "Оптимизация сайта для поисковых систем",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "text-main-colorsaqua";
      case "in_progress":
        return "text-main-colorsorange";
      case "completed":
        return "text-main-colorsgreen";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "new":
        return "Новая";
      case "in_progress":
        return "В работе";
      case "completed":
        return "Завершена";
      default:
        return status;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Заявки</h1>
        
        <div className="flex gap-4">
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="in_progress">В работе</SelectItem>
              <SelectItem value="completed">Завершенные</SelectItem>
            </SelectContent>
          </Select>
          
          <Button>Создать заявку</Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{app.title}</h3>
                  <p className="text-gray-600">{app.description}</p>
                </div>
                <span className={`${getStatusColor(app.status)} font-medium`}>
                  {getStatusText(app.status)}
                </span>
              </div>
              
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">Бюджет: </span>
                  <span className="font-medium">{app.budget}</span>
                </div>
                <div>
                  <span className="text-gray-500">Дедлайн: </span>
                  <span className="font-medium">{app.deadline}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
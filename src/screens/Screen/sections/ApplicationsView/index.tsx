import React, { useState } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { CreateApplicationModal } from "./CreateApplicationModal";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../../hooks/useAuth";

export const ApplicationsView = () => {
  const { user, loading: authLoading } = useAuth();
  const userId = user?.uid;
  const [showModal, setShowModal] = useState(false);
  // TODO: получить projectId из контекста/props/выбора
  const projectId = "test-project-id";

  // Получаем заявки из Firestore
  const q = userId ? query(collection(db, "applications"), where("userId", "==", userId)) : query(collection(db, "applications"));
  const [snapshot, loading, error] = useCollection(q);
  const applications = snapshot?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  if (authLoading) {
    return <div className="flex items-center justify-center h-full text-gray-400 text-xl">Загрузка...</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
      case "created":
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
      case "created":
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
          <Button onClick={() => setShowModal(true)}>Создать заявку</Button>
        </div>
      </div>
      <div className="space-y-4">
        {loading && <div>Загрузка...</div>}
        {error && <div className="text-red-500">Ошибка: {error.message}</div>}
        {applications.map((app: any) => (
          <Card key={app.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{app.projectId || "Заявка"}</h3>
                  <p className="text-gray-600">Пользователь: {app.userId}</p>
                </div>
                <span className={`${getStatusColor(app.status)} font-medium`}>
                  {getStatusText(app.status)}
                </span>
              </div>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-gray-500">ID проекта: </span>
                  <span className="font-medium">{app.projectId}</span>
                </div>
                <div>
                  <span className="text-gray-500">ID пользователя: </span>
                  <span className="font-medium">{app.userId}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {showModal && userId && (
        <CreateApplicationModal
          projectId={projectId}
          userId={userId}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};
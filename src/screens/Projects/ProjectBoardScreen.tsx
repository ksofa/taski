import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from 'react';
import { getProjectBoard, createTask, updateTaskStatus, createDefaultScrumBoardWithTasks } from '../../api/projects';
import { onSnapshot, query, collection, where } from 'firebase/firestore';
import { db } from '../../firebase';
import React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';

const columnColors = [
  "bg-[#ED533F]", // Бэклог
  "bg-[#DD8227]", // Нужно сделать
  "bg-[#2982FD]", // В работе
  "bg-[#0FB14D]", // Правки
  "bg-[#0FB14D]", // Готово
];

type ProjectBoardScreenProps = {
  projectId: string;
};

type Column = {
  title: string;
  status: string;
  tasks: Array<{
    id: string;
    title: string;
  }>;
};

export const ProjectBoardScreen = ({ projectId }: ProjectBoardScreenProps) => {
  const [columns, setColumns] = useState<Column[]>([]);
  const [addingTaskCol, setAddingTaskCol] = useState<number | null>(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [chatsSnap] = useCollection(collection(db, "chats"));
  const chats = chatsSnap?.docs.map(doc => ({ id: doc.id, ...doc.data() })) || [];

  useEffect(() => {
    if (!projectId) return;
    // Автоинициализация scrum_board и задач
    createDefaultScrumBoardWithTasks(projectId).then(() => {
      // Подписка на изменения задач в real-time
      const q = query(collection(db, "tasks"), where("projectId", "==", projectId));
      const unsub = onSnapshot(q, () => {
        getProjectBoard(projectId).then(data => setColumns(data.columns));
      });
      // Первичная загрузка
      getProjectBoard(projectId).then(data => setColumns(data.columns));
      return () => unsub();
    });
  }, [projectId]);

  // Drag&Drop обработчик
  const onDragEnd = async (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId) return;
    // Обновить статус задачи в Firestore
    await updateTaskStatus(draggableId, columns[Number(destination.droppableId)].status);
    getProjectBoard(projectId).then(data => setColumns(data.columns));
  };

  // Добавление задачи
  const handleAddTask = async (colIdx: number) => {
    if (!projectId || !newTaskTitle.trim()) return;
    await createTask({
      projectId: projectId,
      status: columns[colIdx].status,
      title: newTaskTitle.trim(),
    });
    setNewTaskTitle("");
    setAddingTaskCol(null);
    getProjectBoard(projectId).then(data => setColumns(data.columns));
  };

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center px-0 md:px-0 pt-0 md:pt-0">
      <div className="w-full max-w-full md:max-w-[1808px] flex-1 flex flex-col items-center px-0 sm:px-0 md:px-0">
        <div className="w-full max-w-full md:max-w-[1744px] bg-white rounded-[24px] p-2 sm:p-4 md:p-8 flex flex-col gap-4 sm:gap-6 md:gap-10 mt-4 md:mt-0 min-h-[400px] border border-[#ECECEC] shadow-sm">
          <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-3 sm:gap-5 md:gap-8 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {columns.map((col, colIdx) => (
                <Droppable droppableId={String(colIdx)} key={col.title}>
                  {(provided: any) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="w-[272px] sm:w-[296px] md:w-[320px] flex-shrink-0 bg-[#F8F8FA] border border-[#ECECEC] rounded-[18px] flex flex-col p-4 gap-3 shadow-xs"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[18px] font-semibold text-[#222] tracking-tight">{col.title}</span>
                          <span className="text-[18px] font-semibold text-[#A5A5A7]">{col.tasks.length}</span>
                          <button
                            className="w-8 h-8 flex items-center justify-center border border-[#ECECEC] rounded-full bg-white ml-auto hover:bg-[#F3F7FE] transition"
                            onClick={() => setAddingTaskCol(colIdx)}
                          >
                            <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><rect x="2" y="2" width="16" height="16" rx="8" fill="#222"/><path d="M10 6v8M6 10h8" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
                          </button>
                        </div>
                        <div className="flex flex-col gap-2 flex-1 overflow-y-auto mt-1">
                          {col.tasks.map((task, idx) => (
                            <Draggable draggableId={task.id} index={idx} key={task.id}>
                              {(provided: any) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="w-full rounded-[10px] bg-white border border-[#E6EAF2] shadow-sm p-3 text-[15px] text-[#222] font-normal mb-1 hover:bg-[#F3F7FE] transition cursor-pointer"
                                  >
                                    {task.title}
                                  </div>
                                );
                              }}
                            </Draggable>
                          ))}
                          <div>{provided.placeholder}</div>
                          {addingTaskCol === colIdx && (
                            <form
                              className="flex gap-2 mt-2"
                              onSubmit={e => {
                                e.preventDefault();
                                handleAddTask(colIdx);
                              }}
                            >
                              <input
                                className="flex-1 border border-[#ECECEC] rounded-[8px] px-3 py-2 text-[15px] bg-white outline-none"
                                value={newTaskTitle}
                                onChange={e => setNewTaskTitle(e.target.value)}
                                placeholder="Новая задача"
                                autoFocus
                              />
                              <button
                                type="submit"
                                className="px-4 py-2 bg-[#2982FD] text-white rounded-[8px] font-medium text-[15px] hover:bg-[#3771C8] transition"
                              >
                                Добавить
                              </button>
                            </form>
                          )}
                        </div>
                      </div>
                    );
                  }}
                </Droppable>
              ))}
            </div>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}; 
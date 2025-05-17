import { collection, addDoc, serverTimestamp, getDocs, doc, getDoc, updateDoc, arrayUnion, arrayRemove, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function createProject({
  title,
  description,
  customerId,
  team = [],
  status = "draft",
}: {
  title: string;
  description: string;
  customerId: string;
  team?: string[];
  status?: string;
}) {
  const docRef = await addDoc(collection(db, "projects"), {
    title,
    description,
    customerId,
    team,
    status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Получить список проектов из Firestore
export async function getProjects() {
  const q = query(collection(db, "projects"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Получить scrum board и задачи для проекта
export async function getProjectBoard(projectId: string) {
  // Получаем scrum_board по projectId
  const q = query(collection(db, "scrum_boards"), where("projectId", "==", projectId));
  const scrumBoardSnap = await getDocs(q);
  if (scrumBoardSnap.empty) return { columns: [] };
  const scrumBoard = scrumBoardSnap.docs[0].data();
  // Получаем задачи по scrumBoardId
  const tasksQ = query(collection(db, "tasks"), where("scrumBoardId", "==", scrumBoardSnap.docs[0].id));
  const tasksSnap = await getDocs(tasksQ);
  const tasks = tasksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  // Группируем задачи по status
  const columns = [
    { title: "Бэклог", status: "todo", tasks: [] },
    { title: "Нужно сделать", status: "todo", tasks: [] },
    { title: "В работе", status: "in_progress", tasks: [] },
    { title: "Правки", status: "review", tasks: [] },
    { title: "Готово", status: "done", tasks: [] },
  ];
  for (const task of tasks as any[]) {
    const col = columns.find(c => c.status === (task as any).status);
    if (col) (col.tasks as any[]).push(task);
  }
  return { columns };
}

// Получить проект
export async function getProject(projectId: string): Promise<any | null> {
  const ref = doc(db, "projects", projectId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  const data: any = snap.data() || {};
  return { id: snap.id, ...data };
}

// Получить всех пользователей
export async function getUsers() {
  const q = query(collection(db, "users"));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Получить команду проекта (ProjectTeam)
export async function getProjectTeam(projectId: string): Promise<any | null> {
  const project: any = await getProject(projectId);
  if (!project) return null;
  const teamIds: string[] = Array.isArray(project.team) ? project.team : [];
  let members: any[] = [];
  if (teamIds.length) {
    const usersSnap = await getDocs(query(collection(db, "users"), where("id", "in", teamIds)));
    members = usersSnap.docs.map(doc => doc.data());
  }
  return {
    id: project.id,
    projectId: project.id,
    manager: project.manager || "",
    members,
    roles: project.roles || [],
    startDate: project.startDate || "",
    estimatedDuration: project.estimatedDuration || "",
    budget: project.budget || 0,
  };
}

// Добавить пользователя в проект
export async function addTeamMember(projectId: string, member: any) {
  // member.id должен быть id пользователя
  await updateDoc(doc(db, "projects", projectId), { team: arrayUnion(member.id) });
}

// Удалить пользователя из проекта
export async function removeTeamMember(projectId: string, userId: string) {
  await updateDoc(doc(db, "projects", projectId), { team: arrayRemove(userId) });
}

// Создать задачу для scrum board
export async function createTask({ projectId, status, title }: { projectId: string; status: string; title: string }) {
  // Найти scrum_board по projectId
  const q = query(collection(db, "scrum_boards"), where("projectId", "==", projectId));
  const scrumBoardSnap = await getDocs(q);
  if (scrumBoardSnap.empty) throw new Error("Scrum board not found");
  const scrumBoardId = scrumBoardSnap.docs[0].id;
  // Добавить задачу
  const docRef = await addDoc(collection(db, "tasks"), {
    scrumBoardId,
    title,
    status,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

// Обновить статус задачи
export async function updateTaskStatus(taskId: string, status: string) {
  const ref = doc(db, "tasks", taskId);
  await updateDoc(ref, { status, updatedAt: serverTimestamp() });
}

// Создать заявку на расчет
export async function createCalculationRequest(projectId: string, userId: string, data: { estimatedHours: number; rate: number; comment: string }) {
  await addDoc(collection(db, "calculation_requests"), {
    projectId,
    userId,
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

// Создать предложение специалисту
export async function createSpecialistProposal(projectId: string, userId: string, data: { rate: number; coverLetter: string }) {
  await addDoc(collection(db, "proposals"), {
    projectId,
    userId,
    ...data,
    status: "pending",
    createdAt: serverTimestamp(),
  });
}

// Создать scrum_board и тестовые задачи для projectId, если их нет
export async function createDefaultScrumBoardWithTasks(projectId: string) {
  // Проверяем, есть ли scrum_board
  const scrumQ = query(collection(db, "scrum_boards"), where("projectId", "==", projectId));
  const scrumSnap = await getDocs(scrumQ);
  let scrumBoardId = '';
  if (scrumSnap.empty) {
    // Создаем scrum_board
    const scrumRef = await addDoc(collection(db, "scrum_boards"), {
      projectId,
      createdAt: serverTimestamp(),
    });
    scrumBoardId = scrumRef.id;
    // Добавляем тестовые задачи
    const tasks = [
      { title: "Сделать дизайн", status: "todo" },
      { title: "Верстка главной страницы", status: "in_progress" },
      { title: "Настроить backend", status: "review" },
      { title: "Тестирование", status: "done" },
    ];
    for (const t of tasks) {
      await addDoc(collection(db, "tasks"), {
        scrumBoardId,
        projectId,
        title: t.title,
        status: t.status,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }
} 
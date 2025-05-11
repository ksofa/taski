import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

// Создать чат
export async function createChat({
  members,
  projectId,
  type = "private",
}: {
  members: string[];
  projectId?: string;
  type?: "private" | "group";
}) {
  const docRef = await addDoc(collection(db, "chats"), {
    members,
    projectId: projectId || null,
    type,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

// Отправить сообщение
export async function sendMessage({
  chatId,
  senderId,
  text,
  attachments = [],
}: {
  chatId: string;
  senderId: string;
  text: string;
  attachments?: string[];
}) {
  const docRef = await addDoc(collection(db, "messages"), {
    chatId,
    senderId,
    text,
    attachments,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
} 
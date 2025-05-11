import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function createApplication({
  projectId,
  userId,
  status = "created",
}: {
  projectId: string;
  userId: string;
  status?: string;
}) {
  const docRef = await addDoc(collection(db, "applications"), {
    projectId,
    userId,
    status,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
} 
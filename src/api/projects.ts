import { collection, addDoc, serverTimestamp } from "firebase/firestore";
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
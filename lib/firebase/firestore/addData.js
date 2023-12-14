import firebase_app from "../firebase-config";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function addData(collection, id, data) {
  let error;

  try {
    await setDoc(doc(db, collection, id), data, {
      merge: true,
    });

  } catch (e) {
    error = e.message;
  }

  return { error };
}

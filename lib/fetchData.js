import { db, storage } from "@/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const moverDetailsRef = collection(db, "moverDetails");

export const fetchMoverDetails = async () => {
  const q = query(moverDetailsRef);
  const querySnapshot = await getDocs(q);

  const results = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));

  return results;
};

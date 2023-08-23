import { adjectives, nouns } from "@/dummyData/dummyData";
import { db } from "@/firebase";
import React, { useState } from "react";

export const GenerateRandomName = async () => {
  const [usedNames, setUsedNames] = useState([]);

  useEffect(() => {
    // Load used names from Firestore
    const unsubscribe = db
      .collection("generatedMoveNames")
      .onSnapshot((snapshot) => {
        const names = [];
        snapshot.forEach((doc) => {
          names.push(doc.data().name);
        });
        setUsedNames(names);
      });

    // Clean up the listener
    return () => unsubscribe();
  }, [db]);

  const generateCompanyName = async () => {
    let companyName = "";

    do {
      const adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];

      companyName = `${adjective} ${noun}`;
    } while (usedNames.includes(companyName));

    // Add the generated name to Firestore
    db.collection("generatedMoveNames").add({ name: companyName });

    // setUsedNames(new Set(usedNames).add(companyName));

    // const nameRef = collection(db, "generatedMoveNames");

    // try {
    //   await addDoc(nameRef, {
    //     name: companyName,
    //   });
    // } catch (error) {
    //   return false;
    // }

    return companyName;
  };

  return { generateCompanyName, companyName };
};

// export default GenerateRandomName;

// <div>
//   <h1>Home Removals Booking App</h1>
//   <button onClick={() => alert(generateCompanyName())}>
//     Generate Company Name
//   </button>
// </div>

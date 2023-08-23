// import GenerateRandomName from "@/components/generateRandomName";
import { GenerateRandomName } from "@/components/generateRandomName";
import { adjectives, nouns } from "@/dummyData/dummyData";
import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { uploadBytes, ref, getDownloadURL } from "firebase/storage";
import MoverLayout from "@/layouts/MoverLayout";
import NormalLayout from "@/layouts/NormalLayout";
import { fetchGeneratedNames, fetchMoverDetails3 } from "@/lib/fetchData2";
import { getAllUserDetails } from "@/store/userSlice";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useSelector } from "react-redux";

const Appointments = ({ names }) => {
  const [usedNames, setUsedNames] = useState([]);
  const [companyName, setCompanyName] = useState("");

  // const newNames = [];
  // names.forEach((nam) => {
  //   newNames.push(nam.name);
  // });

  useEffect(() => {
    const newNames = [];
    names.forEach((nam) => {
      newNames.push(nam.name);
    });
    setUsedNames(newNames);
  }, []);

  const generateCompanyName = async () => {
    let companyName = "";

    do {
      // to generate 2 words only
      const adjective =
        adjectives[Math.floor(Math.random() * adjectives.length)];
      const noun = nouns[Math.floor(Math.random() * nouns.length)];
      companyName = `${adjective} ${noun}`;

      // To generate 1 or 2 words
      // const useTwoWords = Math.random() < 0.5; // 50% chance for two words
      // const firstWord = adjectives[Math.floor(Math.random() * adjectives.length)];
      // const secondWord = useTwoWords ? nouns[Math.floor(Math.random() * nouns.length)] : '';

      // companyName = useTwoWords ? `${firstWord} ${secondWord}` : firstWord;
    } while (usedNames.includes(companyName));


    const nameRef = collection(db, "generatedMoveNames");

    try {
      await addDoc(nameRef, {
        name: companyName,
      });
    } catch (error) {
      return false;
    }

    setCompanyName(companyName);

    alert(companyName);

    // return companyName;
  };

  console.log(usedNames);

  return (
    <MoverLayout>
      <Head>
        <title>Mover Profile - Appointments</title>
        <meta name="description" content="Rss removal and storage website" />
        <link rel="icon" href="/rrs_favicon.svg" />
      </Head>

      <div className="py-[50px] bg-white/90 px-[30px]">
        <p>Appointments</p>
        <div>
          <h1>Home Removals Booking App</h1>
          <button onClick={() => generateCompanyName()}>
            Generate Company Name
          </button>
          <p className="text-black">{companyName}</p>
        </div>
        {/* <GenerateRandomName/> */}
      </div>
    </MoverLayout>
  );
};

export default Appointments;

export async function getServerSideProps() {
  const names = await fetchGeneratedNames();

  return {
    props: {
      names,
    },
  };
}

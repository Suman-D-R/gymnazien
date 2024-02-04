import React, { useEffect, useState } from 'react'
import {db} from '../config/firebase';
import { collection,getDocs, doc, onSnapshot } from 'firebase/firestore';

interface ScoreData {
  // Define the types for your Firestore document fields
  id: string;
  // Add other fields as per your document structure
  scoure: number;
}

function UpdateEvents() {
  const [scoure, setScoure] = useState<number>(0);
  const scoreCollection = collection(db, "event");
  const [id, setId] = useState<string>(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDocs(scoreCollection);
        const filterData: ScoreData[] = data.docs.map((doc) => ({
          ...(doc.data() as ScoreData),
          id: doc.id,
        }));
         setScoure(filterData[0].scoure);
         setId(filterData[0].id);
        console.log(scoure,filterData[0].scoure);

        const unsubscribe = onSnapshot(doc(scoreCollection, id), (doc) => {
          if (doc.exists()) {
            setScoure(doc.data()?.scoure);
          }
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className='text-[60px]'>{scoure}</div>
  )
}

export default UpdateEvents
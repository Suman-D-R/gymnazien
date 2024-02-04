import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { getDocs, collection, updateDoc, doc, onSnapshot  } from 'firebase/firestore';

interface DashboardProps {

  
}

interface ScoreData {
  // Define the types for your Firestore document fields
  id: string;
  // Add other fields as per your document structure
  scoure: number;
}

const Dashboard: React.FC<DashboardProps> = () => {
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

  const updateFirestoreData = async () => {
    try {
      // Assuming you want to update a specific document, replace 'YOUR_DOCUMENT_ID' with the actual document ID
      const documentId = id;
      const docRef = doc(scoreCollection, documentId);

      // Update the document with the new data
      await updateDoc(docRef, {
        
        scoure: scoure+1,
      });

      console.log("Firestore data updated successfully.");
    } catch (error) {
      console.error("Error updating Firestore data:", error);
    }
  };

  return (
    <div className='w-full'>
      <p>score: {scoure}</p>
      <button onClick={updateFirestoreData} className='bg-black text-white'>Update Firestore Data</button>
    </div>
  );
};

export default Dashboard;

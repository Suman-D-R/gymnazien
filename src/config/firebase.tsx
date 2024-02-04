import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjoALbUAI3XbnO6JAWBSBATr5C0AbYwwQ",
  authDomain: "gymnazien-68d8a.firebaseapp.com",
  projectId: "gymnazien-68d8a",
  storageBucket: "gymnazien-68d8a.appspot.com",
  messagingSenderId: "556191602474",
  appId: "1:556191602474:web:7ee08f6bc64e23975ef053",
  measurementId: "G-JX14JZ0TMN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
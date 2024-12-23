// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//Configuration of service ally
// const firebaseConfig = {
//   apiKey: "AIzaSyDsg2eg2ueXQ9g78Hl3nt52b3fubavowUU",
//   authDomain: "service-ally-bc52c.firebaseapp.com",
//   projectId: "service-ally-bc52c",
//   storageBucket: "service-ally-bc52c.firebasestorage.app",
//   messagingSenderId: "820981124284",
//   appId: "1:820981124284:web:a7d8903dc646f8be8a94b9",
//   measurementId: "G-M74E9VN4XQ"
// };

//Configuration of parampra store
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_API_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
console.log("firebase:", firebase);
// const analytics = getAnalytics(app);

console.log("fire base is running");
export default firebase;

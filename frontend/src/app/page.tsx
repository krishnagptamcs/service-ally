import { getAuth } from "firebase/auth";
import firebase from "@/service/firebase";

export default function Home() {
  const auth = getAuth(firebase);
  console.log("Firebase Auth initialized:", auth);
  return (
    <>
      <section>Hello world</section>
    </>
  );
}

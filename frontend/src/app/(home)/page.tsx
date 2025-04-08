import { getAuth } from "firebase/auth";
import firebase from "@/service/firebase";
import Banner from "@/components/core/Home/Banner";
import PopularService from "@/components/core/Home/PopularService";

export default function Home() {
  const auth = getAuth(firebase);
  console.log("Firebase Auth initialized:", auth);
  return (
    <>
      <Banner />
      <PopularService />
    </>
  );
}

import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

function logout(){
 signOut(auth)
}
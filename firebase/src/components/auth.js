import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email)  بتساعد تشوف اذا هاد الحساب مسجل دخول او لأ

  const SignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (erorr) {
      console.error(erorr);
    }
    };
  return (
    <div>
      <input
        placeholder="Email ..."
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password ..."
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={SignIn}>Sign In</button>
    </div>
  );
};

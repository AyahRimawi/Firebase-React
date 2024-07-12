import { useState } from "react";
/* SignIn with Email And Password */
import { auth, googleProvider, signOut } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

/* SignIn with Google */
// import { googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";

/* SignOut*/
// import { signOut } from "../config/firebase";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.email)  بتساعد تشوف اذا هاد الحساب مسجل دخول او لأ

  /* SignIn with Email And Password */
  const SignIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (erorr) {
      console.error(erorr);
    }
  };

  /* SignIn with Google */
  const SignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (erorr) {
      console.error(erorr);
    }
  };

  /* SignOut */
  const logOut = async () => {
    try {
      await signOut(auth);
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
      {/* SignIn with Email And Password */}
      <button onClick={SignIn}>Sign In</button>

      {/* SignIn with Google */}
      <button onClick={SignInWithGoogle}>Sign In with Google</button>

      {/* SignOut*/}
      <button onClick={logOut}>SignOut</button>
    </div>
  );
};

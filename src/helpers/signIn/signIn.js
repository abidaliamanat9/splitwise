import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../utils/firebase";

const handleSignIn = async (e, formdata, setError, navigate) => {
  e.preventDefault();
  try {
    await signInWithEmailAndPassword(auth, formdata.email, formdata.password);
    navigate("/");
  } catch {
    setError("Invalid Email or Password");
  }
};
export { handleSignIn };

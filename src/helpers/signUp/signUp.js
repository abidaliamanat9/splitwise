import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { collection, doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../utils/firebase";

const handleSignUp = async (e, formData, setError, navigate) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    setError("Both passwords are not same");
  }
  try {
    const res = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const user = res.user;

    await updateProfile(auth.currentUser, {
      displayName: formData.name,
    });
    await setDoc(doc(collection(db, "users"), user.uid), {
      id: user.uid,
      name: formData.name,
      email: formData.email,
    });
    navigate("/");
  } catch {
    setError("Error occur during SignUp");
  }
};
export { handleSignUp };

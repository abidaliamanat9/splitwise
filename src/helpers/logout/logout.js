import { signOut } from "firebase/auth";

import { auth } from "../../utils/firebase";

const logout = async (navigate) => {
  await signOut(auth);
  navigate("/");
};

export { logout };

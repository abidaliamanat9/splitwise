import { signOut } from "firebase/auth";

import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { createUserWithEmailAndPassword, updateProfile,signInWithEmailAndPassword } from "firebase/auth";

import { collection, doc,addDoc, setDoc, getDocs, updateDoc } from "firebase/firestore";

import { auth, db, storage } from "../utils/firebase"


const Logout = async(navigate) => {
    await signOut(auth)
    navigate('/')
};

const handleSignUp = async(e,formData,setError,navigate) =>{
    e.preventDefault();

    if(formData.password !== formData.confirmPassword){
        setError("Both passwords are not same")
    }      
    try{
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = res.user;

        await updateProfile(auth.currentUser,{
            displayName:formData.name
        })
        await setDoc(doc(collection(db,'users'),user.uid),{
            id:user.uid,
            name:formData.name,
            email:formData.email
        });
        navigate('/')
    }
    catch{
        setError("Error occur during SignUp")
    }
};

const handleSignIn = async(e,formdata,setError,navigate) => {
    e.preventDefault()
    try{
      await signInWithEmailAndPassword(auth,formdata.email,formdata.password)
      navigate('/')
    }
    catch{
      setError("Invalid Email or Password")
    }
  };

const handleUserSelectChange = (e,users,setSelectedUsers) => {
    const userId = e.target.value;
    const currentUser = users.find((user) => user.id === userId);
    setSelectedUsers((prevSelectedUsers) => [
    ...prevSelectedUsers,
    {
        ...currentUser,
        orderAmount: "",
        paidAmount: "",
    },
    ]);
};

const fetchUsers = async (setUsers) => {
    const userCollection = await collection(db, "users");
    const userSnapshot = await getDocs(userCollection);
    const userData = userSnapshot.docs.map((doc) => doc.data());
    setUsers(userData);
};

const handleAddExpense = async (e,selectedUsers,image,description,date,totalAmount,setError,navigate) => {
    e.preventDefault();
    if (selectedUsers.length <= 1) {
    setError("Please select at least 1 contributor.");
    return;
    }
    const totalOrderAmount = selectedUsers.reduce(
    (total, user) => total + parseFloat(user.orderAmount),
    0
    );
    const totalPaidAmount = selectedUsers.reduce(
    (total, user) => total + parseFloat(user.paidAmount),
    0
    );
    if (totalOrderAmount !== totalPaidAmount) {
    setError("Order amounts and paid amounts are not equal.");
    return;
    }
    let imageURL = "";
    try {
    if (image) {
        const imageRef = ref(storage, `expense-images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
    }
    const expenseCollection = collection(db, "expenses");
    const expenseData = await addDoc(expenseCollection, {
        description,
        totalAmount,
        image: imageURL,
        date,
        contributors: [...selectedUsers],
    });
    const contributorsWithStatus = selectedUsers.map((contributor, index) => {
        const difference = contributor.paidAmount - contributor.orderAmount;
        let status = "";
        if (difference < 0) {
        status = "Debitor";
        } else if (difference > 0) {
        status = "Creditor";
        } else if (difference === 0) {
        status = "Done";
        }
        return {
        ...contributor,
        difference: Math.abs(difference),
        status,
        };
    });
    await updateDoc(expenseData, {
        id: expenseData.id,
        contributors: contributorsWithStatus,
    });
    navigate("/");
    } catch {
    setError("Expenses not addded");
    }
};
export {
    Logout,
    handleSignUp,
    handleSignIn,
    handleUserSelectChange,
    fetchUsers,
    handleAddExpense
}
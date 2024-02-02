import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { collection, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { db, auth } from "../utils/firebase"
import { Link } from "react-router-dom";
import '../styles/styles.css'

const SignUp = () => {
    const initialForm = {
        name:'',
        email:'',
        password:'',
        confirmPassword:''
    }
    const [formData,setFormData] = useState(initialForm)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSignUp = async(e) =>{
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
            // navigate('/add/')
        }
        catch{
            setError("Error occur during SignUp")
        }
    };
    const handleInputChange = (e) => {
        const { name, value} = e.target;
        setFormData((prevdata) => ({
            ...prevdata,
            [name]:value,
        }));
    };
    return(
        <>
        <div className="container mt-5">
            <div className="row justify-content-center cus-padding">
                <div className="card custom-card">
                    <div className="card-body">
                        <h2 className="card-title">Sign Up</h2>
                        <form onSubmit={handleSignUp}>
                            <div className="form-group mt-3">
                                <label htmlFor="name">Name:</label>
                                <input type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                placeholder="Enter name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required></input>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="email">Email:</label>
                                <input type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required></input>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="password">Password:</label>
                                <input type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleInputChange}
                                required></input>
                            </div>
                            <div className="form-group mt-3">
                                <label htmlFor="confirmPassword">Confirm Password:</label>
                                <input type="password"
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                placeholder="Enter password again"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required></input>
                            </div>
                            <button className="centerbutton btn btn-primary btn-block btn-lg mt-3">Sign Up</button>
                        </form>
                        {error && <div className="mt-3 text-danger">{error}</div>}
                        <p className="mt-3">Already have an account?<Link to="/signin/">Sign In</Link> here</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )

};
export default SignUp
import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import '../styles/styles.css'
import { auth, db, storage } from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
const Expense = () => {
  const loggedInUser = {email:auth.currentUser.email,id:auth.currentUser.uid,name:auth.currentUser.displayName,orderAmount:'',paidAmount:''}
  const [image, setImage] = useState()
  const [selectedUsers, setSelectedUsers] = useState([loggedInUser])
  const [state, setState] = useState({
    users: [],
    description: "",
    totalAmount: "",
    date: "",
    error:""
  })
  
  const { users, description, totalAmount, date,error } = state;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
        const userCollection = await collection(db,'users');
        const userSnapshot = await getDocs(userCollection)
        const userData = userSnapshot.docs.map(doc => doc.data())
        setState({...state,users:userData})
    }

    fetchUsers();
  }, []);
  const handleUserSelectChange = (e) => {
    const userId = e.target.value;
    const currentUser = users.find(user => user.id === userId);
    setSelectedUsers(prevSelectedUsers => [...prevSelectedUsers, {
        ...currentUser,
        orderAmount: '',
        paidAmount: ''
    }]);
};

  const handleAddExpense = async (e) => {
    e.preventDefault()
    if (selectedUsers.length <= 1) {
        setState({...state, error:"Please select at least 1 contributor."})
        return;
    }
    const totalOrderAmount = selectedUsers.reduce((total, user) => total + parseFloat(user.orderAmount), 0);
    const totalPaidAmount = selectedUsers.reduce((total, user) => total + parseFloat(user.paidAmount), 0);
    if (totalOrderAmount !== totalPaidAmount) {
        setState({...state, error:"Order amounts and paid amounts are not equal."})
        return;
    }
    let imageURL = '';
    try{
        if (image) {
            const imageRef = ref(storage,`expense-images/${image.name}`);
            await uploadBytes(imageRef,image);
            imageURL = await getDownloadURL(imageRef);
        }
        const expenseCollection = collection(db,'expenses')
        const expenseData = await addDoc(expenseCollection,{
            description,
            totalAmount,
            image: imageURL, 
            date,
            contributors:[
              ...selectedUsers
            ]           
        });
        const contributorsWithStatus = selectedUsers.map((contributor, index) => {
            const difference = contributor.paidAmount - contributor.orderAmount;
            let status = '';
            if (difference < 0) {
                status = 'Debitor';
            } else if (difference > 0) {
                status = 'Creditor';
            } else if (difference === 0) {
                status = 'Done';
            }
            return {
                ...contributor,
                difference: Math.abs(difference),
                status,
            };
        });
        await updateDoc(expenseData, {
            id: expenseData.id,
            contributors: contributorsWithStatus
        });
        navigate("/")
    }

    catch{
      setState({...state, error:"Expenses not addded"})
    }
  };

  return (
    <div className='container mt-3'>
        <h2 className='mb-4'>Add Expense</h2>
        <form onSubmit={handleAddExpense}>
            <div className='form-group mt-3'>
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" 
                className="form-control" 
                id="description" 
                placeholder="Enter description here"
                value={description}
                onChange={e=>setState({...state,description:e.target.value})} required/>
            </div>
            <div className='form-group mt-3'>
                <label htmlFor="totalAmount" className="form-label">Total Amount</label>
                <input type="number" 
                className="form-control" 
                id="totalAmount" 
                placeholder="Enter total amount here"
                value={totalAmount}
                onChange={e=>setState({...state,totalAmount:e.target.value})}  required/>
            </div>
            <div className='form-group mt-3'>
                <label htmlFor="date" className="form-label">Date</label>
                <input type="date" 
                className="form-control" 
                id="date" 
                placeholder="Enter Date here"
                value={date}
                onChange={e=>setState({...state,date:e.target.value})} required/>
            </div>
            <div className='form-group mt-3'>
                <label htmlFor="image" className="form-label">Image</label>
                <input type="file" 
                className="form-control" 
                id="image" 
                placeholder="Upload Image here"
                onChange={e => setImage(e.target.files[0])} />
            </div>
            <div className='form-group mt-3'>
                <label htmlFor="contributors" className="form-label">Select Contributors</label>
                <select 
                className="form-control" 
                id="contributors" 
                onChange={handleUserSelectChange}>
                    <option value="">Select Contributors</option>
                    {users.filter(user => user.id !== auth.currentUser.uid)
                        .filter(user => !selectedUsers.find(selectedUser => selectedUser.id === user.id))
                        .map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))
                    }
                </select>
            </div>
            {selectedUsers.map(currentUser => (
                            <div key={currentUser.id} className='mb-4'>
                                <h4>Enter {currentUser.name}'s Order Details</h4>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="orderAmount" className='fs-4'>Order Amount:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="orderAmount"
                                                value={currentUser.orderAmount}
                                                min="0"
                                                onChange={e => {
                                                    const updatedUsers = selectedUsers.map(user =>
                                                        user.id === currentUser.id ? { ...user, orderAmount: e.target.value } : user
                                                    );
                                                    setSelectedUsers(updatedUsers);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="paidAmount" className='fs-4'>Paid Amount:</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="paidAmount"
                                                value={currentUser.paidAmount}
                                                min="0"
                                                
                                                onChange={e => {
                                                    const updatedUsers = selectedUsers.map(user =>
                                                        user.id === currentUser.id ? { ...user, paidAmount: e.target.value } : user
                                                    );
                                                    setSelectedUsers(updatedUsers);
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
            ))}
            {error && <div className="mt-3 text-danger">{error}</div>}
            <button type="submit" className="btn btn-primary">Submit Expenses</button>
        </form>
    </div>
  );
};

export default Expense;

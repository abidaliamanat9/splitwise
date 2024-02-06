import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { auth } from "../utils/firebase";

import { handleUserSelectChange, fetchUsers, handleAddExpense } from "../helpers/helper";

import "../styles/styles.css";

const Expense = () => {
    const navigate = useNavigate();
    const loggedInUser = {
        email: auth.currentUser.email,
        id: auth.currentUser.uid,
        name: auth.currentUser.displayName,
        orderAmount: "",
        paidAmount: "",
    };
    const [image, setImage] = useState();
    const [selectedUsers, setSelectedUsers] = useState([loggedInUser]);
    const [users, setUsers] = useState([]);
    const [description,setDescription] = useState("");
    const [totalAmount, setTotalAmount] = useState("")
    const [date, setDate] = useState("")
    const [error, setError] = useState("")
    
    useEffect(() => {
        fetchUsers(setUsers);
    }, []);




  return (
    <div className="container mt-3">
      <h2 className="mb-4">Add Expense</h2>
      <form onSubmit={(e)=>handleAddExpense(e,selectedUsers,image,description,date,totalAmount,setError,navigate)}>
        <div className="form-group mt-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description here"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="totalAmount" className="form-label">
            Total Amount
          </label>
          <input
            type="number"
            className="form-control"
            id="totalAmount"
            placeholder="Enter total amount here"
            value={totalAmount}
            onChange={(e) =>
              setTotalAmount(e.target.value)
            }
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            placeholder="Enter Date here"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            className="form-control"
            id="image"
            placeholder="Upload Image here"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="contributors" className="form-label">
            Select Contributors
          </label>
          <select
            className="form-control"
            id="contributors"
            onChange={(e)=>handleUserSelectChange(e,users,setSelectedUsers)}
          >
            <option value="">Select Contributors</option>
            {users
              .filter((user) => user.id !== auth.currentUser.uid)
              .filter(
                (user) =>
                  !selectedUsers.find(
                    (selectedUser) => selectedUser.id === user.id
                  )
              )
              .map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
        </div>
        {selectedUsers.map((currentUser) => (
          <div key={currentUser.id} className="mb-4">
            <h4>Enter {currentUser.name}'s Order Details</h4>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="orderAmount" className="fs-4">
                    Order Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="orderAmount"
                    value={currentUser.orderAmount}
                    min="0"
                    onChange={(e) => {
                      const updatedUsers = selectedUsers.map((user) =>
                        user.id === currentUser.id
                          ? { ...user, orderAmount: e.target.value }
                          : user
                      );
                      setSelectedUsers(updatedUsers);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="paidAmount" className="fs-4">
                    Paid Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="paidAmount"
                    value={currentUser.paidAmount}
                    min="0"
                    onChange={(e) => {
                      const updatedUsers = selectedUsers.map((user) =>
                        user.id === currentUser.id
                          ? { ...user, paidAmount: e.target.value }
                          : user
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
        <button type="submit" className="btn btn-primary">
          Submit Expenses
        </button>
      </form>
    </div>
  );
};

export default Expense;

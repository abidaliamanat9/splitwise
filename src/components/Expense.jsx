import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { auth } from "../utils/firebase";

import { InputField } from "../utils/commons";

import {
  handleUserSelectChange,
  fetchUsers,
  handleAddExpense,
} from "../helpers/expense/expense";

import { handleAmountChange } from "../helpers/expense/expense";

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
  const [description, setDescription] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers(setUsers);
  }, []);

  return (
    <div className="container">
      <h2>Add Expense</h2>
      <form
        onSubmit={(e) =>
          handleAddExpense(
            e,
            selectedUsers,
            image,
            description,
            date,
            totalAmount,
            setError,
            navigate
          )
        }
      >
        <InputField
          label={"Description"}
          type={"text"}
          name={"description"}
          placeholder={"Enter order description"}
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <InputField
          label={"Total Amount"}
          type={"number"}
          name={"totalamount"}
          placeholder={"Enter order total amount"}
          value={totalAmount}
          onChange={(e) => {
            setTotalAmount(e.target.value);
          }}
        />
        <InputField
          label={"Date"}
          type={"date"}
          name={"date"}
          placeholder={"Enter order date"}
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
        <InputField
          label={"Image"}
          type={"file"}
          name={"image"}
          placeholder={"Enter order image"}
          onChange={(e) => {
            setImage(e.target.value[0]);
          }}
        />
        <div>
          <label>Select Contributors</label>
          <select
            onChange={(e) => handleUserSelectChange(e, users, setSelectedUsers)}
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
            <label>Enter {currentUser.name} Order Details</label>
            <InputField
              label={"Order Amount"}
              type={"number"}
              name={"orderAmount"}
              placeholder={"Enter your order amount"}
              value={currentUser.orderAmount}
              onChange={(e) => {
                handleAmountChange(
                  e,
                  selectedUsers,
                  setSelectedUsers,
                  currentUser,
                  "paidAmount"
                );
              }}
            />
            <InputField
              label={"Paid Amount"}
              type={"number"}
              name={"paidamount"}
              placeholder={"Enter your order paid amount"}
              value={currentUser.paidAmount}
              onChange={(e) => {
                handleAmountChange(
                  e,
                  selectedUsers,
                  setSelectedUsers,
                  currentUser,
                  "paidAmount"
                );
              }}
            />
          </div>
        ))}
        {error && <div className="error">{error}</div>}
        <button type="submit">Submit Expenses</button>
      </form>
    </div>
  );
};

export default Expense;

import { useState, useEffect } from "react";

import { auth } from "../utils/firebase";

import { fetchExpenses, settleExpense } from "../helpers/report/report";

import "../styles/styles.css";

const Report = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses(setExpenses);
  }, [expenses]);
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="expensestable">
          <h3>{expense.description}</h3>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Total Order</th>
                <th>Total Paid</th>
                <th>Status</th>
                <th>Settlements </th>
              </tr>
            </thead>
            {expense.contributors.map((contributor) => (
              <tbody key={contributor.id}>
                <tr>
                  <td>{contributor.name}</td>
                  <td>${contributor.orderAmount}</td>
                  <td>${contributor.paidAmount}</td>
                  <td>{contributor.status}</td>
                  <td>
                    {auth.currentUser.uid === contributor.id &&
                    contributor.status === "Debitor" ? (
                      <button
                        className="btn"
                        onClick={() =>
                          settleExpense(expenses, expense.id, contributor.id)
                        }
                      >
                        Settle
                      </button>
                    ) : (
                      ""
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </div>
      ))}
    </div>
  );
};
export default Report;

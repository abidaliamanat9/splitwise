import { useState, useEffect } from "react";

import { auth } from "../utils/firebase";

import { fetchExpenses, settleExpense } from "../helpers/report/report";

const Report = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses(setExpenses);
  }, [expenses]);
  return (
    <div>
      {expenses.map((expense) => (
        <div key={expense.id} className="expensestable">
          <h1>Expense Description: {expense.description}</h1>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Total Order</th>
                <th scope="col">Total Paid</th>
                <th scope="col">Status</th>
                {/* <th></th> */}
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

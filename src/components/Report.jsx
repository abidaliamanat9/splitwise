import { useState,useEffect } from "react"
import { collection, getDocs, doc, updateDoc} from "firebase/firestore";
import { auth, db, storage } from '../utils/firebase'

const Report =() => {
    const [expenses, setExpenses] = useState([])
    const fetchExpenses = async () => {
      const expenseCollection = await collection(db,'expenses');
      const expenseSnapshot = await getDocs(expenseCollection)
      const expenseData = expenseSnapshot.docs.map(doc => doc.data())
      setExpenses(expenseData)
      
    }
    useEffect(() => {    
        fetchExpenses();
      }, [expenses]);
      const settleExpense = async (expenseId, contributorId) => {
        const expenseRef = doc(db, 'expenses', expenseId);
    
        // Find the contributor in the contributors array
        const updatedContributors = expenses
          .find(expense => expense.id === expenseId)
          .contributors.map(contributor =>
            contributor.id === contributorId
              ? { ...contributor, status: 'Done', paidAmount: contributor.orderAmount }
              : contributor
          );
    
        await updateDoc(expenseRef, { contributors: updatedContributors });
        // Fetch expenses again after settling to update the state
        // fetchExpenses();
      };
      console.log(expenses)
      return (
        <div>
        {expenses.map(expense => (
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
            {expense.contributors.map(contributor => (
                <tbody key={contributor.id}>
                    <tr>
                        <td>{contributor.name}</td>
                        <td>${contributor.orderAmount}</td>
                        <td>${contributor.paidAmount}</td>
                        <td>{contributor.status}</td>
                        <td>{((auth.currentUser.uid === contributor.id) && (contributor.status === 'Debitor'))? (<button onClick={() => settleExpense(expense.id, contributor.id)}>Settle</button>):('')}</td>
                    </tr>
                </tbody>
            ))}
            </table>
          </div>
        ))}
      </div>
    );
}
export default Report
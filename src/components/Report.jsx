import { useState,useEffect } from "react"
import { collection, getDocs} from "firebase/firestore";
import { auth, db, storage } from '../utils/firebase'

const Report =() => {
    const [expenses, setExpenses] = useState([])
    useEffect(() => {
        const fetchExpenses = async () => {
            const expenseCollection = await collection(db,'expenses');
            const expenseSnapshot = await getDocs(expenseCollection)
            const expenseData = expenseSnapshot.docs.map(doc => doc.data())
            setExpenses(expenseData)
            
        }
    
        fetchExpenses();
      }, []);
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
                        <td>{((auth.currentUser.uid === contributor.id) && (contributor.status === 'debtor'))? (<button>Settle</button>):('')}</td>
                    </tr>
                {/* <p>{contributor.name}</p>
                <p>Total Owed: ${contributor.orderAmount - contributor.paidAmount}</p>
                <p>Total Paid: ${contributor.paidAmount}</p> */}
                </tbody>
            ))}
            </table>
          </div>
        ))}
      </div>
    );
}
export default Report
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

import { db } from "../utils/firebase";

const fetchExpenses = async (setExpenses) => {
  const expenseCollection = await collection(db, "expenses");
  const expenseSnapshot = await getDocs(expenseCollection);
  const expenseData = expenseSnapshot.docs.map((doc) => doc.data());
  setExpenses(expenseData);
};

const settleExpense = async (expenses, expenseId, contributorId) => {
  const expenseRef = doc(db, "expenses", expenseId);

  // Find the contributor in the contributors array
  const updatedContributors = expenses
    .find((expense) => expense.id === expenseId)
    .contributors.map((contributor) =>
      contributor.id === contributorId
        ? {
            ...contributor,
            status: "Done",
            paidAmount: contributor.orderAmount,
          }
        : contributor
    );

  await updateDoc(expenseRef, { contributors: updatedContributors });
};

export { fetchExpenses, settleExpense };

import { LinkElement } from "../utils/commons";

import "../styles/styles.css";

const Home = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>
        <LinkElement tos={"/addexpense/"} text={"Add an Expense"} />
        <LinkElement tos={"/expenses/"} text={"Expenses Report"} />
      </div>
    </div>
  );
};
export default Home;

import { Link } from "react-router-dom";

import "../styles/styles.css";

const Home = () => {
  return (
    <div className="container">
      <h2>Dashboard</h2>
      <div>
        <Link to="/addexpense/">
          <button type="button">Add an Expense</button>
        </Link>
        <Link to="/expenses/">
          <button type="button">Expenses Report</button>
        </Link>
      </div>
    </div>
  );
};
export default Home;

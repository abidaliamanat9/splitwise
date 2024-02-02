import "../styles/styles.css"
import { Link } from "react-router-dom";
const Home = () => {
    return(
        <div className="HomeContainer">
            <div className="HomeInnerContainer">
                <h2>Dashboard</h2>
                <div className="ButtonContainer">
                <Link to="/addexpense/">
                    <button type="button" class="homebtn btn btn-primary">Add an Expense</button>
                </Link>
                <Link to="/expenses/">
                    <button type="button" class="homebtn btn btn-primary">Expenses Report</button>
                </Link>
                </div>
            </div>
        </div>
    )
}
export default Home;
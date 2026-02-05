import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SummaryCard from "../components/SummaryCard";
import activities from "../data/activities";

const Dashboard = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <div className="page">
      <h2>Welcome {state.user.name}</h2>

      <div className="card-container">
        <SummaryCard title="Total Users" value="12" />
        <SummaryCard title="Total Reports" value="6" />
        <SummaryCard title="Status" value="Active" />
      </div>

      <h3>Recent Activities</h3>
      <table>
        <tbody>
          {activities.map((a) => (
            <tr key={a.id}>
              <td>{a.activity}</td>
              <td>{a.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => dispatch({ type: "LOGOUT" })}>Logout</button>
    </div>
  );
};

export default Dashboard;

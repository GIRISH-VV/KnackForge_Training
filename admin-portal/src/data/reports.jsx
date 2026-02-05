import { useState } from "react";
import reports from "./reports";

const Reports = () => {
  const [status, setStatus] = useState("");

  const filteredReports = reports.filter((r) =>
    status ? r.status === status : true
  );

  return (
    <div className="page">
      <h2>Reports</h2>

      <select onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option>Completed</option>
        <option>Pending</option>
      </select>

      <table>
        <tbody>
          {filteredReports.map((r) => (
            <tr key={r.id}>
              <td>{r.title}</td>
              <td>{r.month}</td>
              <td className={r.status.toLowerCase()}>{r.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button>Export Excel</button>
      <button>Export PDF</button>
    </div>
  );
};

export default Reports;

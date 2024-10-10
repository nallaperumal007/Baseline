// Component7.js

import React from "react";
import styles from "./hr-dashboard.module.css";

const Component7 = () => {
  const tableData = [
    { leaveType: "Casual Leaves", pending: 5, approved: 15, rejected: 2 },
    { leaveType: "Sick Leave", pending: 4, approved: 20, rejected: 4 },
  ];

  // Calculate total count for each leave type
  const totalPending = tableData.reduce((sum, row) => sum + row.pending, 0);
  const totalApproved = tableData.reduce((sum, row) => sum + row.approved, 0);
  const totalRejected = tableData.reduce((sum, row) => sum + row.rejected, 0);
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <table className={styles.hrTable}>
        <thead>
          <tr>
            <th colSpan="4">Status of the Leaves - {currentYear}</th>
          </tr>
          <tr>
            <th>Types of Leaves</th>
            <th>Pending</th>
            <th>Approved</th>
            <th>Rejected</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.leaveType}</td>
              <td>{row.pending}</td>
              <td>{row.approved}</td>
              <td>{row.rejected}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{totalPending}</td>
            <td>{totalApproved}</td>
            <td>{totalRejected}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Component7;

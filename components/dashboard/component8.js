// Component8.js

import React from "react";
import styles from "./hr-dashboard.module.css";

const Component8 = () => {
  const tableData = [
    { staffName: "John Doe", count: 5, percentage: 0 },
    { staffName: "Jane Doe", count: 3, percentage: 0 },
    // Add more data as needed
  ];

  const totalCount = tableData.reduce((sum, row) => sum + row.count, 0);

  // Update percentage for each row based on total count
  tableData.forEach((row) => {
    row.percentage = (row.count / totalCount) * 100;
  });

  // Calculate total percentage based on the sum of individual percentages
  const totalPercentage = tableData.reduce((sum, row) => sum + row.percentage, 0);
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <table className={styles.hrTable}>
        <thead>
          <tr>
            <th colSpan="3">Late Comers Statistics - {currentYear}</th>
          </tr>
          <tr>
            <th>Staff Name</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.staffName}</td>
              <td>{row.count}</td>
              <td>{row.percentage.toFixed(2)}%</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{totalCount}</td>
            <td>{totalPercentage.toFixed(2)}%</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Component8;

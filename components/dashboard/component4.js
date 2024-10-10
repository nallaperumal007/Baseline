// Component4.js

import React from "react";
import styles from "./hr-dashboard.module.css";

const Component4 = () => {
  const tableData = [
    { gender: "Male", count: 20, percentage: 0 },
    { gender: "Female", count: 30, percentage: 0 },
  ];

  const totalCount = tableData.reduce((sum, row) => sum + row.count, 0);

  // Update percentage for each row based on total count
  tableData.forEach((row) => {
    row.percentage = (row.count / totalCount) * 100;
  });

  // Calculate total percentage based on the sum of individual percentages
  const totalPercentage = tableData.reduce((sum, row) => sum + row.percentage, 0);


  return (
    <div>
      <table className={styles.hrTable}>
        <thead>
          <tr>
            <th colSpan="3">Active Staff by Gender</th>
          </tr>
          <tr>
            <th>Gender</th>
            <th>Count</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.gender}</td>
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

export default Component4;

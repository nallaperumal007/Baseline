import React from "react";
import { Chart } from "react-google-charts";
//import styles from "./dashboardNew.module.css";
//import charthelper from "../../helper/lib/sampleBarChart.js";

const Component1 = () => {
  const data = [
    ["Month", "Income", "Expense"],
    ["January", 503330, 833339],
    ["February", 793370, 895456],
    ["March", 664990, 756773],
    ["April", 710330, 793338],
    ["May", 310330, 453338],
    ["June", 203330, 533339],
    ["July", 673370, 795456],
    ["August", 564990, 456773],
    ["September", 710330, 393338],
    ["October", 510330, 693338],
    ["November", 710330, 393338],
    ["December", 340330, 593338],

  ];

  return (
    <div>
      <h2>Income Vs Expenses January</h2>
      <Chart
        
        chartType="Bar"
        width="100%"
        height="400px"
        data={data}
        options={{
          colors: ["#004d99", "#66b3ff"],
        }}
      />
    </div>
  );

}



export default Component1;

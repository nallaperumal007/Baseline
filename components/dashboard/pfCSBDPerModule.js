import React from "react";
import { Chart } from "react-google-charts";
//import styles from "./dashboardNew.module.css";

const Component1 = () => {
 const data = [
  ["Tickets", "Hours per Day"],
  ["Tickets for Incidents", 11],
  ["Tickets for Service Requests", 2],
  ["Tickets for Change Requests", 2],
  ["Problem Tickets", 2],

];



  return (
    <div>
    <h2>Tickets raised</h2>
    <Chart
      chartType="PieChart"
      data={data}
      options = {{
       
        is3D: true,
        colors: ["#004d99", "#66b3ff","#001433"],
      }}
      width={"100%"}
      height={"400px"}
    />
    </div>
  );
}
export default Component1;
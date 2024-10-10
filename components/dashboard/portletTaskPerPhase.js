import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import styles from "./dashboard.module.css";
import charthelper from "../../helper/lib/lib3DPieChart.js";

const Component3 = () => {
  const [chartData, setChartData] = useState([
    ["Student Name", "English", "Maths", "Tamil"]
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await charthelper.getRecord({ tnnt_id: '', is_active: 'active' });
        const formattedData = [["Student Name", "English", "Maths", "Tamil"]];
        data.forEach((item) => {
          formattedData.push([item.student_name, item.english, item.maths, item.tamil]);
        });
        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // The empty dependency array means this useEffect runs once when the component mounts

  return (
    <div  className={styles.wrapper}>
      <h2>Tasks Per Phase</h2>
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={chartData}
        options={{
          is3D: true,
          colors: ["#004d99", "#66b3ff", "#001433"],
        }}
      />
    </div>
  );
};

export default Component3;

import React from "react";
import { Chart } from "react-google-charts";
//import styles from "./dashboardNew.module.css";

const Component1 = () => {
    const data = [
        ["Expenses", "Amount"],
        ["Food", 11],
        ["Rent", 2],
        ["Travel", 2],
        ["Salaries", 2],

    ];



    return (
        <div>
            <h2>Total Expenses</h2>
            <Chart
                chartType="PieChart"
                data={data}
                options={{

                    is3D: true,
                    colors: ["#004d99", "#66b3ff", "#001433"],
                }}
                width={"100%"}
                height={"400px"}
            />
        </div>
    );
}
export default Component1;
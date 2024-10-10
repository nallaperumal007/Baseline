import React from "react";
import { Chart } from "react-google-charts";

const Component2 = () => {
    const data = [
        ["Microservice", "Remaining", "Completed"],
        ["IT Triage", 8175000, 8008000],
        ["IT Support", 3792000, 3694000],
        ["HR", 2695000, 2896000],
        ["IT Support DeskTop", 2099000, 5653000],

    ];

    return (
        <Chart
            chartType="BarChart"
            width="100%"
            height="400px"
            data={data}
            options={{

                title: "Microservices Record",
                chartArea: { width: "50%" },
                
                hAxis: {
                    title: "Total records per microservice",
                    minValue: 0,
                },
                vAxis: {
                    title: "Microservices",
                },
                colors: ["#004d99", "#66b3ff"],
                bar: { groupWidth: "100%" }, // Removes the space between bars
                isStacked: false, // Ensures the bars are not stacked
            }
            }
        />
    );
}

export default Component2;


// import React from "react";
// import { Chart } from "react-google-charts";

// const Component2 = () => {
//   const data = [
//     ["Microservice", "Remaining", "Completed"],
//     ["IT Triage", 8175000, 8008000],
//     ["IT Support", 3792000, 3694000],
//     ["HR", 2695000, 2896000],
//     ["Support DeskTop", 2099000, 5653000],
//   ];

//   return (
//     <Chart
//       chartType="BarChart"
//       width="100%"
//       height="400px"
//       data={data}
//       options={{
//         title: "Microservices Record",
//         chartArea: { width: "50%" },
//         hAxis: {
//           title: "Total records per microservice",
//           minValue: 0,
//         },
//         vAxis: {
//           title: "Microservices",
//         },
//         colors: ["#004d99", "#66b3ff"],
//         bar: { groupWidth: "100%" }, // Removes the space between bars
//         isStacked: false, // Ensures the bars are not stacked
//       }}
//     />
//   );
// }

// export default Component2;

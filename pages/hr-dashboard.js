import React from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import Component1 from "../components/dashboard/component1";
import Component2 from "../components/dashboard/component2";
import Component3 from "../components/dashboard/component3";
import Component4 from "../components/dashboard/component4";
import Component5 from "../components/dashboard/component5";
import Component6 from "../components/dashboard/component6";
import Component7 from "../components/dashboard/component7";
import Component8 from "../components/dashboard/component8";
//import CalendarModal from "../components/calendar/component2"; 
import Head from "../components/head";
import styles from "../styles/dashboard/hr-dashboard.module.css";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            tnnt_id: global.config.tnnt_id,
        };
    }

    componentDidMount() {
        const username = global.localStorage.username;
        if (username != null && username !== undefined) {
            this.setState({
                username: username,
                tnnt_id: global.localStorage.tnnt_id,
            });
        }
    }

    render() {
        return (
            <SideMenu tag="hrdashboard">
                <div className={styles.container}>
                    <Head title=" HR Dashboard" />

                    <div className={styles.row}>
                        <div className={styles.column} >
                            <Component1 />
                        </div>
                        <div className={styles.column} >
                            <Component2 />
                        </div>
                        <div className={styles.column} >
                            <Component3 />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Component4 />
                        </div>
                        <div className={styles.column}>
                            <Component5 />
                        </div>
                        <div className={styles.column}>
                            <Component6 />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <Component7 />
                        </div>
                       
                        <div className={styles.column}>
                            <Component8 />
                        </div>
                    </div>         
                </div>
            </SideMenu>
        );
    }
}

import React from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import Component1 from "../components/dashboard/portletMyItems";
import Component2 from "../components/dashboard/component2";
import Component3 from "../components/dashboard/portletCalendar";
import Kanban from "../components/dashboard/kanban";
import Head from "../components/head";
import styles from "../styles/dashboard/hr-dashboard.module.css";
import EmailPreview from "../components/pfmMgmt/pfCalendarEvents";

export default class Calendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewVisibility: false,
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
        const {
            selectedData,
            editable,
            previewVisibility,
          } = this.state;
        return (
        <div>
            {previewVisibility && (
          <EmailPreview
            visibility={previewVisibility}
            setVisibility={(v) => this.setState({ previewVisibility: v })}
            data={selectedData}
            editable={editable}
            getData={() => this.getData()}
          />
        )}
            <SideMenu tag="homeScreen">
                <div className={styles.container}>
                    <Head title=" Home Screen" />

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

                    <div className={styles.button_add_event}>
                        <button onClick={() =>
                                this.setState({
                                    previewVisibility: true,

                                })
                                }>Add Event</button>
                    </div>

                    <div className={styles.table}>
                    <div className={styles.row}>
                        <div>
                            <Kanban />
                        </div>
                    </div>
                    </div>
                </div>
            </SideMenu>
        </div>
        );
    }
}

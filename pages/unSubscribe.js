import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "../styles/hr/task-list.module.css";
import Head from "../components/head";
import Header from "../components/PriorityTask/prioritytask";

export default class ProfileView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            unsubscribeMessage: "",
            isButtonDisabled: false,
        };
    }

    componentDidMount() {
        const username = global.localStorage.getItem("username");

        if (username != null && username !== undefined) {
            this.setState({
                username: username,
            });
        }
    }

    handleUnsubscribe = () => {
            fetch('http://localhost:8080/pfNotifEmail/unSubscribe?custom_msg_id={{custom_msg_id}}')
                .then(response => {
                    if (response.ok) {
                        this.setState({ unsubscribeMessage: "You have been unsubscribed!" });
                    } else {
                        console.error('Failed to unsubscribe');
                        this.setState({ unsubscribeMessage: "Failed to unsubscribe." });
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.setState({ unsubscribeMessage: "An error occurred while processing your request." });
                })
                .finally(() => {
                    this.setState({ isButtonDisabled: true });
                });
            }

    render() {
        const { unsubscribeMessage, isButtonDisabled, username } = this.state;

        return (
            <div>
                <Header/>
                <Head title="Unsubscription" />
                <div className={styles.wrapper}>
                    <div>
                    <br/>
                        <h4>User Name: {username} </h4>
                        <h4>Click below to Confirm Unsubscribe:</h4>
                        <button id="unsubscribeLink" onClick={this.handleUnsubscribe} disabled={isButtonDisabled}>
                            Unsubscribe
                        </button>
                    </div>
                    {unsubscribeMessage && (
                        <p>{unsubscribeMessage}</p>
                    )}
                </div>
            </div>
        );
    }
}

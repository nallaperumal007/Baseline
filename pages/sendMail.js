import React from "react";
import styles from "../styles/pages.module.css";
import SideMenu from "../components/sideMenu/sideMenu";
import SendMailHelper from "../helper/notifEmail";
import PaTenantHelper from "../helper/pa/paTenantDet";
import Head from "../components/head";

export default class CustomField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customTableEditVisibility: false,
      selectedData: undefined,
      pageNumber: 0,
      tnnt_id: global.config.tnnt_id,
      user_name: global.config.username,
      activeRow: null,
      from_id: "",
    };
  }

  componentDidMount() {
    this.getEmailId();
  }

  getEmailId() {
    const { tnnt_id } = this.state;

    const filter = {
      id: tnnt_id,
    };

    PaTenantHelper.getEmail(filter)
      .then((data) => {
        this.setState({ from_id: data[0].email_from_id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  sendMail() {
    const { tnnt_id, user_name } = this.state;

    const data = {
      com_id: 2,
      com_rec_id: 66,
      email_evt_id: 1,
      from_id: from_id,
      to_id: from_id,
      email_subject: "Test for callback function",
      email_content: "Testing One",
      status_id: 1,
      tnnt_id: tnnt_id,
    };

    SendMailHelper.sendMail(data)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  }

    render() {
        const { } = this.state;

        return (
            <div>
                <SideMenu tag="">
                    <Head title="Send Mail" />

          <div className={styles.wrapper}>
            <div className={`${styles.viewWrapper}`}>
              <div className={`${styles.button}`}>
                <button className={`button`} onClick={() => this.sendMail()}>
                  {"Send Mail"}
                </button>
              </div>
            </div>
          </div>
        </SideMenu>
      </div>
    );
  }
}

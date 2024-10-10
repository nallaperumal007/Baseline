import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfEventDet";
import PfUserActivityDet from "../../helper/pfmMgmt/pfUserActivityDet";
import validate from "../../validation/dataValidate";


export default class PfEventDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id:157,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      int_clt_ref_id: "",
      text_event_descr: "",
      int_com_id: "",
      int_channel_notif: "",
      text_channel_notif_msg: "",
      int_channel_email: "",
      text_channel_email_templ: "",
      int_channel_wapp: "",
      text_channel_wapp_msg: "",
      int_channel_push_notif: "",
      text_channel_push_msg: "",


    };
    if (props.data !== undefined) {
      stateData.editable = props.editable;
      stateData.id = props.data;
    }

    this.state = {
      ...stateData,
    };
  }
  componentDidMount() {
    const { editable } = this.state;
    const username = global.config.username;
    const ms_id = "1";
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }

    editable !== undefined && this.getRecord();
    const user_name = global.config.username;
    const created_by = username;
    const tnnt_id = global.config.tnnt_id;
    PfUserActivityDet.insertRecord({ user_name, ms_id, created_by, tnnt_id })
      .then((response) => {
        // Handle success response
        console.log("Data inserted successfully:", response);
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    SampleHelper.getRecord(filter)
      .then((data) => {
        this.setState({
          // update the state of the component

          int_clt_ref_id: data[0].clt_ref_id,
          text_event_descr: data[0].event_descr,
          int_com_id: data[0].com_id,
          int_channel_notif: data[0].channel_notif,
          text_channel_notif_msg: data[0].channel_notif_msg,
          int_channel_email: data[0].channel_email,
          int_channel_wapp: data[0].channel_wapp,
          text_channel_wapp_msg: data[0].channel_wapp_msg,
        int_channel_push_notif: data[0].channel_push_notif,
        text_channel_push_msg: data[0].channel_push_msg,
          created_by: data[0].created_by, 
          // tnnt_id: data[0].tnnt_id,
          is_active: data[0].is_active == "active" ? true : false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async insertRecord() {
    const {
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      int_clt_ref_id,
      text_event_descr,
      int_com_id,
      int_channel_notif,
      text_channel_notif_msg,
      int_channel_email,
      text_channel_email_templ,
      int_channel_wapp,
      text_channel_wapp_msg,
      int_channel_push_notif,
      text_channel_push_msg,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
                  if (text_event_descr ===""){
                 alertText += ".Event Description\n ";
            }

      if (!validate.validateMandText(text_event_descr)) {
        alertText += ".Event Description\n"
      }
       
      if (!validate.validateMandNumber(int_com_id)) {
        alertText += ".Component ID\n"
      }
      if (!validate.validateMandNumber(int_channel_notif)) {
        alertText += ".Channel Notification\n"
      }
      if (!validate.validateMandNumber(int_channel_email)) {
        alertText += ".Channel Email\n"
      }
      if (!validate.validateMandNumber(int_channel_wapp)) {
        alertText += ".Channel Whatsapp\n"
      }




      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html:
            '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
            alertText +
            "</pre>",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      const data = {
        // task_3 : add more properties to data

        clt_ref_id: int_clt_ref_id,
        event_descr: text_event_descr,
        com_id: int_com_id,
        channel_notif: int_channel_notif,
        channel_notif_msg: text_channel_notif_msg,
        channel_email: int_channel_email,
        channel_email_templ: text_channel_email_templ,
        channel_wapp: int_channel_wapp,
        channel_wapp_msg: text_channel_wapp_msg,
        channel_push_notif: int_channel_push_notif,
        channel_push_msg: text_channel_push_msg,


        lc_status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.insertRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + data.id + " created successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: false });
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
            allowOutsideClick: false,
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async updateRecord() {
    const {
      id,
      is_active,
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      int_clt_ref_id,
      text_event_descr,
      int_com_id,
      int_channel_notif,
      text_channel_notif_msg,
      int_channel_email,
      text_channel_email_templ,
      int_channel_wapp,
      text_channel_wapp_msg,
      int_channel_push_notif,
      text_channel_push_msg,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      // if (text_event_descr === "") {
      //   alertText += ". Event Description\n";
      // }
      // if (int_com_id === "") {
      //   alertText += ". Component ID\n";
      // }
      // if (int_channel_notif === "") {
      //   alertText += ". Channel Notification\n";
      // }
      // if (int_channel_email === "") {
      //   alertText += ". Channel Email\n";
      // }
      // if (int_channel_wapp === "") {
      //   alertText += ". Channel Whatsapp\n";
      // }

      if (!validate.validateMandText(text_event_descr)) {
        alertText += ".Event Description\n"
      }
      
      if (!validate.validateMandNumber(int_com_id)) {
        alertText += ".Component ID\n"
      }
      if (!validate.validateMandNumber(int_channel_notif)) {
        alertText += ".Channel Notification\n"
      }
      if (!validate.validateMandNumber(int_channel_email)) {
        alertText += ".Channel Email\n"
      }
      if (!validate.validateMandNumber(int_channel_wapp)) {
        alertText += ".Channel Whatsapp\n"
      }


      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html:
            '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
            alertText +
            "</pre>",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      const data = {
        id: id,
        // task_3 : add more properties to data

        clt_ref_id: int_clt_ref_id,
        event_descr: text_event_descr,
        com_id: int_com_id,
        channel_notif: int_channel_notif,
        channel_notif_msg: text_channel_notif_msg,
        channel_email: int_channel_email,
        channel_email_templ: text_channel_email_templ,
        channel_wapp: int_channel_wapp,
        channel_wapp_msg: text_channel_wapp_msg,
        channel_push_notif: int_channel_push_notif,
        channel_push_msg: text_channel_push_msg,



        lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + id + " updated successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: true });
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
            allowOutsideClick: false,
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
      is_active,
      // task_2 : all declared variable add here

      int_clt_ref_id,
      text_event_descr,
      int_com_id,
      int_channel_notif,
      text_channel_notif_msg,
      int_channel_email,
      text_channel_email_templ,
      int_channel_wapp,
      text_channel_wapp_msg,
      int_channel_push_notif,
      text_channel_push_msg,


    } = this.state;

    return (
      <div className={styles.mainWrapper}>
        {is_loading && (
          <div className={"loadingWrapper"}>
            <div className={"innerLoadingWrapper"}>
              <div class="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}

        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div>
            <p className={styles.title}>
              {editable == undefined ? "Create Record" : editable ? "Update Record" : "View Record"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
             <div className={styles.sideWrapper}>

                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Client Reference ID:
                            {/* <span
                            
                            >
                            *
                            </span> */}
                            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_clt_ref_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_clt_ref_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_clt_ref_id}</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Event Description:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_event_descr}
                                    onChange={(e) =>
                                    this.setState({
                                        text_event_descr: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_event_descr}</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Component ID:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_com_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_com_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_com_id}</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Channel Notification:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                            *
                            </span></p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_channel_notif}
                                    onChange={(e) =>
                                    this.setState({
                                        int_channel_notif: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_channel_notif}</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Notification Message:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_channel_notif_msg}
                                    onChange={(e) =>
                                    this.setState({
                                        text_channel_notif_msg: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_channel_notif_msg}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Channel Email:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_channel_email}
                                    onChange={(e) =>
                                    this.setState({
                                        int_channel_email: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_channel_email}</p>
                                </div>
                            )}
                            </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Email Template:
			    </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_channel_email_templ}
                                    onChange={(e) =>
                                    this.setState({
                                        text_channel_email_templ: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_channel_email_templ}</p>
                                </div>
                            )}
                            </div>
                        </div>
            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Channel Whatsapp:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_channel_wapp}
                                    onChange={(e) =>
                                    this.setState({
                                        int_channel_wapp: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_channel_wapp}</p>
                                </div>
                            )}
                            </div>
                        </div>
            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Whats App Message:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_channel_wapp_msg}
                                    onChange={(e) =>
                                    this.setState({
                                        text_channel_wapp_msg: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_channel_wapp_msg}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Push Notification:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_channel_push_notif}
                                    onChange={(e) =>
                                    this.setState({
                                        int_channel_push_notif: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_channel_push_notif}</p>
                                </div>
                            )}
                            </div>
                        </div>
            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Push Notif Message:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_channel_push_msg}
                                    onChange={(e) =>
                                    this.setState({
                                        text_channel_push_msg: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_channel_push_msg}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                 </div>

            <div className={styles.inputAlignment}>
              <p className={`mandatory`}><span style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>* are mandatory fields</span></p>
            </div>
            <div
              className={styles.inputAlignment}
              style={{
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              {editable !== undefined && (
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={is_active}
                      onChange={(e) =>
                        this.setState({
                          is_active: e.target.checked,
                        })
                      }
                      disabled={editable == false}
                    />
                    <span className="slider round"></span>
                  </label>
                  <p className={styles.statusText}>
                    {is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              )}
            </div>
                        <span style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
              * {"  "}  are mandatory
            </span>
            {editable != false && (
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() =>
                    editable == undefined
                      ? this.insertRecord()
                      : editable && this.updateRecord()
                  }
                >
                  {editable == undefined ? "Create" : editable && "Update"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
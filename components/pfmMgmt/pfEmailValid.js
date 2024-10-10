// this source generated by GenAI v2.9.4 
import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfEmailValid";

export default class PfEmailValid extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id:2,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_email_id: "",
      text_req_timestamp: "",
      text_resp_timestamp: "",
      text_resp_col1: "",
      text_resp_col2: "",


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
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }

    editable !== undefined && this.getRecord();
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
        text_email_id: data[0].email_id,
        text_req_timestamp: data[0].req_timestamp,
        text_resp_timestamp: data[0].resp_timestamp,
        text_resp_col1: data[0].resp_col1,
        text_resp_col2: data[0].resp_col2,
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

      text_email_id,
      text_req_timestamp,
      text_resp_timestamp,
      text_resp_col1,
      text_resp_col2,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
            if (text_email_id ===""){
                 alertText += ".Email ID\n ";
            }
            if (text_req_timestamp ===""){
                 alertText += ".Request Timestamp\n ";
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

        email_id: text_email_id,
        req_timestamp: text_req_timestamp,
        resp_timestamp: text_resp_timestamp,
        resp_col1: text_resp_col1,
        resp_col2: text_resp_col2,


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

      text_email_id,
      text_req_timestamp,
      text_resp_timestamp,
      text_resp_col1,
      text_resp_col2,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
            if (text_email_id ===""){
                 alertText += ".Email ID\n ";
            }
            if (text_req_timestamp ===""){
                 alertText += ".Request Timestamp\n ";
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

        email_id: text_email_id,
        req_timestamp: text_req_timestamp,
        resp_timestamp: text_resp_timestamp,
        resp_col1: text_resp_col1,
        resp_col2: text_resp_col2,



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

      text_email_id,
      text_req_timestamp,
      text_resp_timestamp,
      text_resp_col1,
      text_resp_col2,


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
                            <p>Email ID:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_email_id}
                                    onChange={(e) =>
                                    this.setState({
                                        text_email_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_email_id}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Request Timestamp:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_req_timestamp}
                                    onChange={(e) =>
                                    this.setState({
                                        text_req_timestamp: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_req_timestamp}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Date:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_resp_timestamp}
                                    onChange={(e) =>
                                    this.setState({
                                        text_resp_timestamp: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_resp_timestamp}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Time:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_resp_col1}
                                    onChange={(e) =>
                                    this.setState({
                                        text_resp_col1: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_resp_col1}</p>
                                </div>
                            )}
                            </div>
                        </div>


            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Priority:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_resp_col2}
                                    onChange={(e) =>
                                    this.setState({
                                        text_resp_col2: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_resp_col2}</p>
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
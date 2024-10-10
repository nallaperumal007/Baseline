// this source generated by GenAI pythonProject
import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/component.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/sdlcMgmt/sdAcDet";
import SdDdHelper from "../../helper/sdlcMgmt/sdDdLookup";
import PfUserActivityDet from "../../helper/pfmMgmt/pfUserActivityDet";
import validate from "../../validation/dataValidate";


export default class SdAcDet extends React.Component {
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

      text_ac_name: "",
      text_descr: "",
      int_us_id: undefined,
      text_ac_scenario: "",
      text_ac_given: "",
      text_ac_when: "",
      text_ac_then: "",
      int_testing_type_id: "",
      int_proj_imp_status_id: undefined,
      arr_status: [],
      array_usname: [],


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
    this.getUserStory();
    this.getImpStatusDd();
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

  getUserStory() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
        is_active: 'active',
    };

    SdDdHelper.getUserstoryName(filter)
        .then((data) => {
            this.setState({ array_usname: data });
        })
        .catch((err) => {
            console.log(err);
        });
}

  getImpStatusDd() {
    const filter = {
        tnnt_id:  global.config.tnnt_id,
        is_active: 'active',
    };
  
    SdDdHelper.getSdImpStatus(filter)
        .then((data) => {
            this.setState({ arr_status: data });
        })
        .catch((err) => {
            console.log(err);
        })
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
        text_ac_name: data[0].ac_name,
        text_descr: data[0].descr,
        int_us_id: data[0].us_id,
        text_ac_scenario: data[0].ac_scenario,
        text_ac_given: data[0].ac_given,
        text_ac_when: data[0].ac_when,
        text_ac_then: data[0].ac_then,
        int_testing_type_id: data[0].testing_type_id,
        int_proj_imp_status_id: data[0].proj_imp_status_id,
        imp_status_name : data[0].imp_status_name,
        us_name: data[0].us_name,
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

      text_ac_name,
      text_descr,
      int_us_id,
      text_ac_scenario,
      text_ac_given,
      text_ac_when,
      text_ac_then,
      int_testing_type_id,
      int_proj_imp_status_id,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation

      if (!validate.validateMandText(text_ac_name)) {
        alertText += ".User Story Name\n"
      }
      if (!validate.validateMandTextOnly(text_ac_name)) {
        alertText += ".Invalid User Story Name\n"
      }
      if (!validate.validateMandNumber(int_us_id)) {
        alertText += ".Us Name\n"
      }
      if (!validate.validateMandNumber(int_proj_imp_status_id)) {
        alertText += ".Implementation Status\n"
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

        ac_name: text_ac_name,
        descr: text_descr,
        us_id: int_us_id,
        ac_scenario: text_ac_scenario,
        ac_given: text_ac_given,
        ac_when: text_ac_when,
        ac_then: text_ac_then,
        testing_type_id: int_testing_type_id,
        proj_imp_status_id: int_proj_imp_status_id,
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

      text_ac_name,
      text_descr,
      int_us_id,
      text_ac_scenario,
      text_ac_given,
      text_ac_when,
      text_ac_then,
      int_testing_type_id,
      int_proj_imp_status_id,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (!validate.validateMandText(text_ac_name)) {
        alertText += ".User Story Name\n"
      }
      if (!validate.validateMandTextOnly(text_ac_name)) {
        alertText += ".Invalid User Story Name\n"
      }
      if (!validate.validateMandNumber(int_us_id)) {
        alertText += ".Us Name\n"
      }
      if (!validate.validateMandNumber(int_proj_imp_status_id)) {
        alertText += ".Implementation Status\n"
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

        ac_name: text_ac_name,
        descr: text_descr,
        us_id: int_us_id,
        ac_scenario: text_ac_scenario,
        ac_given: text_ac_given,
        ac_when: text_ac_when,
        ac_then: text_ac_then,
        testing_type_id: int_testing_type_id,
        proj_imp_status_id: int_proj_imp_status_id,
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

      text_ac_name,
      text_descr,
      int_us_id,
      text_ac_scenario,
      text_ac_given,
      text_ac_when,
      text_ac_then,
      int_testing_type_id,
      int_proj_imp_status_id,
      arr_status,
      array_usname,
      imp_status_name,
      us_name,


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
                            <p>User Story Name:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                            *
                            </span>
                            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_ac_name}
                                    onChange={(e) =>
                                    this.setState({
                                        text_ac_name: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_ac_name}</p>
                                </div>
                            )}
                            </div>
                        </div>

                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Description:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"textarea"}
                                    value={text_descr}
                                    onChange={(e) =>
                                    this.setState({
                                        text_descr: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_descr}</p>
                                </div>
                            )}
                            </div>
                        </div>



                        {/* <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>US Name:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                            *
                            </span>
                            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_us_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_us_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_us_id}</p>
                                </div>
                            )}
                            </div>
                        </div> */}

                        <div className={styles.leftWrapper}>
                          <div className={styles.inputAlignment}>
                            <p>US Name:<span
                              style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                              *
                            </span></p>
                            {editable != false ? (
                              <select
                                value={
                                  int_us_id === undefined ? 0 : int_us_id
                                }
                                onChange={(e) =>
                                  this.setState({
                                    int_us_id: e.target.value,
                                  })
                                }
                              >
                                <option value={0} disabled selected>
                                  {"Select Us Name"}
                                </option>
                                {array_usname.map((s) => (
                                  <option value={s.id}>{s.name}</option>
                                ))}
                              </select>
                            ) : (
                              <div className={styles.viewField}>
                                <p>{us_name}</p>
                              </div>
                            )}
                          </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Scenario:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"textarea"}
                                    value={text_ac_scenario}
                                    onChange={(e) =>
                                    this.setState({
                                        text_ac_scenario: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_ac_scenario}</p>
                                </div>
                            )}
                            </div>
                        </div>



                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Given:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"textarea"}
                                    value={text_ac_given}
                                    onChange={(e) =>
                                    this.setState({
                                        text_ac_given: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_ac_given}</p>
                                </div>
                            )}
                            </div>
                        </div>



                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>When:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"textarea"}
                                    value={text_ac_when}
                                    onChange={(e) =>
                                    this.setState({
                                        text_ac_when: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_ac_when}</p>
                                </div>
                            )}
                            </div>
                        </div>



                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Then:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                    inputType={"textarea"}
                                    value={text_ac_then}
                                    onChange={(e) =>
                                    this.setState({
                                        text_ac_then: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_ac_then}</p>
                                </div>
                            )}
                            </div>
                        </div>



                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Testing Type:</p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_testing_type_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_testing_type_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_testing_type_id}</p>
                                </div>
                            )}
                            </div>
                        </div>

                        <div className={styles.leftWrapper}>
                          <div className={styles.inputAlignment}>
                            <p>Implementation Status:<span
                              style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                              *
                            </span></p>
                            {editable != false ? (
                              <select
                                value={
                                  int_proj_imp_status_id === undefined ? 0 : int_proj_imp_status_id
                                }
                                onChange={(e) =>
                                  this.setState({
                                    int_proj_imp_status_id: e.target.value,
                                  })
                                }
                              >
                                <option value={0} disabled selected>
                                  {"Select Implementation Status"}
                                </option>
                                {arr_status.map((s) => (
                                  <option value={s.id}>{s.name}</option>
                                ))}
                              </select>
                            ) : (
                              <div className={styles.viewField}>
                                <p>{imp_status_name}</p>
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
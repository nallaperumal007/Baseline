// this source generated by GenAI pythonProject
import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/component.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/sdlcMgmt/sdTestCycleDet";
import SdlcProjectHelper from "../../helper/sdlcMgmt/sdProjDet";
import DdHelper from "../../helper/sdlcMgmt/sdDdLookup";
import PfUserActivityDet from "../../helper/pfmMgmt/pfUserActivityDet";
import validate from "../../validation/dataValidate";



export default class SdTestCycleDet extends React.Component {
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

      int_proj_id: undefined,
      text_cycle_name: "",
      date_start_date: "",
      date_end_date: "",
      text_test_lead: "",
      array_SdlcProject: [],


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
    this.getForDropDownProj();
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

  getForDropDownProj() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
        is_active: 'active',
    };

    DdHelper.getForDropDown(filter)
    .then((data) => {
        this.setState({ array_SdlcProject: data });
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
        int_proj_id: data[0].proj_id,
        proj_name: data[0].proj_name,
        text_cycle_name: data[0].cycle_name,
        date_start_date: data[0].start_date === null ? null : new Date(moment(data[0].start_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
        date_end_date: data[0].end_date === null ? null : new Date(moment(data[0].end_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
        text_test_lead: data[0].test_lead,
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

      int_proj_id,
      text_cycle_name,
      date_start_date,
      date_end_date,
      text_test_lead,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (!validate.validateMandNumber(int_proj_id)) {
        alertText += ".Project Name\n"
      }
      if (!validate.validateMandText(text_cycle_name)) {
        alertText += ".Test Cycle Name\n"
      }
      if (!validate.validateMandTextOnly(text_cycle_name)) {
        alertText += ".Invalid Test Cycle Name\n"
      }
      if (!validate.validateDatePair(date_start_date)) {
        alertText += ".Start Date\n"
      }
      if (!validate.validateDatePair(date_end_date)) {
        alertText += ".End Date\n"
      }

      if (!validate.validateMandText(text_test_lead)) {
        alertText += ".Test Cycle Lead\n"
      }
      if (!validate.validateMandTextOnly(text_test_lead)) {
        alertText += ".Invalid Test Cycle Lead\n"
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

        proj_id: int_proj_id,
        cycle_name: text_cycle_name,
        start_date: moment(date_start_date).format("YYYY-MM-DD"),
        end_date: moment(date_end_date).format("YYYY-MM-DD"),
        test_lead: text_test_lead,
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

      int_proj_id,
      text_cycle_name,
      date_start_date,
      date_end_date,
      text_test_lead,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (!validate.validateMandNumber(int_proj_id)) {
        alertText += ".Project Name\n"
      }
      if (!validate.validateMandText(text_cycle_name)) {
        alertText += ".Test Cycle Name\n"
      }
      if (!validate.validateMandTextOnly(text_cycle_name)) {
        alertText += ".Invalid Test Cycle Name\n"
      }
      if (!validate.validateDatePair(date_start_date)) {
        alertText += ".Start Date\n"
      }
      if (!validate.validateDatePair(date_end_date)) {
        alertText += ".End Date\n"
      }

      if (!validate.validateMandText(text_test_lead)) {
        alertText += ".Test Cycle Lead\n"
      }
      if (!validate.validateMandTextOnly(text_test_lead)) {
        alertText += ".Invalid Test Cycle Lead\n"
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

        proj_id: int_proj_id,
        cycle_name: text_cycle_name,
        start_date: moment(date_start_date).format("YYYY-MM-DD"),
        end_date: moment(date_end_date).format("YYYY-MM-DD"),
        test_lead: text_test_lead,
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

      int_proj_id,
      text_cycle_name,
      date_start_date,
      date_end_date,
      text_test_lead,
      array_SdlcProject,
      proj_name,

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
                              <p>Project Name:<span
                              style={{ color: "red", marginLeft: "3px", fontSize: "20px" }}
                            >
                              *
                            </span></p>
                            {editable != false ? (
                              <select
                                value={
                                  int_proj_id === undefined ? 0 : int_proj_id
                                }
                                onChange={(e) =>
                                  this.setState({
                                    int_proj_id: e.target.value,
                                  })
                                }
                              >
                                <option value={0} disabled selected>
                                  {"Select Project"}
                                </option>
                                {array_SdlcProject.map((s) => (
                                  <option value={s.id}>{s.name}</option>
                                ))}
                              </select>
                            ) : (
                              <div className={styles.viewField}>
                                <p>{proj_name}</p>
                              </div>
                            )}
                          </div>
                        </div>
                            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Test Cycle Name:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                            *
                            </span>
                            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_cycle_name}
                                    onChange={(e) =>
                                    this.setState({
                                        text_cycle_name: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_cycle_name}</p>
                                </div>
                            )}
                            </div>
                        </div>



                        <div className={styles.inputAlignment}>
                <p>Start Date:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                            *
                            </span>
                            
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={date_start_date}
                      onChange={(e) =>
                        this.setState({ date_start_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{date_start_date ? moment(date_start_date).format("DD-MMM-YYYY") : ""}</p>
                  </div>
                )}
              </div>
                        
                        <div className={styles.inputAlignment}>
                <p>End Date:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                            *
                            </span>
                            
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={date_end_date}
                      onChange={(e) =>
                        this.setState({ date_end_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{date_end_date ? moment(date_end_date).format("DD-MMM-YYYY") : ""}</p>
                  </div>
                )}
              </div>
                        
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Test Lead:<span
                            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                            *
                            </span>
                            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="text"
                                    value={text_test_lead}
                                    onChange={(e) =>
                                    this.setState({
                                        text_test_lead: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{text_test_lead}</p>
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
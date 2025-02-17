// this source generated by GenAI v2.9.4 
import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfMachineM1Clt";

export default class PfMachineM1Clt extends React.Component {
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

      int_machine_id: "",
      int_clt_id: "",
      date_installation_date: "",
      date_warranty_end_date: "",


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
        int_machine_id: data[0].machine_id,
        int_clt_id: data[0].clt_id,
        installation_date: data[0].installation_date === null ? null : new Date(moment(data[0].installation_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
        warranty_end_date: data[0].warranty_end_date === null ? null : new Date(moment(data[0].warranty_end_date, "DD/MM/YYYY").format("DD/MMM/YYYY")),
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

      int_machine_id,
      int_clt_id,
      date_installation_date,
      date_warranty_end_date,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
            if (int_machine_id === undefined){
                 alertText += ".Machine Id\n ";
            }
            if (int_clt_id === undefined){
                 alertText += ".Client Id\n ";
            }
            if (date_installation_date ===""){
                 alertText += ".Installation date\n ";
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

        machine_id: int_machine_id,
        clt_id: int_clt_id,
        installation_date: installation_date === null ? null : moment(installation_date).format("YYYY-MM-DD"),
        warranty_end_date: moment(warranty_end_date).format("YYYY-MM-DD"),


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

      int_machine_id,
      int_clt_id,
      date_installation_date,
      date_warranty_end_date,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
            if (int_machine_id === undefined){
                 alertText += ".Machine Id\n ";
            }
            if (int_clt_id === undefined){
                 alertText += ".Client Id\n ";
            }
            if (date_installation_date ===""){
                 alertText += ".Installation date\n ";
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

        machine_id: int_machine_id,
        clt_id: int_clt_id,
        installation_date: installation_date === null ? null : moment(installation_date).format("YYYY-MM-DD"),
        warranty_end_date: moment(warranty_end_date).format("YYYY-MM-DD"),



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

      int_machine_id,
      int_clt_id,
      date_installation_date,
      date_warranty_end_date,


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
                            <p>Machine Id:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_machine_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_machine_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_machine_id}</p>
                                </div>
                            )}
                            </div>
                        </div>
            
                        <div className={styles.leftWrapper}>
                            <div className={styles.inputAlignment}>
                            <p>Client Id:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            </p>
                            {editable != false ? (
                                <div className={styles.inputCustom}>
                                <CustomInput
                                 input type="number"
                                    value={int_clt_id}
                                    onChange={(e) =>
                                    this.setState({
                                        int_clt_id: e.target.value,
                                    })
                                    }
                                />
                                </div>
                            ) : (
                                <div className={styles.viewField}>
                                <p>{int_clt_id}</p>
                                </div>
                            )}
                            </div>
                        </div>
            
                        <div className={styles.inputAlignment}>
                <p>Installation date:<span
            style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
            *
            </span>
            
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={installation_date}
                      onChange={(e) =>
                        this.setState({ installation_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{installation_date ? moment(installation_date).format("DD-MMM-YYYY") : ""}</p>
                  </div>
                )}
              </div>
                        
                        <div className={styles.inputAlignment}>
                <p>Warranty End Date:
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={warranty_end_date}
                      onChange={(e) =>
                        this.setState({ warranty_end_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{warranty_end_date ? moment(warranty_end_date).format("DD-MMM-YYYY") : ""}</p>
                  </div>
                )}
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
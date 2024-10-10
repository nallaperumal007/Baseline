import React from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import Head from "../components/head";
import ddLookUpHelper from "../helper/ddLookup";
import acWebinarRegistration from "../helper/acWebinarReg";
import styles from "../styles/pages.module.css";
import Swal from "sweetalert2";
import Colors from "../constants/colors";

export default class RegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      tnnt_id: 6,
      webinar: "",
      Participant_group_id: "",
      participant_name:"",
      contact_id: "",
      email_id: "",
      role: "",
      web_id: "",
      college_name: "",
      department_id: "",
      city: "",
      comp_name: "",
      webinartype: [],
      participantGrp: [],
      isStudent: false,
      selectedParticipantGrp: 0,
      selectedwebinar_type: undefined,
      selectedstatus_type: undefined,
      reg_status_id: 1,
      is_loading: false,
      passing_year: 2023,
    };
  }

  componentDidMount() {
    this.getDropdownAcWebinar();
    this.getDropdownParticipantGrp();
  }

  getDropdownAcWebinar() {
    const filter = {
      tnnt_id: 6,
      is_active: "active",
      status_id:1,
    };

    ddLookUpHelper
      .getAcWebinar(filter)
      .then((data) => {
        this.setState({ webinartype: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDropdownParticipantGrp() {

    const filter = {
      tnnt_id: 6,
      is_active: "active",
    };

    ddLookUpHelper
      .getParticipantGrp(filter)
      .then((data) => {
        this.setState({ participantGrp: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "selectedParticipantGrp") {
      this.setState({ isStudent: value === "student" });
    } else {
      this.setState({ [name]: value });
    }
  };

  handleRoleChange = (event) => {
    const { value } = event.target;
    this.setState({
      role: value,
    });
  };

  handleWebinarChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  validateFields = () => {
    const {
      selectedstatus_type,
      participant_name,
      city,
      department_id,
      college_name,
      comp_name,
      mobile_nr,
      email_id,
    } = this.state;

    let isValid = true;
    let alertText = "";

    if (selectedstatus_type === undefined) {
      isValid = false;
      alertText += "* Participant Group\n";
    }

    if (!/^[A-Za-z\s]+$/.test(participant_name)) {
      isValid = false;
      alertText += "* Invalid Participant Name\n";
    }

    if (!/^[A-Za-z\s]+$/.test(city)) {
      isValid = false;
      alertText += "* Invalid City\n";
    }

    if (selectedstatus_type === 1) {
      if (!/^[A-Za-z\s]+$/.test(department_id)) {
        isValid = false;
        alertText += "* Invalid Department\n";
      }

      if (!/^[A-Za-z\s]+$/.test(college_name)) {
        isValid = false;
        alertText += "* Invalid College Name\n";
      }
    }

    if (selectedstatus_type === 3) {
      if (!/^[A-Za-z\s]+$/.test(comp_name)) {
        isValid = false;
        alertText += "* Invalid Company Name\n";
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email_id)) {
      isValid = false;
      alertText += "* Invalid Email ID\n";
    }

    if (!isValid) {
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
    }

    return isValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      selectedwebinar_type,
      contact_id,
      selectedstatus_type,
      participant_name,
      department_id,
      college_name,
      comp_name,
      city,
      mobile_nr,
      email_id,
      tnnt_id,
      passing_year,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (selectedstatus_type === undefined) {
        alertText += "* participant Group\n";
      }

      if (!this.validateFields()) {
        return;
      }

      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html: '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' + alertText + "</pre>",
          confirmButtonColor: Colors.primaryColor, 
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }
      const data = {
        participant_name: participant_name,
        webinar_id: selectedwebinar_type,
        contact_id: contact_id,
        Participant_group_id: selectedstatus_type,
        department_id: department_id,
        college_name: college_name,
        comp_name: comp_name,
        city: city,
        mobile_nr: mobile_nr,
        email_id: email_id,
        created_by: "unknown",
        tnnt_id: tnnt_id,
        reg_status_id: 1,
        passing_year: passing_year,
      };

      this.setState({ is_loading: true });
      acWebinarRegistration.insertRecord(data)
        .then((data) => {
          if (data.code === 200) {
            Swal.fire({
              text: "Webinar Details Successfully Submitted!",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({
              selectedwebinar_type: undefined,
              selectedstatus_type: undefined,
              participant_name:"",
              contact_id: "",
              email_id: "",
              role: "",
              web_id: "",
              college_name: "",
              department_id: "",
              city: "",
              comp_name: "",
              passing_year: "",
            });
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
  };


  render() {
    const {
      selectedwebinar_type,
      webinartype,
      selectedstatus_type,
      participantGrp,
      participant_name,
      contact_id,
      department_id,
      college_name,
      comp_name,
      city,
      email_id,
      is_loading,
      passing_year, 
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
        <div>
          <SideMenu tag="Registration">
            <Head title="Registration Form" />
            <div className={`${styles["my-registration-form"]}`}>
              <form onSubmit={this.handleSubmit}>
                <div className={styles.formhead}>Webinar Registration Form</div>

                <div className={styles.formlabel}>
                  Select Webinar:
                  <select
                    value={selectedwebinar_type === undefined ? 0 : selectedwebinar_type}
                    className={styles.forminput}
                    onChange={(e) => this.setState({ selectedwebinar_type: e.target.value })}
                  >
                    <option value={0} disabled selected>
                      {"Select Webinar Slot"}
                    </option>
                    {webinartype.map((p) => (
                      <option value={p.id} key={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formlabel}>
                  Participant Name:
                  <input
                    type="text"
                    name="participant_name"
                    value={participant_name}
                    onChange={this.handleInputChange}
                    className={styles.forminput}
                    placeholder="Enter Your Full Name"
                    required
                  />
                </div>
                <br />

                <div className={styles.formlabel}>
                  Mobile Number:
                  <input
                    type="number"
                    name="contact_id"
                    value={contact_id}
                    onChange={this.handleInputChange}
                    className={styles.forminput}
                    placeholder="Enter your mobile number"
                    required
                  />
                </div>
                <br />

                <div className={styles.formlabel}>
                  Email ID:
                  <input
                    type="email"
                    name="email_id"
                    value={email_id}
                    onChange={this.handleInputChange}
                    className={styles.forminput}
                    placeholder="email_id Address*"
                    required
                  />
                </div>
                <br />

                <div className={styles.formlabel}>
                  I'm a:
                  <select
                    value={selectedstatus_type === undefined ? 0 : selectedstatus_type}
                    className={styles.forminput}
                    onChange={(e) => this.setState({ selectedstatus_type: e.target.value })}
                  >
                    <option value={0} disabled selected>
                      {"Select Participant Group"}
                    </option>
                    {participantGrp.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>
                <br />

                {selectedstatus_type == 1 && (
                  <div className={styles.formlabel}>
                    College Name:
                    <input
                      type="text"
                      name="college_name"
                      value={college_name}
                      onChange={this.handleInputChange}
                      className={styles.forminput}
                      placeholder="Your College Name"
                    />
                    <br />
                    <div className={styles.formlabel}>
                      Department:
                      <input
                        type="text"
                        name="department_id"
                        value={department_id}
                        onChange={this.handleInputChange}
                        className={styles.forminput}
                        placeholder="Ex: Ece, Cse,... "
                      />
                    </div>
                    <div className={styles.formlabel}>
                      Year of Passing:
                      <input
                        type="number"
                        name="passing_year"
                        value={passing_year}
                        onChange={this.handleInputChange}
                        className={styles.forminput}
                        placeholder="Ex: 2023, 2024, 2025. . ."
                      />
                    </div>
                  </div>
                )}

                {selectedstatus_type == 2 && (
                  <div className={styles.formlabel}>
                    College Name:
                    <input
                      type="text"
                      name="college_name"
                      value={college_name}
                      onChange={this.handleInputChange}
                      className={styles.forminput}
                      placeholder="Your College Name"
                    />
                    <br />
                    <div className={styles.formlabel}>
                      Department:
                      <input
                        type="text"
                        name="department_id"
                        value={department_id}
                        onChange={this.handleInputChange}
                        className={styles.forminput}
                        placeholder="Ex: Ece, Cse,... "
                      />
                    </div>
                    <div className={styles.formlabel}>
                      Year of Passing:
                      <input
                        type="number"
                        name="passing_year"
                        value={passing_year}
                        onChange={this.handleInputChange}
                        className={styles.forminput}
                        placeholder="Ex: 2023, 2024, 2025. . ."
                      />
                    </div>
                  </div>
                )}

                {selectedstatus_type == 3 && (
                  <div className={styles.formlabel}>
                    Company Name:
                    <input
                      type="text"
                      name="comp_name"
                      value={comp_name}
                      onChange={this.handleInputChange}
                      className={styles.forminput}
                      placeholder="Enter your Company Name"
                    />
                  </div>
                )}

                <div className={styles.formlabel}>
                  City:
                  <input
                    type="text"
                    name="city"
                    value={city}
                    onChange={this.handleInputChange}
                    className={styles.forminput}
                    placeholder="Enter your City"
                  />
                </div>
                <br />
                <button type="submit" className={`${styles.formbutton}`}>
                  Submit
                </button>
              </form>
            </div>
          </SideMenu>
        </div>
      </div>
    );
  }
}

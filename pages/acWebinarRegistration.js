import React, { useState } from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import Head from "../components/head";
import styles from "../styles/pages.module.css";
export default class RegForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      tnnt_id: global.config.tnnt_id,
      webinar:"",
      participantName: "",
      mobileNumber: "",
      email: "",
      role: "",
      web_id:"",
      collegeName: "",
      department: "",
      city: "",
      companyName: "",
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

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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

  handleSubmit = (event) => {
    event.preventDefault();

  };
  
  render() {
    const {
      participantName,
      mobileNumber,
      email,
      role,
      collegeName,
      web_id,
      department,
      city,
      companyName,
    } = this.state;

    return (
      <div>
        
        <SideMenu tag="Registration">
          <Head title="Registration Form" />
          <div className={`${styles["my-registration-form"]}`}>
    <form>
        <div className={styles.formhead}>Registration Form</div>

        <div className={styles.formlabel}>
        Select Webinar:
        <select
            name="web_id"
            value={web_id}
            onChange={this.handleWebinarChange}
            className={`${styles.formselect}`}
        >
            <option value="" disabled>Select Webinar</option>
            <option value="Webinar_1">Webinar 1</option>
            <option value="Webinar_2">Webinar 2</option>
            <option value="Webinar_3">Webinar 3</option>
        </select>
        </div>

        <div className={styles.formlabel}>
        Participant Name:
        <input
            type="text"
            name="participantName"
            value={participantName}
            onChange={this.handleInputChange}
            className={styles.forminput}
            placeholder="Name.."
            required
        />
        </div>
        <br />

        <div className={styles.formlabel}>
        Mobile Number:
        <input
            type="number"
            name="mobileNumber"
            value={mobileNumber}
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
            name="email"
            value={email}
            onChange={this.handleInputChange}
            className={styles.forminput}
            placeholder="Email Address*"
            required
        />
        </div>
        <br />

        <div className={styles.formlabel}>
            I'm a:
            <select
                name="role"
                value={role || ''}
                onChange={this.handleRoleChange}
                className={`${styles.formselect}`}
            >
                <option value="" disabled>Select profession</option>
                <option value="student">Student</option>
                <option value="unemployed">Unemployed</option>
                <option value="working_professional">Working Professional</option>
            </select>
            </div>
            <br />

            <div className={styles.formlabel}>
            College Name:
            <input
                type="text"
                name="collegeName"
                value={collegeName}
                onChange={this.handleInputChange}
                className={styles.forminput}
                placeholder="Your College Name"
            />
            </div>
            <br />


        {role === "student" && (
        <div className={styles.formlabel}>
            Department:
            <input
            type="text"
            name="department"
            value={department}
            onChange={this.handleInputChange}
            className={styles.forminput}
            placeholder="Ex: Ece, Cse,... "
            />
        </div>
        )}
        <br />

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

        {role === "working_professional" && (
        <div className={styles.formlabel}>
            Company Name:
            <input
            type="text"
            name="companyName"
            value={companyName}
            onChange={this.handleInputChange}
            className={styles.forminput}
            placeholder="Enter your Company Name"
            />
        </div>
        )}
        <br />

        <button type="submit" className={`${styles.formbutton}`}>Submit</button>
    </form>
    </div>

        </SideMenu>
        </div>
      
    );
  }
}

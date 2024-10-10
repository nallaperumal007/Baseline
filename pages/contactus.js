import React from 'react';
import Header from '../components/PriorityTask/prioritytask';
import styles from "../pages/index1.module.css";
import Footer from "../components/footer/footer";
import { BiMap } from "react-icons/bi";
import { FaPhoneAlt } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { FaArrowCircleUp } from 'react-icons/fa';

export default class ContactUs extends React.Component {
    constructor(props) {
        super(props);
        this.scrollToTop = this.scrollToTop.bind(this);
      }

      scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
  render() {
    return (
      <div className={styles.contactus}>
        <Header/><br/><br/>
        <h2 className={styles.content1}>Contact Us</h2><hr  style={{ width: '50px', margin:'0 10px',borderBlockColor:'aqua' }}/><br/>
        <h4 className={styles.content}>
            <p>SYNERGY EXPOSURES & EVENTS INDIA PVT LTD</p>
        </h4>
       <form className={styles.contactform}>
            <div className={styles.formgroup1}>
                <div>
                    <b><BiMap /> &nbsp; ADDRESS<br/></b>
                    <p>"Miranda Annexe” 276/1 Anjaneyar Kovil Street<br/><br/>
                    Vengaivasal, Chennai - 600 126<br/><br/>
                    Tamilnadu, India</p><br/><br/><br/><br/>
                    {/* <label htmlFor="address">New Address:</label>
                    <input type="text" id="address" name="address" /> */}
                </div>
                <div>
                    <b>CONTACT </b>
                    <p><FaPhoneAlt /> &nbsp; 044-2278 0776</p><br/>
                    <p><FaPhoneAlt /> &nbsp; +91-93802 20533</p><br/>
                    <p><FaPhoneAlt /> &nbsp; 044-2278 0776</p><br/><br/><br/><br/><br/><br/>
                    {/* <label htmlFor="phone">New Contact:</label>
                    <input type="text" id="phone" name="phone" /> */}
                </div>
                <div>
                    <b><AiOutlineMail /> &nbsp; EMAIL</b>
                    <p>info@synergyexposures.com</p><br/><br/><br/><br/><br/><br/><br/>
                    {/* <label htmlFor="newEmail">New Email:</label>
                    <input type="email" id="newEmail" name="newEmail" /> */}
                </div>  
            </div>
            <br/>
            <br/>
        </form>
        <form className={styles.contactForm}>
            <div className={styles.formGroup}>
                <label htmlFor="name"></label>
                <input className={styles.contactForm1}  type="text" id="name" name="name" placeholder="Name" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="email"></label>
                <input className={styles.contactForm1}  type="email" id="email" name="email" placeholder=" Email" />
            </div>
            <div className={styles.formGroup}>
                <label htmlFor="telephone"></label>
                <input className={styles.contactForm1}  type="tel" id="telephone" name="telephone" placeholder=" Telephone " />
            </div><br/>
        </form><br/>
    <form className={styles.contactForm}>
        <input className={styles.contactForm2} type="tel" id="" name="" placeholder="  " /><br/>
    </form><br/>
          <button type="submit" className={styles.submit}>Send </button>
          <div className={styles.findUs}>
            <h2 className={styles.content1}>Find Us</h2><hr />
          </div>
          <footer/>
          <div className={styles.arrow} >
          <FaArrowCircleUp size={30} onClick={this.scrollToTop}  /> 
        </div>
        <Footer/>
      </div>
    );
  }
}



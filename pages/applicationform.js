import React from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import styles from "./index1.module.css";
import Header from '../components/PriorityTask/prioritytask';
import { FaArrowCircleUp } from 'react-icons/fa';
import footer from '../components/footer/footer';
import Footer from '../components/footer/footer';

export default class ExpoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        name: '',
        designation: '',
        mobileNumber: '',
        address: '',
        city: '',
        expo: '',
        powerRequirement: '',
        compressedAir: '',
        company: '',
        email: '',
        landline: '',
        website: '',
        productProfile: '',
        waterInlet: '',
        additionalFurniture: ''
      }
    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value
      }
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.formData);
  };

  onRecaptchaChange = (value) => {
    console.log("reCAPTCHA value:", value);
  };

  render() {
    const { formData } = this.state;
    
    return (
      <div>
        <Header/>
        <div className={styles.expoform}>
          <h2 className={styles.expoform1}>Exhibitor Registration</h2>
          <hr style={{ width: '100px', margin:'0 10px',borderBlockColor:'aqua'}}/><br/>
          <form onSubmit={this.handleSubmit}>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>Name*</b></label><br/>
                <input type="text" name="name" value={formData.name} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
              <div className={styles.formcolumn}>
                <label><b>Company*</b></label><br/>
                <input type="text" name="company" value={formData.company} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>Designation*</b></label><br/>
                <input type="text" name="designation" value={formData.designation} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
              <div className={styles.formcolumn}>
                <label><b>Email*</b></label><br/>
                <input type="email" name="email" value={formData.email} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>Mobile Number*</b></label><br/>
                <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
              <div className={styles.formcolumn}>
                <label><b>Landline</b></label><br/>
                <input type="text" name="landline" value={formData.landline} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>Address*</b></label><br/>
                <textarea    type="textarea" name="address" value={formData.address} onChange={this.handleChange} style={{height:'100px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>City*</b></label><br/>
                <input type="text" name="city" value={formData.city} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
              <div className={styles.formcolumn}>
                <label><b>Website</b></label><br/>
                <input type="text" name="website" value={formData.website} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
            <div className={styles.formcolumn}>
              <label><b>Expo*</b></label><br/>
                <div style={{ position: 'relative' }}>
                  <select type="text" name="expo" value={formData.expo} onChange={this.handleChange} style={{ height: '40px', width: "100%" }} >
                    <option value="Select">Select</option>
                    <option value="BAKERS TECHNOLOGY FAIR - COIMBATORE">BAKERS TECHNOLOGY FAIR - COIMBATORE</option>
                    <option value="INDIA HORECA EXPO - COIMBATORE">INDIA HORECA EXPO - COIMBATORE </option>
                    <option value="FOOD &amp; DRINK PROCESSING EXPO - COIMBATORE">FOOD &amp; DRINK PROCESSING EXPO - COIMBATORE</option>
                    <option value="INDIA DAIRY PROCESSING EXPO - COIMBATORE">INDIA DAIRY PROCESSING EXPO - COIMBATORE </option>
                    <option value="INDIA FOOD PACK EXPO - COIMBATORE">INDIA FOOD PACK EXPO - COIMBATORE </option>
                    <option value="BAKERS TECHNOLOGY FAIR - HYDERABAD">BAKERS TECHNOLOGY FAIR - HYDERABAD </option>
                    <option value="INDIA HORECA EXPO - HYDERABAD">INDIA HORECA EXPO - COIMBATORE </option>
                    <option value="INDIA FOOD PACK EXPO - HYDERABAD">INDIA FOOD PACK EXPO - HYDERABAD </option>
                    <option value="HOSPISOURCE INNOVATION AWARDS">HOSPISOURCE INNOVATION AWARDS </option>
                  </select>
                </div>
              </div>

              <div className={styles.formcolumn}>
                <label><b>Product Profile</b></label><br/>
                <input name="productProfile" value={formData.productProfile} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>Power Requirement in KVA</b></label><br/>
                <input type="text" name="powerRequirement" value={formData.powerRequirement} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
              <div className={styles.formcolumn}>
                <label><b>Water Inlet for Product Demonstration</b></label><br/>
                <input type="text" name="waterInlet" value={formData.waterInlet} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <label><b>Compressed Air</b></label><br/>
                <input type="text" name="compressedAir" value={formData.compressedAir} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
              <div className={styles.formcolumn}>
                <label><b>Additional Furniture</b></label><br/>
                <input type="text" name="additionalFurniture" value={formData.additionalFurniture} onChange={this.handleChange} style={{height:'40px',width:"100%"}} />
              </div>
            </div>
            <div className={styles.formrow}>
              <div className={styles.formcolumn}>
                <ReCAPTCHA
                  sitekey="YOUR_RECAPTCHA_SITE_KEY"
                  onChange={this.onRecaptchaChange}
                />
              </div>
            </div>
            <button type="submit" className={styles.submit}>Submit</button>
          </form>
          <div className={styles.arrow} >
            <FaArrowCircleUp size={30} onClick={this.scrollToTop}  /> 
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}



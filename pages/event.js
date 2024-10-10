import React from "react";

import { Carousel } from "react-responsive-carousel";
import styles from "./index1.module.css";
// import GlobalWrapper from "../components/globalWrapper/globalWrapper";
import Footer from "../components/footer/footer";
import { FaArrowCircleUp } from 'react-icons/fa';
import Header from "../components/PriorityTask/prioritytask";
 


export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.scrollToTop = this.scrollToTop.bind(this);
  }
 

  componentDidMount() {
    
 
  }
 
 
  componentWillUnmount() {
    
 
  }

  
     scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

 
  render() {
    const { } = this.state;
    return (
        // <GlobalWrapper page={"home"}>
        <div>
            <Header/>
        <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>PROCESS ENGINEERING EXPO</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event1.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>Process Engineering Expo is dedicated to Process Plants and Equipment in the core sector.</p>
            <p>It provides a platform for Indian and global organizations that manufacture equipment and provide services to the Process Industry, to exhibit their range of products and services. The target visitor segments are entrepreneurs, senior management ,technical manager and purchase mangers from core manufacturing industry like Power, Cement, Steel, Coal, Natural gas, Petroleum & refinery products, Aluminium, Metal & Metallurgy etc. The expo is being supported by Govt. of Andhra Pradesh / Telangana and other Leading Industrial Associations of the country. This trade fair is in joint venture with Hyderabad International Trade Expositions Ltd (HITEX) - A PPP between the state government and L&T . The concurrent Process Engineering Conference is a networking summit for delegates pertaining to the core industry.</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>HOSPITALITY BUSINESS FAIR</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event2.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>HBF is a speciality B2B Exhibition for the Hospitality industry hosted at Chennai & Hyderabad, as the host cities are strategically located in the central part of Southern India.</p>
            <p>Profile for exhibitors include food service and lodging industry offerings range from Food and beverage, table top supplies, furnishings and accessories, advertising, maintenance equipment and supplies, bedding and linens, technology, electronics, fitness, Chemicals, cleaning, guest services etc.</p>
            <p>Decision makers from national and international Hotels, Resorts, Airlines, Consultants, Software and Facility Management companies visit the expo.</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>SYNERGY ENGINEERING PANORAMA</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event3.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>Synergy Engineering Panorama, is an expo dealing with general engineering products, technology and services. It is a significant move towards providing maximum exposure to the small and medium entrepreneurs to enhance their business prospects. The event has certainly opened numerous possibilities for these SMEs to enter into joint ventures with the target audience at the expo. Several industrial giants patronise this expo looking for heat treatment systems, material handling and factory automation products among many others. The fair was jointly promoted by NSIC to enhance the growth in small & medium segment.</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>BAKERS TECHNOLOGY FAIR</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event4.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>Its a dynamic networking opportunity between the exhibitors and visitors who include Bakery owners, Master bakers, consultants, association members, trade bodies and decision makers from leading bakeries, bread, biscuit plant, confectioneries etc. This platform is an ideal opportunity for appointing distributors, meeting up with prospective clients to create awareness of new products and services. It is also a focal point for every baker , distributor and visitor to witness product demonstratiosn and display of latest products.</p>
            <p>The “Bakers Knowledge Sharing Forum” organises , workshops and demonstrations for the improvement of bakery skill for the existing bakers. There are , sessions exclusively organised for the national skill development corporation a scheme promoted by the government that helps to gain momentum for women & young entrepreneur development.</p>
            <p>Besides the Society Of Indian Bakers, other associations that regularly support the event are- Indian Biscuit Manufacturers Association (IBMA), Assocom Institute of Bakery Technology & Management (AIBTM ), Bakers Asociation Kerala, South India Hotels and Restaurants Association ,TamilNadu Hotels Association, Biscuit Wafers & Confectioners Association, The Gujarat State Bakers Federation, Telangana Hotels Association, Karaikudi Bakery owners association , United Bakers Corporation Limited ,Hands in Hospitality, Telangana State Hotel Restaurant Association , Coimbatore Bakery Owners Association, Salem District Bakery Owners Association, The Association Of lady Entrepreneurs Confederation of Women Entrepreneurs Of Andhra Pradesh, The Hotel & Restaurant Equipment Manufacturer's Association Of India (HOTREMAI).</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>INDIA HORECA EXPO</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event5.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>India HoReCa Expo is a platform for the Food & Hospitality professionals to network with the suppliers, meet face-to-face and build key relationships with key buyers and decision-makers in India's hospitality and foodservice industry. A variety of exhibitors, including many international brands, will showcase their most recent products and present a platform to discuss the latest innovations and trends in the industry. Professionals, decision-makers of the hospitality, catering, leisure industries, restaurants, cafes, bakeries & fast food outlets, engineers, architects, designers, Hospitals, Supermarkets, Importers, wholesalers, suppliers, Consultants will be networking at IHE.</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>FOOD AND DRINK PROCESSING EXPO</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event6.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>Food and Drink Processing Expo brings the most influential buyers and the premium suppliers under one roof! It showcases cutting-edge technology, innovations and solutions for the food processing industries. The focused seminars & B2B meetings will ignite business opportunities at Food & Drink manufacturers.</p>
            <p>FDP provides manufacturing & processing solutions for products like Spices, Coffee, Organic Food, Tea, Edible Oil, Frozen & Refrigerated Food, Brewery, Confectionery, Seafood, Condiments & Sauces, Beverages, Meat & Poultry, Vegetable and Fruits, Dairy all under one roof.</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>INDIA FOOD PACK EXPO</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event7.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>The India Food Pack Expo will bring about new technology and easy sourcing opportunities for Indian food manufacturers to make cost effective and quality packaging solutions for their existing and NPD.</p>
            <p>Packaging is India’s one of the fastest growing sectors. Over the last few years, the industry has been a key driver of technology and innovation, contributing to various manufacturing sectors, including agriculture and the fast-moving consumer goods (FMCG) sectors.</p>
          </div>
        </div>
      </div>
      <div className={styles.welcomeSection}>
        <h2 className={styles.heading}>INDIA DAIRY PROCESSING EXPO</h2>
        <div className={styles.contentContainer}>
          <div className={styles.imageContainer}>
            <img src="/assets/event8.jpg" alt="Company" />
          </div>
          <div className={styles.textContainer}>
            <p>India Dairy Processing Expo is a dedicated trade show for dairy processing, packaging, distribution, and products. It will bring together suppliers and buyers from across the country under one roof to exchange new developments and witness the latest in technologies for the dairy industry live in person. Network with stakeholders in industry-focused conferences on Dairy & Dairy Technology.</p>
          </div>
        </div>
      </div>
      <div className={styles.arrow}>
        <FaArrowCircleUp size={30} onClick={this.scrollToTop} />
      </div>
      <Footer />
      </div>
    //   </GlobalWrapper>
    );
  }
}
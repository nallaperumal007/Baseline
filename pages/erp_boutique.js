import React from "react";
import styles from "../styles/ERP/ERP.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class Boutique extends React.Component {
  render() {
    return (
      <GlobalWrapper page={"botique"}>
        <div className={styles.container}>
          {/* <h1 className={styles.header}>Boutique Management</h1> */}
          <div className={styles.content}>
            <img src="/assets/Boutique.jpg" alt="Event" className={styles.eventImage} />
            <div className={styles.text}>
              <h1>Welcome to Boutique</h1>
              <p>At  Boutique, we believe that every piece tells a story,
                and behind every story is a team of dedicated professionals.
                Our boutique is not just about fashion; it's about people, passion, and precision.
                Here's an insight into the various facets of our operations.</p>
            </div>
          </div>
          <div className={styles.additionalText}>
            <h2>Staff Details</h2>
            <p>Our team is the heart of  Boutique Company .
              Each member brings unique expertise, creativity,
              and commitment to ensure we deliver the finest quality and service to our customers.</p>
            <h3>Meet Our Team:</h3>
            <ul>
              <li><b>Founder & CEO:</b> With a vision for timeless fashion, Jane leads our boutique with passion and innovation.</li>
              <li><b>Lead Designer:</b> John's exquisite designs and attention to detail set the tone for our unique collections.</li>
              <li><b>Marketing Manager:</b> Emily's strategic insight and creative campaigns ensure our brand reaches the right audience.</li>
              <li><b>Customer Relations Manager:</b> Sophia's warm approach and problem-solving skills guarantee a seamless customer experience.</li>
            </ul>
            <h2>Calendar Details</h2>
            <p>Stay updated with our boutique's calendar!
              From new collection launches to exclusive in-store events and seasonal sales,
              our calendar keeps you in the loop.</p>
            <h3>Upcoming Events:</h3>
            <ul>
              <li>Spring Collection Launch: March 15, 2024</li>
              <li>Summer Sale: June 1 - June 15, 2024</li>
              <li>Fashion Show: September 10, 2024</li>
            </ul>
            <h2>Attendance Details</h2>
            <p>We pride ourselves on our professional and dedicated team.
              Our attendance system ensures that all staff members are punctual and
              their contributions are acknowledged.</p>
            <h3>Attendance Highlights:</h3>
            <ul>
              <li>Daily Check-ins and Check-outs</li>
              <li>Monthly Attendance Reports</li>
              <li>Leave Management System</li>
            </ul>
            <h2>Order Details</h2>
            <p>Our boutique offers a seamless ordering experience,
              ensuring your favorite items are just a click away.</p>
            <h3>Order Tracking:</h3>
            <ul>
              <li><b>Order Confirmation:</b> Receive instant confirmation upon placing an order.</li>
              <li><b>Real-Time Tracking:</b> Stay informed with real-time updates on your order status.</li>
              <li><b>Customer Support:</b> Our support team is available to assist with any queries regarding your orders.</li>
            </ul>
            <h2>Client Details</h2>
            <p>We cherish our clients and strive to build lasting relationships.
              Our client management system ensures personalized service and attention to detail.</p>
            <h3>Client Management:</h3>
            <ul>
              <li><b>Client Profiles:</b> Maintain detailed profiles to tailor our services to individual preferences.</li>
              <li><b>Purchase History:</b> Track past purchases for personalized recommendations.</li>
              <li><b>Exclusive Offers:</b> Enjoy special discounts and offers as a valued client.</li>
            </ul>
            <h2>Payment Details</h2>
            <p>We offer secure and convenient payment options
              to make your shopping experience smooth and hassle-free.</p>
            <h3>Payment Options:</h3>
            <ul>
              <li><b>Credit/Debit Cards:</b> All major cards accepted.</li>
              <li><b>Net Banking:</b> Safe and quick transactions through net banking.</li>
              <li><b>Wallets and UPI:</b> Use your preferred digital wallet or UPI for swift payments.</li>
            </ul>
            <h2>Stock Details</h2>
            <p>Our stock management system ensures that we are always equipped with the latest trends and timeless classics.</p>
            <h3>Inventory Management:</h3>
            <ul>
              <li><b>Real-Time Stock Updates:</b> Stay informed about stock levels and new arrivals.</li>
              <li><b>Low Stock Alerts:</b> Receive notifications when your favorite items are running low.</li>
              <li><b>Seasonal Restocks:</b> Regular restocking to keep up with the latest trends.</li>
            </ul>
            <h2>Reports on Staff, Finance, and Product</h2>
            <p>We believe in transparency and efficiency. Our reporting systems provide detailed insights into various aspects of our operations.</p>
            <h3>Staff Reports:</h3>
            <ul>
              <li><b>Performance Metrics:</b> Monthly and quarterly performance reviews.</li>
              <li><b>Attendance Records:</b> Detailed attendance and leave reports.</li>
              <li><b>Training and Development:</b> Track staff training sessions and progress.</li>
            </ul>
            <h3>Finance Reports:</h3>
            <ul>
              <li><b>Sales Reports:</b> Daily, weekly, and monthly sales analytics.</li>
              <li><b>Expense Tracking:</b> Monitor operational expenses and budgeting.</li>
              <li><b>Profit Margins:</b> Analyze profit margins to ensure financial health.</li>
            </ul>
            <h3>Product Reports:</h3>
            <ul>
              <li><b>Best Sellers:</b> Identify top-performing products and trends.</li>
              <li><b>Stock Movement:</b> Track inventory turnover and restocking needs.</li>
              <li><b>Customer Feedback:</b> Gather and analyze feedback to improve product offerings.</li>
            </ul>
            <p>At Boutique , we are committed to providing an exceptional shopping
              experience through meticulous planning, dedicated staff, and a customer-centric approach.
              Explore our collections, enjoy our events, and experience fashion like never before.</p>
          </div>
        </div>
      </GlobalWrapper>
    );
  }
}



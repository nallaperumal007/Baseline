import React from 'react';
import styles from "../styles/ERP/ERP.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class EventManagement extends React.Component {
  render() {
    return (
      <GlobalWrapper page={"eventMgmt"}>
        <div className={styles.container}>
          {/* <h1 className={styles.header}>Event Management</h1> */}
          <div className={styles.content}>
            <img src="/assets/eventmngmt1.jpg" alt="Event" className={styles.eventImage} />
            <div className={styles.text}>
              <h2>Welcome to Event Management</h2>
              <p>Event management is the process of creating and maintaining an event. This process spans from the very beginning of planning all the way to post-event strategizing.</p>
            </div>
          </div>
          <div className={styles.additionalText}>

            <h2>Vendor Setup</h2>
            <h3>Welcome to Our Vendor Management System.</h3>
            <p>At Event Management, we believe in building strong partnerships with our vendors.
              Our Vendor Setup portal is designed to streamline the onboarding process,
              ensuring a seamless collaboration for your next event.</p>

            <ul>
              <li><b>Easy Registration: </b>Fill out our simple registration form to get started.</li>
              <li><b>Document Upload:</b> Securely upload necessary documents, including business licenses and insurance.</li>
              <li><b>Approval Process:</b> Our team will review your application promptly, providing feedback and approval within 48 hours.</li>
              <li><b>Vendor Dashboard:</b> Access your personalized dashboard to manage your profile, view upcoming events, and receive important updates.</li>
            </ul>
            <h2>Project Setup</h2>
            <h3>Effortless Event Planning Starts Here</h3>
            <p>Our Project Setup module simplifies the planning and management of your events. Whether you're organizing a small gathering or a large-scale exhibition, our tools ensure every detail is covered.</p>
            <ul>
              <li><b>Create New Projects:</b> Start by entering basic details like event name, date, location, and expected attendance.</li>
              <li><b>Task Management:</b> Assign tasks to team members, set deadlines, and track progress in real-time.</li>
              <li><b>Resource Allocation:</b> Manage resources efficiently, ensuring that everything from venues to equipment is accounted for.</li>
              <li><b>Budget Tracking:</b> Keep an eye on expenses and stay within budget with our comprehensive tracking system.</li>
            </ul>
            <h2>Stall Setup</h2>
            <h3>Customize Your Event Space with Ease</h3>
            <p>Setting up stalls for your exhibitors has never been easier. Our Stall Setup feature allows for complete customization to meet the unique needs of your event.</p>
            <ul>
              <li><b>Layout Design:</b> Use our interactive tools to design the perfect layout for your event space.</li>
              <li><b>Stall Allocation:</b> Assign stalls to exhibitors based on preferences and requirements.</li>
              <li><b>Amenities:</b> Specify and arrange for necessary amenities such as electricity, Wi-Fi, and furniture.</li>
              <li><b>Compliance:</b> Ensure all stalls meet safety and compliance standards with our built-in checklists.</li>
            </ul>
            <h2>Client Details </h2>
            <h3>Centralized Client Information at Your Fingertips </h3>
            <p>Manage your client relationships effectively with our Client Details section. Keep all relevant information organized and easily accessible. </p>
            <ul>
              <li><b>Client Profiles:</b> Create detailed profiles for each client, including contact information and historical data. </li>
              <li><b>Interaction History: </b>Create detailed profiles for each client, including contact information and historical data. </li>
              <li><b>Custom Notes:</b> Add custom notes to each profile to remember specific client preferences and requirements. </li>
              <li><b>Client Portal:</b> Provide your clients with access to a dedicated portal where they can view event details and updates. </li>
            </ul>
            <h2>Exhibitor Details</h2>
            <h3>Comprehensive Exhibitor Management</h3>
            <p>Ensure a smooth experience for your exhibitors with our detailed management tools. From initial registration to post-event follow-up, we've got you covered.</p>
            <ul>
              <li><b>Registration Forms:</b> Collect exhibitor information through customizable registration forms.</li>
              <li><b>Profile Management:</b> Exhibitors can manage their profiles, including company information, logos, and product details.</li>
              <li><b>Communication Tools:</b> Keep exhibitors informed with automated emails and notifications.</li>
              <li><b>Feedback Collection:</b> Gather feedback post-event to continually improve exhibitor satisfaction.</li>
            </ul>

            <h2>Contract Details</h2>
            <h3>Streamlined Contract Management</h3>
            <p>Our Contract Details section helps you manage agreements with clients, vendors, and exhibitors, ensuring clarity and compliance.</p>
            <ul>
              <li><b>Template Library:</b> Access a library of contract templates tailored to different types of events and services.</li>
              <li><b>Custom Contracts:</b> Create and customize contracts to meet specific needs.</li>
              <li><b>E-Signatures:</b> Facilitate quick and secure signing of contracts with our integrated e-signature feature.</li>
              <li><b>Tracking and Reminders:</b> Track contract status and set up automated reminders for renewals and expirations.</li>
            </ul>

            <h2>Payment Details</h2>
            <h3>Secure and Efficient Payment Processing</h3>
            <p>Handle all financial transactions with ease using our Payment Details module. Ensure timely payments and transparent financial management.</p>
            <ul>
              <li><b>Invoice Generation:</b> Automatically generate and send invoices to clients and exhibitors.</li>
              <li><b>Multiple Payment Methods:</b> Accept payments through various methods, including credit cards, bank transfers, and online payment gateways.</li>
              <li><b>Payment Tracking:</b> Monitor the status of payments and send reminders for pending invoices.</li>
              <li><b>Financial Reports:</b> Access detailed financial reports to keep track of all transactions and maintain accurate records.</li>
            </ul>

            <h2>Reports</h2>
            <h3>Insightful Reporting for Better Decision-Making</h3>
            <p>Our comprehensive reporting tools provide valuable insights to help you make informed decisions and improve future events.</p>
            <ul>
              <li><b>Event Summary Reports:</b> Get a complete overview of each event, including attendance, feedback, and financial performance.</li>
              <li><b>Custom Reports:</b> Generate custom reports based on specific criteria to analyze various aspects of your events.</li>
              <li><b>Visual Analytics:</b> Use charts and graphs to visualize data and identify trends.</li>
              <li><b>Export Options:</b> Export reports in various formats (PDF, Excel, etc.) for easy sharing and documentation.</li>
            </ul>
          </div>
        </div>
      </GlobalWrapper >
    );
  }
}


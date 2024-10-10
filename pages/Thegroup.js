import React from "react";
import styles from "./index1.module.css";
import Header from "../components/PriorityTask/prioritytask";
import { FaArrowCircleUp } from 'react-icons/fa';
import Footer from "../components/footer/footer";

const EventItem = ({ heading, imageUrl, description, url }) => (
    <div className={styles.eventItem}>
        <h3 className={styles.eventItemHeading}>{heading}</h3>
        <a href={url}>
            <img className={styles.eventItemImage} src={imageUrl} alt={heading} />
        </a>
        <p>{description}</p>
    </div>
);

const GroupItem = ({ imageUrl, heading, subHeading, names }) => (
    <div className={styles.groupItem}>
        <img className={styles.groupItemImage} src={imageUrl} alt={heading} />
        <h3 className={styles.groupItemHeading}>{heading}</h3>
        <h4 className={styles.groupItemSubHeading}>{subHeading}</h4>
        <ul className={styles.groupItemNames}>
            {names.map((name, index) => (
                <li key={index}>{name}</li>
            ))}
        </ul>
    </div>
);

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    heading: "PROCESS ENGINEERING EXPO",
                    imageUrl: "/assets/event1.jpg",
                    description: "PEE, A specialised Expo, dedicated to Process Plants and Equipments within the core sector.",
                    url: "/PriorityTask/event"
                },
                {
                    heading: "HOSPITALITY BUSINESS FAIR",
                    imageUrl: "/assets/event2.jpg",
                    description: "HBF is a speciality B2B Exhibition for the Hospitality industry hosted at Chennai & Hyderabad.",
                    url: "/PriorityTask/event"
                },
                {
                    heading: "SYNERGY ENGINEERING PANORAMA",
                    imageUrl: "/assets/event3.jpg",
                    description: "Synergy Engineering Panorama, deals with general engineering products, technology and services.",
                    url: "/PriorityTask/event"
                },
                {
                    heading: "BAKERS TECHNOLOGY FAIR",
                    imageUrl: "/assets/event4.jpg",
                    description: "The BTF, is a dynamic networking opportunity for Bakery owners, Master bakers, consultants, etc.",
                    url: "/PriorityTask/event"
                },
            ],
        };
        this.scrollToTop = this.scrollToTop.bind(this);
    }

    renderEventItems() {
        return this.state.events.map((event, index) => (
            <EventItem
                key={index}
                heading={event.heading}
                imageUrl={event.imageUrl}
                description={event.description}
                url={event.url}
            />
        ));
    }
    scrollToTop() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }

    render() {
        return (
            <div>
                <Header/>
                <div className={styles.welcomeSection}>
                    <h2 className={styles.heading}>OUR GROUP</h2>
                    <div className={styles.groupContainer}>
                        <GroupItem
                            imageUrl="/assets/group1.jpg"
                            heading="MIRANDA EQUIPMENTS PVT LTD"
                            subHeading="Manufacturing:"
                            names={["Non Metallic Expansion Joints"]}
                        />
                        <GroupItem
                            imageUrl="/assets/group2.jpg"
                            heading="LIBRA INNOVATIONS PVT LTD"
                            subHeading="Manufacturing:"
                            names={["Conveyors", "Continuous elevators", "Vacuum packing machines", "Cashew packing machines"]}
                        />
                        <GroupItem
                            imageUrl="/assets/group3.jpg"
                            heading="MILESTONE SPECIALITY EQUIPMENT PVT LTD"
                            subHeading="Manufacturing:"
                            names={["Cashew nut cutting and grading machinery"]}
                        />
                    </div>
                </div>

                <div className={styles.welcomeSection}>
                    <h2 className={styles.heading}>EVENTS</h2>
                    <div className={styles.eventContainer}>
                        {this.renderEventItems()}
                    </div>
                </div>
                <div>

                <Footer />
                </div>
                <div className={styles.arrow}>
                    <FaArrowCircleUp size={30} onClick={this.scrollToTop} />
                </div>
            </div>
        );
    }
}

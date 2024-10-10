import React from "react";

import styles from "./globalWrapper.module.css";

import Header from "../header/header";
import Head from "../head";
import Footer from "../footer/footer";

export default class GlobalWrapper extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			menu: {
				home: {
					title: "Home",
					hidden: true,
					link: "/",
					description: "This is home page",
					pageTitle: "Home",
				},
				contact: {
					title: "Contact Us",
					hidden: false,
					link: "/contact-us",
					description: "This is home page",
					pageTitle: "Contact Us",
				},
				careers: {
					title: "Careers",
					hidden: false,
					link: "/careers",
					description: "This is home page",
					pageTitle: "Careers",
				},
				careersList: {
					title: "Careers",
					hidden: false,
					link: "/careers",
					description: "This is home page",
					pageTitle: "Careers",
				},
				about: {
					title: "About Us",
					hidden: false,
					link: "/about-us",
					description: "This is home page",
					pageTitle: "About Us",
				},
				coreBanking: {
					title: "Core Banking",
					hidden: false,
					link: "/core-banking",
					description: "This is home page",
					pageTitle: "Core Banking",
				},
				webTechnology: {
					title: "Web Technology",
					hidden: false,
					link: "/web-technology",
					description: "This is home page",
					pageTitle: "Web Technology",
				},
				founder: {
					title: "Founder's Message",
					hidden: false,
					link: "/founder",
					description: "Founder's Message",
					pageTitle: "Founder's Message",
				},
				resetPassword: {
					title: "Reset Password",
					hidden: false,
					link: "/reset-password",
					description: "Reset Password",
					pageTitle: "Reset Password",
				},
				loghours: {
					title: "Add Log Hours",
					hidden: false,
					link: "/timesheet",
					description: "Add Log Hours",
					pageTitle: "Add Log Hours",
				},
				privacyPolicy: {
					title: "Privacy Policy",
					hidden: false,
					link: "/privacy-Policy",
					description: "This is home page",
					pageTitle: "PrivacyPolicy",
				},
				termsOfService: {
					title: "Terms Of Service",
					hidden: false,
					link: "/terms-of-service",
					description: "This is home page",
					pageTitle: "Terms Of Service",
				},
				gallery: {
					title: "Gallery",
					hidden: false,
					link: "/galary",
					description: "Gallery",
					pageTitle: "Gallery",
				},
				aiMentor: {
					title: "Ai Mentors and Expense",
					hidden: false,
					link: "/erp_Ai_mentor",
					description: "Ai Mentor and Expense",
					pageTitle: "Ai Mentor and Expense",
				},
				botique: {
					title: "Boutique Management",
					hidden: false,
					link: "/erp_boutique",
					description: "Boutique Management",
					pageTitle: "Boutique Management",
				},
				eventMgmt: {
					title: "Event Management",
					hidden: false,
					link: "/erp_eventManagement",
					description: "Event Management",
					pageTitle: "Event Management",
				},
				preSchool: {
					title: "Pre School & DayCare",
					hidden: false,
					link: "/erp_preschool",
					description: "Pre School & DayCare",
					pageTitle: "Pre School & DayCare",
				},
				travelMgmt: {
					title: "Travel Management",
					hidden: false,
					link: "/erp_travelmanagement",
					description: "Travel Management",
					pageTitle: "Travel Management",
				},
				tuition: {
					title: "Tuition Management",
					hidden: false,
					link: "/erp_tuition",
					description: "Tuition",
					pageTitle: "Tuition Management",
				},
				Course: {
					title: "Courses and Certifications ",
					hidden: false,
					link: "/acCourse",
					description: "Courses",
					pageTitle: "Courses and Certifications",
				},
				Internship: {
					title: "Internship",
					hidden: false,
					link: "/acInternship",
					description: "Internship",
					pageTitle: "Internship",
				},
				Project: {
					title: "College Final Year Project",
					hidden: false,
					link: "/acProject",
					description: "Projects",
					pageTitle: "College Final Year Project",
				},
				IndustrialVisit: {
					title: "Industrial Visit",
					hidden: false,
					link: "/acindustrialVisit",
					description: "Industrial Visit",
					pageTitle: "Industrial Visit",
				},
				Workshop: {
					title: "Guest Lectures & workshop sessions",
					hidden: false,
					link: "/acWorkshop",
					description: "Guest Lectures & workshop sessions",
					pageTitle: "Guest Lectures & workshop sessions",
				},
				Webinar: {
					title: "Webinar sessions",
					hidden: false,
					link: "/acWebinar",
					description: "Webinar sessions",
					pageTitle: "Webinar sessions",
				},
			},
			arr_membership: [
				{
					id: 1,
					img: "/assets/nasscom.JPG",
					title: "membership",
				},
				{
					id: 2,
					img: "/assets/ISO.JPG",
					title: "certification",
				},
			],
			arr_client: [
				{
					id: 1,
					img: "/assets/synpulse1.png",
					title: "Corebanking",
				},
				{
					id: 2,
					img: "/assets/techM.JPG",
					title: "Corebanking",
				},
				{
					id: 3,
					img: "/assets/synergyexposures1.JPG",
					title: "Web Tech",
				},
				{
					id: 4,
					img: "/assets/hospi.png",
					title: "Web Tech",
				},
                                {
                                        id: 5,
                                        img: "/assets/gk_products.jpeg",
                                        title: "Web Tech",
                                },
                                {
                                        id: 6,
                                        img: "/assets/gk_gasket.jpeg",
                                        title: "Web Tech",
                                },
                                {
                                        id: 7,
                                        img: "/assets/mySacredTrip.jpeg",
                                        title: "Web Tech",
                                },
			],
		};
	}

	componentDidMount() {
		const { page, title, description } = this.props;
		const { menu } = this.state;

		if (page == "careersList") {
			menu[page].pageTitle = `${title} | Careers`;
			menu[page].description = description;
			this.setState({ menu: menu });
		}
	}

	render() {
		const { children, page } = this.props;
		const { menu, arr_client, arr_membership } = this.state;
		var settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1
		};
		return (
			<div>
				<Header />
				<Head
					title={menu[page].pageTitle}
					description={menu[page].description}
				/>
				{!menu[page].hidden && (
					<div className={styles.headerTitle}>
						<h1>{menu[page].title}</h1>
					</div>
				)}
				{children}
				<div className={styles.heading}>
					<p>Our Clients</p>
					<div className={styles.clientsContainer}>
						{arr_client.map((b) => (
							<img alt={b.title} src={b.img} />
						))}
						{arr_client.map((b) => (
							<img alt={b.title} src={b.img} />
						))}
						{arr_client.map((b) => (
							<img alt={b.title} src={b.img} />
						))}
						
					</div>
				</div>
				<div className={styles.heading}>
					<p>Our Membership & Certificates</p>
					<div className={styles.ourmembership}>
						{arr_membership.map((b) => (
							<img alt={b.title} src={b.img} />
						))}
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

import React from "react";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";

import styles from "../styles/index.module.css";

import ServiceCard from "../components/serviceCard/serviceCard";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";
import HomeBannerHelper from "../helper/tnntAdmin/taHomePageDet";
import Footer from "../components/footer/footer";

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			services: [
				{
					id: 1,
					title: "Core Banking",
					description: "We provide consulting and services on core banking package software AVALOQ.",
					icon: "/assets/banking.png",
					alt: "Core Banking",
				},
				{
					id: 2,
					title: "Web Technology",
					description:
						"We support small and mid level organizations on their digital transformation E2E.",
					icon: "/assets/web.png",
					alt: "Web Technology",
				},
			],
			careers: [
				{
					id: 1,
					title: "Core Banking",
					icon: "/assets/banking.png",
					link: "/career",
					alt: "Core Banking",
				},
				{
					id: 2,
					title: "Web Technology",
					icon: "/assets/web.png",
					link: "/career",
					alt: "Web Technology",
				},
			],
			// banners: ["/assets/web_banner1.jpg", "assets/web_banner2.jpg"],
			banners: [],
		};
	}

	componentDidMount() {
		this.getHomeBanner();
	}
	
	getHomeBanner() {

		const filter = {
			hosting_date: moment(new Date()).format("YYYY-MM-DD")
		}
		
		HomeBannerHelper.getFilteredData(filter)
			.then(async (data) => {
				console.log(data[0].banners)
				this.setState({
					banners: data[0].banners,
				});
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { banners, services, careers } = this.state;
		return (
			<GlobalWrapper page={"home"}>
				<Carousel
					infiniteLoop={true}
					interval={6000}
					showThumbs={false}
					autoPlay={true}
					emulateTouch={true}
					dynamicHeight={true}
					showStatus={false}
				>
					{banners.map((b) => (
						<div>
							<img style={{ width: "50%" }}src={b.image} alt="Banner"/>
						</div>
					))}
				</Carousel>
				<div>
					<h2
						className={styles.sectionTitle}
						style={{ marginTop: 40 }}
					>
						Explore Our Services
					</h2>

					<div className={styles.container}>
						{services.map((s) => (
							<ServiceCard
								title={s.title}
								description={s.description}
								icon={s.icon}
								alt={s.alt}
							/>
						))}
					</div>

					<h2 className={styles.sectionTitle}>
						Explore Careers at Finari
					</h2>

					<div className={styles.container}>
						{careers.map((s) => (
							<ServiceCard
								title={s.title}
								link={s.link}
								alt={s.alt}
								icon={s.icon}
								buttonText={s.buttonText}
							/>
						))}
					</div>
				</div>
			</GlobalWrapper>
		);
	}
}

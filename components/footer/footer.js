import React, { Component } from "react";
import styles from "./footer.module.css";
import { withRouter } from "next/router";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}
	render() {
		return (
			<div className={styles.mainWrapper}>
				{/* <img
					className={styles.logoImg}
					src={"/assets/logo.png"}
					alt="Finari"
					onClick={() => (window.location = "/")}
				/> */}
				<div className={styles.wrapper}>
					<div className={styles.footerDetails}>
					   <div className={styles.middleText}>
					   <div className={styles.buttonsContainer}>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/careers")}
						>
							{"Careers "}
						</p>
						<span className={styles.separator}>|</span>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/about-us")}
						>
							{"About Us "}
						</p>
						<span className={styles.separator}>|</span>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/contact-us")}
						>
							{"Contact Us "}
						</p>
						<span className={styles.separator}>|</span>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/privacy-policy")}
						>
							{"Privacy Policy "}
						</p>
						<span className={styles.separator}>|</span>
						<p
							className={styles.footerText}
							style={{ cursor: "pointer" }}
							onClick={() => this.props.router.push("/terms-of-service")}
						>
							{"Terms Of Service "}
						</p>
					  </div>
					  </div>
					</div>

				</div>

				<div className={styles.footerData}>
					<p className={styles.footerText}>&#169; 2021-24 Finari.com. All Rights Reserved</p>
				</div>
			</div>
		);
	}
}

export default withRouter(Footer);

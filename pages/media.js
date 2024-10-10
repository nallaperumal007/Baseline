import React from "react";
import Header from "../components/PriorityTask/prioritytask";
import styles from "./index1.module.css";
import { FaArrowCircleUp } from 'react-icons/fa';
import Footer from "../components/footer/footer";

export default class MediaPage extends React.Component {
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
            <div className={styles.mediaPage}>
                <Header/>
                <h1 className={styles.mediaPage1}>IN THE NEWS...</h1>
                <hr className={styles.after}  style={{ width: '100px', margin:'1px 20px',borderBlockColor:'aqua'}}/>
                <div className={styles.mediaContainer}>
                    {/* Your news content */}
                </div>
                <br/><br/>
                <div className={styles.video1}>
                    <div className={styles.videoContainer}>
                        {/* First YouTube video */}
                        <div className={styles.video}>
                            BRAKERS TECHNOLOGY FAIR | HYDERABAD | INDIA
                            <iframe
                                width="553"
                                height="300"
                                src={`https://www.youtube.com/embed/Jx9yjkwirz4`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                        {/* Second YouTube video */}
                        <div className={styles.video}>
                            BRAKERS TECHNOLOGY FAIR 2015 | INDIA | REVIEW
                            <iframe
                                width="553"
                                height="300"
                                src={`https://www.youtube.com/embed/7U__9by2AKI`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                        {/* More YouTube videos */}
                    </div>
                    <br/>
                    {/* More YouTube videos */}
                    <div className={styles.videoContainer}>
                        {/* Third YouTube video */}
                        <div className={styles.video}>
                            HOSPITALITY BUSINESS FAIR 2011 CHENNAI
                            <iframe
                                width="553"
                                height="300"
                                src={`https://www.youtube.com/embed/blcXoNTQcP0`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                        {/* Fourth YouTube video */}
                        <div className={styles.video}>
                            BREAKERS TECHNOLOGY FAIR 2015 | INDIA
                            <iframe
                                width="553"
                                height="300"
                                src={`https://www.youtube.com/embed/2a3pqlNGS_E`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                    </div>
                    <br/>
                    {/* More YouTube videos */}
                    <div className={styles.videoContainer}>
                        {/* Fifth YouTube video */}
                        <div className={styles.video}>
                            HOSPITALITY BUSINESS FAIR 2013
                            <iframe
                                width="553"
                                height="300"
                                src={`https://www.youtube.com/embed/q6o-ohwNQuM`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                        <div className={styles.arrow}>
                            <FaArrowCircleUp size={30} onClick={this.scrollToTop} />
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

// File path: components/ImageGallery.js

import React from 'react';
import styles from "../styles/ERP/ERP.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class ImageGallery extends React.Component {
  render() {
    return (
      <GlobalWrapper page={"gallery"}>
        <div>
          <div className={styles.gallery}>
            <h2>Industrial Visit</h2>
            <div className={styles.event1}>
              <img src="/assets/Industrial_Visit-1.jpeg" alt="Event" className={styles.eventImage1} />
              <p>We at Finari Services have welcomed more than 400 students on site to encourage and educate the next generation of engineering and technology graduates. 
                 The industrial visits provide your students with practical knowledge in the fields of FinTech, Web Technology and AI. This visit offers a chance to see some 
                 of the cutting-edge innovations in action and engage with world-class experts from industry. By observing accomplished practitioners in action, enthusiastic 
                 students can observe how emerging technologies are practically employed. Such a linkage between theoretical classroom learning and real-world industry applications 
                 prepares them for jobs in engineering and technology. Our dedication to this immersive learning shows we take very seriously our desire to help mould the students 
                 who will be well equipped for real-world scenarios. It prepares students for real-life challenges in the technology industry by providing knowledge of how 
                 projects are taken from inception to completion. We encourage colleges to join us in bridging the gap between theoretical knowledge and practical expertise.
              </p>
            </div>
            <br></br>
            <h2>Internship Completion Ceremony</h2>
            <div className={styles.event2}>
              <img src="/assets/Internship-1.jpg" alt="Event" className={styles.eventImage1} />
              <p>At Finari Services, we provide a number of internship opportunities to the students in Python, Full Stack Development, AI Machine Learning, AWS Cloud Computing 
                 and Database Specialization. Interns work on-site at our office, gaining hands-on experience alongside our staff. They can also choose to work off-site, 
                 virtually, providing them a more convenient yet effective way to learn and grow. We provide internships ranging from 15 days to 4 months depending on what 
                 they desire to learn. It also includes support for research papers, especially for students in 5-year integrated programmes. To cap off their program 
                 experience, our first-ever class of interns finished the term and celebrated in a way they'll never forget. Quality internships are ultimately the bridge 
                 between academic learning and real-world application in technology or research - preparing students for successful careers.</p>
            </div>
            <br></br>
            <h2>Umagine 2024</h2>
            <div className={styles.event3}>
              <img src="/assets/Umagine-1.jpg" alt="Event" className={styles.eventImage1} />
              <p>Finari Services was a part of an Umagine 2024 initiative for the first time and this marked a major milestone for us. The event held at the Chennai Trade 
                 Center was a platform for us to exhibit our state-of-the-art technologies & ideas, and have fruitful discussions with industry giants. There were many 
                 visitors to our stall which included students, tech enthusiasts and it served as a platform for networking & idea exchange. This excitement in our innovations 
                 further reinvigorated our commitment to technology and culture of innovation </p>
               <img src="/assets/umagine_2.jfif" alt="Event" className={styles.eventImage1} />
               <p>We thank Dr.Sanjay Tyagi and STPI, Chennai team for their spontaneous support & guidance! They encouraged us in our effort especially towards making contributions 
                  to Digital India initiatives. We are highly enthusiastic to build upon this momentum and add value in bringing about game-changing transformations in the tech 
                  space!</p>
            </div>
            <br></br>
            <h2>Nasscom SME Confluence 2024</h2>
            <div className={styles.event3}>
              <img src="/assets/nasscom_sme.jfif" alt="Event" className={styles.eventImage1} />
              <p>The NASSCOM SME Confluence 2024 brought together small and micro enterprises to share industry insights and best practices. As proud members of NASSCOM, Finari 
                 Services participated in this landmark event. We engaged with various SMEs, discussing the latest industry trends and strategies for growth. The conference 
                 offered a valuable learning and networking opportunity for smaller businesses to navigate the ever-evolving tech landscape. We look forward to leveraging insights 
                 gained in this event to drive progress within our organisation and the broader industry.</p>
            </div>
            <br></br> 
            <h2>Workshop at Narayana Engineering College, Gudur AP</h2>
            <div className={styles.event3}>
              <img src="/assets/Narayana_College_Vist-1.jpeg" alt="Event" className={styles.eventImage1} />
              <p>We conducted a workshop at Narayana Engineering College, Gudur, Andhra Pradesh which was attended by more than 300 students who were eager to learn the current 
                 cutting edge technologies in the industry. It was a part of our mission to deliver industry-leading knowledge directly to the educational institutions. Our 
                 webinar series has successfully reached more than 600 students across various universities, focusing on FinTech, Cloud Computing, and Full Stack Development. 
                 This session was particularly interesting as it saw lively discussion among students, debating the possible changes AI would bring to all sectors in the near 
                 future. These partnerships are our show of commitment to fostering academic development and training the future tech leaders of tomorrow. We look forward to 
                 continuing to work together with schools to give students the knowledge they need to be at the forefront of digital innovation in the future.
               </p>
              <img src="/assets/Narayana_College_Vist-2.jpeg" alt="Event" className={styles.eventImage1}/>
            </div>
            <br></br>
            <h2>Testimonials</h2>
            <div className={styles.videoContainer}>
              <video controls className={styles.eventVideo}>
                <source src="https://testfinari.s3.ap-south-1.amazonaws.com/Sahaana.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video controls className={styles.eventVideo}>
                <source src="https://testfinari.s3.ap-south-1.amazonaws.com/Sriram.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video controls className={styles.eventVideo}>
                <source src="https://testfinari.s3.ap-south-1.amazonaws.com/Yuvan.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video controls className={styles.eventVideo}>
                <source src="https://testfinari.s3.ap-south-1.amazonaws.com/Internship_Karthik.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <video controls className={styles.eventVideo}>
                <source src="https://testfinari.s3.ap-south-1.amazonaws.com/Ruby.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          {/* <Footer />  */}
        </div>
      </GlobalWrapper>
    );
  }
}

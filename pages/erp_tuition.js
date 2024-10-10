import React from 'react';
import styles from "../styles/ERP/ERP.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class Tuition extends React.Component {
  render() {
    return (
      <GlobalWrapper page={"tuition"}>
        <div className={styles.container}>
          {/* <h1 className={styles.header}>Tuition Management</h1> */}
          <div className={styles.content}>
            <img src="/assets/tuition6.jpg" alt="Event" className={styles.eventImage} />
            <div className={styles.text}>
              <h3>Welcome to our Tuition Management</h3>
              <p>We're here to help you achieve academic success!
                Please fill out the form below to get more information about our courses and services.</p>
            </div>
          </div>
          <div className={styles.additionalText}>
            <h2>Enquiry Form</h2>
            <div className={styles.formContainer}>
              <form className={styles.enquiryForm}>
                <div className={styles.formGroup}>
                  <label id="name">Name:</label>
                  <input type="text" id="name" name="name" required />

                  <label id="email">Email:</label>
                  <input type="email" id="email" name="email" required />

                  <label id="phone">Phone Number:</label>
                  <input type="tel" id="phone" name="phone" required />

                  <label id="course">Preferred Course/Subject:</label>
                  <input type="text" id="course" name="course" required />

                  <label id="grade">Grade Level:</label>
                  <input type="text" id="grade" name="grade" required />

                  <label id="mode">Preferred Mode of Learning (Online/Offline):</label>
                  <select id="mode" name="mode" required>
                    <option value="mode">Select Mode</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                  </select>

                  <label id="comments">Additional Comments/Questions:</label>
                  <textarea id="comments" name="comments"></textarea>

                  <button type="submit">Submit Your Enquiry</button>
                </div>
              </form>
            </div><br></br>
            <h2>Staff Details</h2>
            <p>Meet Our Expert Team at our Tuition , we pride ourselves on our dedicated and experienced educators who are passionate about teaching and committed to your success.</p>
            <ul>
              <li><b>Founder & Mathematics Instructor:</b> John is a seasoned educator with over 20 years of experience teaching mathematics. His innovative teaching methods and dedication have helped countless students excel.</li>
              <li><b>Science Instructor:</b> Jane holds a PhD in Physics and has a knack for making complex concepts simple and engaging. She is known for her interactive and hands-on approach to teaching science.</li>
              <li><b>English Instructor:</b> Emily, with her extensive background in literature and language arts, brings creativity and enthusiasm to her English classes, inspiring students to love reading and writing.</li>
              <li><b>Admissions Coordinator:</b> Michael ensures a smooth and welcoming admission process. His attention to detail and friendly demeanor make him the perfect first point of contact for prospective students.</li>
            </ul>

            <h2>Student Details</h2>
            <p>Our Students Our students come from diverse backgrounds and share a common goal: to achieve academic excellence. We are proud of our supportive and collaborative learning environment.</p>
            <ul>
              <li>Sarah Brown: A top performer in our advanced mathematics course, aiming to pursue engineering.</li>
              <li>Daniel Green: An enthusiastic science student who won the regional science fair last year.</li>
              <li>Rachel Adams: A passionate literature student, currently working on her first novel.</li>
            </ul>

            <h2>Course Details</h2>
            <p>Courses We Offer We offer a wide range of courses tailored to meet the needs of students from various grade levels and academic backgrounds.</p>
            <ul>
              <li>Mathematics
                <ul>
                  <li>Basic Math</li>
                  <li>Algebra</li>
                  <li>Geometry</li>
                  <li>Calculus</li>
                  <li>Advanced Placement (AP) Math</li>
                </ul>
              </li>
              <li>Science
                <ul>
                  <li>General Science</li>
                  <li>Biology</li>
                  <li>Chemistry</li>
                  <li>Physics</li>
                  <li>Advanced Placement (AP) Science</li>
                </ul>
              </li>
              <li>English
                <ul>
                  <li>Reading Comprehension</li>
                  <li>Writing Skills</li>
                  <li>Literature Analysis</li>
                  <li>Grammar and Vocabulary</li>
                  <li>SAT/ACT Prep</li>
                </ul>
              </li>
            </ul>

            <h2>Batch Details</h2>
            <p>Batch Timings We offer flexible batch timings to accommodate the diverse schedules of our students. Each batch is designed to ensure personalized attention and effective learning.</p>
            <ul>
              <li>Morning Batch: 9:00 AM - 11:00 AM</li>
              <li>Afternoon Batch: 1:00 PM - 3:00 PM</li>
              <li>Evening Batch: 5:00 PM - 7:00 PM</li>
              <li>Weekend Batch: Saturday & Sunday: 10:00 AM - 1:00 PM</li>
            </ul>

            <h2>Student Enrolment</h2>
            <p>Enroll Now Join the community of achievers at our Tuition. Our enrollment process is simple and straightforward.</p>
            <ul>
              <li>Fill out the Enquiry Form.</li>
              <li>Attend a consultation with our admissions coordinator.</li>
              <li>Choose your preferred course and batch.</li>
              <li>Complete the enrollment paperwork.</li>
              <li>Start your journey to academic success!</li>
            </ul>

            <h2>Attendance Details</h2>
            <p>Attendance Tracking We maintain rigorous attendance records to ensure our students are consistently engaged and making progress.</p>
            <ul>
              <li>Regular attendance is mandatory.</li>
              <li>Parents will be notified of any absences.</li>
              <li>Make-up sessions are available for missed classes.</li>
            </ul>

            <h2>Payment Details</h2>
            <p>Payment Information We offer flexible payment options to suit your needs. Our fees are competitive and provide excellent value for the quality of education you receive.</p>
            <ul>
              <li>Payment Options:
                <ul>
                  <li>Monthly</li>
                  <li>Quarterly</li>
                  <li>Annually</li>
                </ul>
              </li>
              <li>Payment Methods:
                <ul>
                  <li>Credit/Debit Card</li>
                  <li>Bank Transfer</li>
                  <li>Cash</li>
                </ul>
              </li>
              <li>Discounts:
                <ul>
                  <li>Early Bird Discounts</li>
                  <li>Sibling Discounts</li>
                  <li>Referral Discounts</li>
                </ul>
              </li>
            </ul>

            <h2>Reports</h2>
            <p>Progress Reports We provide detailed progress reports to keep you informed about your academic performance and growth.</p>
            <ul>
              <li>Types of Reports:
                <ul>
                  <li>Monthly Performance Reports</li>
                  <li>Quarterly Progress Reports</li>
                  <li>Final Term Reports</li>
                </ul>
              </li>
              <li>Report Features:
                <ul>
                  <li>Academic Scores</li>
                  <li>Attendance Records</li>
                  <li>Teacher Feedback</li>
                  <li>Areas of Improvement</li>
                  <li>Achievements and Milestones</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </GlobalWrapper>
    );
  }
}

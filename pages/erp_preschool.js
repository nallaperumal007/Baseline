import React from "react";
import styles from "../styles/ERP/ERP.module.css";
import GlobalWrapper from "../components/globalWrapper/globalWrapper";

export default class Preschool extends React.Component {
  render() {
    return (
      <GlobalWrapper page={"preSchool"}>
        <div className={styles.container}>
          {/* <h1 className={styles.header}>Preschool & DayCare</h1> */}
          <div className={styles.content}>
            <img
              src="/assets/preschool3.jpg"
              alt="Event"
              className={styles.eventImage}
            />
            <div className={styles.text}>
              <p>
                Welcome to our Preschool and Daycare, where we provide a
                nurturing and stimulating environment for your child's early
                education and care. Our dedicated staff, enriching curriculum,
                and safe facilities ensure that your child's developmental
                journey is filled with joy, learning, and growth.
              </p>
            </div>
          </div>
          <div className={styles.additionalText}>
            <h2>Staff Details</h2>
            <h3>Our Dedicated Team</h3>
            <p>
              At Preschool and Daycare , our team is composed of passionate
              educators and caregivers who are committed to your child's
              well-being and development. Each member of our staff brings unique
              skills and a love for teaching and caring for young children.
            </p>
            <h3>Meet Our Team:</h3>
            <ul>
              <li>
                <b>Director:</b> With over 15 years of experience in early
                childhood education, Ms. Sarah leads our preschool with
                dedication and vision. She holds a Master’s degree in Early
                Childhood Education and believes in fostering a supportive and
                creative learning environment.
              </li>
              <li>
                <b>Lead Teacher, Kindergarten:</b> Mr. James has a Bachelor's
                degree in Education and specializes in kindergarten readiness.
                His engaging teaching methods and kind nature make learning fun
                and effective for our young students.
              </li>
              <li>
                <b>Daycare Coordinator:</b> Emily oversees our daycare program,
                ensuring a safe and nurturing environment for all children. She
                has a degree in Child Development and extensive experience in
                child care.
              </li>
              <li>
                <b>Assistant Teacher, Pre-K:</b> Olivia assists in our Pre-K
                classroom, bringing energy and creativity to her role. She is
                passionate about early literacy and arts education.
              </li>
            </ul>
            <h2>Student Details</h2>
            <h3>Our Students</h3>
            <p>
              We welcome children aged 6 months to 6 years, each bringing their
              own unique personalities and talents to our community. Our student
              body is diverse and inclusive, fostering an environment where
              every child feels valued and respected.
            </p>
            <h3>Programs Offered:</h3>
            <ul>
              <li>
                <b>Infants (6 months - 1 year)</b>
              </li>
              <li>
                <b>Toddlers (1 - 3 years)</b>
              </li>
              <li>
                <b>Preschool (3 - 4 years)</b>
              </li>
              <li>
                <b>Pre-Kindergarten (4 - 5 years)</b>
              </li>
              <li>
                <b>Kindergarten (5 - 6 years)</b>
              </li>
            </ul>
            <h2>Grade Details</h2>
            <h3>Our Curriculum</h3>
            <p>
              Our curriculum is designed to support the developmental milestones
              of each age group, emphasizing play-based learning and holistic
              development.
            </p>
            <h3>Grade Breakdown:</h3>
            <ul>
              <li>
                <b>Infants:</b> Focus on sensory activities, motor skills, and
                social interactions.
              </li>
              <li>
                <b>Toddlers:</b> Introduction to structured routines, language
                development, and basic math concepts through play.
              </li>
              <li>
                <b>Preschool:</b> Emphasis on literacy, early math skills,
                creative arts, and social development.
              </li>
              <li>
                <b>Pre-Kindergarten:</b> Preparation for kindergarten with a
                focus on reading readiness, foundational math, and science
                exploration.
              </li>
              <li>
                <b>Kindergarten:</b> Comprehensive learning in literacy,
                numeracy, social studies, science, and physical education.
              </li>
            </ul>
            <h2>Teacher Class Location</h2>
            <h3>Classroom Assignments</h3>
            <p>
              Our campus is thoughtfully designed to provide a conducive
              learning environment. Here are the classroom locations for each
              grade:
            </p>
            <ul>
              <li>
                <b>Infants:</b> Room A1, Ground Floor
              </li>
              <li>
                <b>Toddlers:</b> Room B1, Ground Floor
              </li>
              <li>
                <b>Preschool:</b> Room C1, First Floor
              </li>
              <li>
                <b>Pre-Kindergarten:</b> Room D1, First Floor
              </li>
              <li>
                <b>Kindergarten:</b> Room E1, Second Floor
              </li>
              <p>
                Each classroom is equipped with age-appropriate learning
                materials and safety features to ensure a secure and enriching
                experience.
              </p>
            </ul>
            <h2>Daycare Details</h2>
            <h3>Our Daycare Program</h3>
            <p>
              Our daycare program offers flexible scheduling options to
              accommodate the needs of busy families. We provide a safe, caring,
              and engaging environment where children can learn and play under
              the supervision of trained caregivers.
            </p>
            <h3>Features of Our Daycare:</h3>
            <ul>
              <li>
                <b>Operating Hours:</b> 7:00 AM - 6:00 PM, Monday to Friday
              </li>
              <li>
                <b>Activities:</b> Structured play, arts and crafts, music and
                movement, outdoor play, and quiet time
              </li>
              <li>
                <b>Meals:</b> Nutritious snacks and meals provided, catering to
                dietary needs
              </li>
              <li>
                <b>Security:</b> Secure entry systems and constant supervision
                to ensure safety
              </li>
            </ul>
            <h2>Payment Details</h2>
            <h3>Tuition and Fees</h3>
            <p>
              We offer competitive pricing with various payment options to suit
              different family budgets. Here are the details of our tuition and
              fees:
            </p>
            <h3>Tuition Rates:</h3>
            <ul>
              <li>
                <b>Infants:</b> ₹10,000 per month
              </li>
              <li>
                <b>Toddlers:</b> ₹8,500 per month
              </li>
              <li>
                <b>Preschool:</b> ₹7,500 per month
              </li>
              <li>
                <b>Pre-Kindergarten:</b> ₹7,500 per month
              </li>
              <li>
                <b>Kindergarten:</b> ₹8,000 per month
              </li>
            </ul>
            <h3>Payment Options:</h3>
            <ul>
              <li>Monthly, quarterly, and annual payment plans available</li>
              <li>Discounts for siblings and early payment</li>
              <li>Online payment portal for convenience</li>
            </ul>
            <h2>Report on Fee Report and Services</h2>
            <h3>Fee Report</h3>
            <p>
              Transparency is important to us, and we provide detailed fee
              reports to keep you informed about the financial aspects of our
              services. Our fee report includes:
            </p>
            <h3>Breakdown of Fees:</h3>
            <ul>
              <li>
                Detailed explanation of what the tuition covers (e.g., meals,
                activities, materials)
              </li>
              <li>
                Information on any additional costs (e.g., field trips, special
                programs)
              </li>
              <li>Accessible record of payments made and pending fees</li>
            </ul>
            <h3>Services Provided:</h3>
            <ul>
              <li>
                <b>Educational Programs:</b> Age-appropriate curriculum for all
                grades
              </li>
              <li>
                <b>Daycare Services:</b> Flexible and safe daycare options
              </li>
              <li>
                <b>Extracurricular Activities:</b> Art, music, physical
                education, and more
              </li>
              <li>
                <b>Parent-Teacher Communication:</b> Regular updates and
                meetings to discuss child's progress
              </li>
              <li>
                <b>Health and Safety:</b> Strict hygiene protocols and emergency
                preparedness
              </li>
            </ul>
            <h2>Contact Us</h2>
            <p>
              For more information or to schedule a visit, please contact us:
            </p>
            <ul>
              <li>
                <b>Address:</b> [Your Address]
              </li>
              <li>
                <b>Phone:</b> [Your Phone Number]
              </li>
              <li>
                <b>Email:</b> [Your Email Address]
              </li>
              <li>
                <b>Website:</b> [Your Website URL]
              </li>
            </ul>
            <p>
              We look forward to welcoming your family to Preschool and Daycare
              and being a part of your child's early educational journey.
            </p>
          </div>
        </div>
      </GlobalWrapper>
    );
  }
}

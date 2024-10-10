import React from "react";
import styles from "../styles/pages.module.css";
import SideMenu from "../components/sideMenu/sideMenu";
import Head from "../components/head";

export default class HrPolicies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToHolidayList: false,
        };
    }

    render() {
        return (
            <div>
                <SideMenu tag="sdlc" subTag="Hrpolicies">
                    <Head title="Holiday Details" />
                    <div >
                        
                            <p>I pledge to comply with the following HR policies to ensure a harmonious and efficient work environment:</p>
                            <div>
                            <p className={styles.paratitle}>1. Work Hours: </p>
                            
                            <p className={styles.paramargin}>At Finari, our operations are organized into three shifts:</p>
                        
                        <table className={`table ${styles.smallTable}`}>
                            <thead>
                                <tr>
                                    <th>Shift</th>
                                    <th>Timings</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Shift-1 (Morning Shift)</td>
                                    <td>7 AM to 4 PM</td>
                                </tr>
                                <tr>
                                    <td>Shift-2 (General Shift)</td>
                                    <td>9 AM to 6 PM</td>
                                </tr>
                                <tr>
                                    <td>Shift-3 (Afternoon Shift)</td>
                                    <td>2 PM to 11 PM</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className={styles.paratitle}>2. Other Details: </p>
                        <table className={`table ${styles.table1}`}>
                            <thead>
                                <tr>
                                    <th>Use Case-id</th>
                                    <th>Scenario</th>
                                    <th>Procedure to Follow</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>UC-1</td>
                                    <td>Request for Casual leave (Planned Leave)</td>
                                    <td className={styles.procedureCell}>1.	Send an email to hr@finari.com & CC reporting person at least 15 calendar days in advance and obtain approval from hr atleast 3 calendar days before the actual leave start date. <br/>
                                                                         2.	Microsoft (MS) meeting status as 'Out of Office' during the leave period, specifying the return date and indicating a designated point of contact in your absence.
</td>
                                </tr>
                                <tr>
                                    <td>UC-2</td>
                                    <td>Request for Sick leave</td>
                                    <td className={styles.procedureCell}>1.	Send an email to hr@finari.com and CC reporting person at least 2 hours before the start of your scheduled shift.<br/>
                                                                         2.	Microsoft (MS) meeting status as 'Out of Office' during the leave period, specifying the return date and indicating a designated point of contact in your absence.

</td>
                                </tr>
                                <tr>
                                    <td>UC-3</td>
                                    <td>Request for Compensatory Time Off (Comp-Off)</td>
                                    <td className={styles.procedureCell}>1.	For instance, I would like to work on non-working day (16th Dec 2023). I need to get a HR approval 1 day prior to the 16th Dec 2023. <br/>
                                                                         2.	I will fill the timesheet for 16th Dec 2023 on the tasks I worked.<br/>
                                                                         3.	I would like to avail comp-off leave on working day (26th Dec 2023). In this case, I need to send an email to hr@finari.com & CC reporting person at least 5 working days in advance, and obtain approval from HR. I will fill the timesheet for 26th Dec as Comp-Off Leave.<br/>
                                                                         4.	Microsoft (MS) meeting status as 'Out of Office' during the leave period, specifying the return date and indicating a designated point of contact in your absence<br/>

</td>
                                </tr>
                                <tr>
                                    <td>UC-4</td>
                                    <td>Request for Work from Home (WFH)</td>
                                    <td className={styles.procedureCell}>Obtain approval from HR by sending an email at least 1 working day prior to the planned remote workday.<br/>
</td>
                                </tr>
                                <tr>
                                    <td>UC-5</td>
                                    <td>Arriving late to the office</td>
                                    <td className={styles.procedureCell}>Send a message to the Finari group chat on WhatsApp atleast 1 hour before the start of your scheduled shift.<br/>
</td>
                                </tr>
                                <tr>
                                    <td>UC-6</td>
                                    <td>Requesting a 1-hour Permission</td>
                                    <td className={styles.procedureCell}>Send an email to hr@finari.com. CC reporting person, submit the request for a one hour permission.<br/>
</td>
                                </tr>
                                <tr>
                                    <td>UC-7</td>
                                    <td>Request for permission exceeding 1 hour</td>
                                    <td className={styles.procedureCell}>Send an email to hr@finari.com. CC reporting person, submit the request for a half-day leave (Casual / Sick).<br/>
</td>
                                </tr>
                                <tr>
                                    <td>UC-8</td>
                                    <td>Awaiting your email response</td>
                                    <td className={styles.procedureCell}>Emails are expected to be responded within the same day by end of the shift. <br/>
</td>
                                </tr>
                                <tr>
                                    <td>UC-9</td>
                                    <td>Attending a Meeting</td>
                                    <td className={styles.procedureCell}>Prepare discussion notes for a meeting prior to the scheduled time and attend 5 minutes before the meeting commences.<br/>
</td>
                                </tr>
                                <tr>
                                    <td>UC-10</td>
                                    <td>Raising a Meeting Invite</td>
                                    <td className={styles.procedureCell}>1.	Before raising a meeting invite, I will ensure the participants’ calendar is free for the planned timings.<br/>
                                                                         2.	In the meeting invite, I will highlight the agenda in detail.<br/>
                                                                         3.	Before sending invite, I will ensure the meeting bridge details are captured currently in the invite.<br/>  

</td>
                                </tr>
                                <tr>
                                    <td>UC-11</td>
                                    <td>Changes in my address, phone number & other relevant updates.</td>
                                    <td className={styles.procedureCell}>Send an email to hr@finari.com on the changes as soon as possible.<br/> 
</td>
                                </tr>
                                <tr>
                                    <td>UC-12</td>
                                    <td>Relocating IN / OUT Chennai</td>
                                    <td className={styles.procedureCell}>Send an email to hr@finari.com and CC reporting person.<br/> 
</td>
                                </tr>
                                <tr>
                                    <td>UC-13</td>
                                    <td>1 Page CV updates</td>
                                    <td className={styles.procedureCell}>Update the CV and submit to hr@finari.com on or before 3rd working day of every month.Update the CV and submit to hr@finari.com on or before 3rd working day of every month.<br/> 
</td>
                                </tr>
                                <tr>
                                    <td>UC-14</td>
                                    <td>Lessons Learned documentation</td>
                                    <td className={styles.procedureCell}>1.	I understand lessons learned documentation is going to help both myself and my organization. I will record it for all the tasks I work on it.<br/> 
                                                                         2.	Along with lessons learned I will document best approach to complete similar task next in short time and with quality.<br/> 

</td>
                                </tr>
                                <tr>
                                    <td>UC-15</td>
                                    <td>Completion of tasks on time and quality</td>
                                    <td className={styles.procedureCell}>       <br/>
</td>
                                </tr>
                            </tbody>
                        </table>
                        <p className={styles.paratitle}>3. Timesheet: </p>
                                <table className={`table ${styles.smallTable}`}>
                            <thead>
                                <tr>
                                    <th>Usecase-id </th>
                                    <th>Scenario</th>
                                    <th>Task ID</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>US_1</td>
                                    <td>Permission for 1 hr</td>
                                    <td>2513</td>
                                </tr>
                                <tr>
                                    <td>US_2</td>
                                    <td>Casual Leave</td>
                                    <td>2512</td>
                                </tr>
                                <tr>
                                    <td>US_3</td>
                                    <td>Sick Leave</td>
                                    <td>2511</td>
                                </tr>
                                <tr>
                                    <td>US_4</td>
                                    <td>Comp-Off Leave</td>
                                    <td>2514</td>
                                </tr>
                                <tr>
                                    <td>US_5</td>
                                    <td>Public Holiday</td>
                                    <td>2518</td>
                                </tr>
                                <tr>
                                    <td>US_6</td>
                                    <td>Loss Of Pay (LOP)</td>
                                    <td>2516</td>
                                </tr>
                                
                            </tbody>
                        </table>
                        <p className={styles.paratitle}>4.  Project Relocation: </p>
                        <p className={styles.paramargin}>In cases of assigned projects requiring relocation, I will fulfil project responsibilities and prioritize maintaining a healthy lifestyle.</p>
                        <p className={styles.paratitle}>5.  Timesheet Management: </p>
                        <p className={styles.paramargin}>a.	Before start working on a task, I will ensure it is present in ERP and assigned to me.<br/>
                           b.	I am responsible to fill the timesheet on a daily basis on or before 5:45pm.<br/>
                           c.	I will log my daily timesheet for a standard 8-hour workday.<br/>
</p>
                        <p className={styles.paratitle}>6.	Accessing Servers:</p>
                        <p className={styles.paramargin}>I understand that accessing production servers without manager approval is considered a severe data breach (sev-1) and can lead to immediate termination of employment.</p><br/><br/>
                        <p>I have read the policy details explained above and I hereby confirm that I will adhere to them. I am aware that if there is any breach then it will have its own consequences.</p><br/>
                        <p>By adhering to these policies, I actively contribute to fostering a productive and well-organized work environment within the organization.</p><br/>
                        </div>
                    </div>
                </SideMenu>
            </div>
        );
    }
}


// this source generated by GenAI v2.9.4 
import React from "react";

import styles from "../../styles/createcom.module.css";
import Audit_helper from "../../helper/pfmMgmt/pfOrdM1Expense";
import moment from "moment";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default class pfOrdM1ExpenseAudit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
      l_display_summary: " ",
      username: null,
      tnnt_id: null,
      auditData: [],
    };
  }

  componentDidMount() {
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }
    this.getAuditData();
  }

  getAuditData = () => {
    const { data } = this.props;
    const filter = { ref_id: data };

    Audit_helper.getAuditData(filter)
      .then((result) => {
        console.log("result: ", result);
        this.setState({ auditData: result });
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  render() {
    const { is_loading, auditData } = this.state;
    const { setVisibility } = this.props;
    let l_display_summary = "";
    return (
      <div className={styles.mainWrapper}>
        {is_loading && (
          <div className={"loadingWrapper"}>
            <div className={"innerLoadingWrapper"}>
              <div class="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div className={styles.contentWrapper}>
            <p className={styles.title}>Timeline</p>
            <VerticalTimeline lineColor="white">
              {auditData.map((data, index) => {
                l_display_summary=""
                            if (data.id_old !== data.id_new){
                 l_display_summary += "ID" + " is changed from " + data.id_old+ " to: "+ data.id_new + " "   ;
               }
            if (data.ord_id_old !== data.ord_id_new){
                 l_display_summary += "Order ID" + " is changed from " + data.ord_id_old+ " to: "+ data.ord_id_new + " "   ;
               }
            if (data.charge_type_id_old !== data.charge_type_id_new){
                 l_display_summary += "charge Type" + " is changed from " + data.charge_type_id_old+ " to: "+ data.charge_type_id_new + " "   ;
               }
            if (data.ord_amt_old !== data.ord_amt_new){
                 l_display_summary += "Amount" + " is changed from " + data.ord_amt_old+ " to: "+ data.ord_amt_new + " "   ;
               }
            if (data.ord_billability_id_old !== data.ord_billability_id_new){
                 l_display_summary += "Billability" + " is changed from " + data.ord_billability_id_old+ " to: "+ data.ord_billability_id_new + " "   ;
               }
            if (data.ord_attachment_old !== data.ord_attachment_new){
                 l_display_summary += "Attachment" + " is changed from " + data.ord_attachment_old+ " to: "+ data.ord_attachment_new + " "   ;
               }
            if (data.lc_status_id_old !== data.lc_status_id_new){
                 l_display_summary += "Record Status " + " is changed from " + data.lc_status_id_old+ " to: "+ data.lc_status_id_new + " "   ;
               }
            if (data.is_active_old !== data.is_active_new){
                 l_display_summary += "Is Active" + " is changed from " + data.is_active_old+ " to: "+ data.is_active_new + " "   ;
               }
            if (data.created_at_old !== data.created_at_new){
                 l_display_summary += "Created At" + " is changed from " + data.created_at_old+ " to: "+ data.created_at_new + " "   ;
               }
            if (data.created_by_old !== data.created_by_new){
                 l_display_summary += "Created By" + " is changed from " + data.created_by_old+ " to: "+ data.created_by_new + " "   ;
               }
            if (data.tnnt_id_old !== data.tnnt_id_new){
                 l_display_summary += "Tnnt ID" + " is changed from " + data.tnnt_id_old+ " to: "+ data.tnnt_id_new + " "   ;
               }

                return (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    contentStyle={{
                      background: "rgb(33, 150, 243)",
                      color: "#fff",
                    }}
                    contentArrowStyle={{
                      borderRight: "7px solid  rgb(33, 150, 243)",
                    }}
                    date={moment(data.created_at_new).format("LLL")}
                    dateClassName={styles.timelineDate}
                    icon={index + 1}
                    iconClassName={styles.timelineIcon}
                  >
                    <h5>Created By: {data.created_by_new}</h5>
                    <p>Summary: {l_display_summary}</p>
                  </VerticalTimelineElement>
                );
              })}
            </VerticalTimeline>
          </div>
        </div>
      </div>
    );
  }
}

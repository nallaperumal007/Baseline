
// this source generated by GenAI v2.9.4 
import React from "react";

import styles from "../../styles/createcom.module.css";
import Audit_helper from "../../helper/pfmMgmt/pfEventDet";
import moment from "moment";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default class pfEventDetAudit extends React.Component {
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
            if (data.clt_ref_id_old !== data.clt_ref_id_new){
                 l_display_summary += "Client Reference ID" + " is changed from " + data.clt_ref_id_old+ " to: "+ data.clt_ref_id_new + " "   ;
               }
            if (data.event_descr_old !== data.event_descr_new){
                 l_display_summary += "Event Description" + " is changed from " + data.event_descr_old+ " to: "+ data.event_descr_new + " "   ;
               }
            if (data.com_id_old !== data.com_id_new){
                 l_display_summary += "Component ID" + " is changed from " + data.com_id_old+ " to: "+ data.com_id_new + " "   ;
               }
            if (data.channel_notif_old !== data.channel_notif_new){
                 l_display_summary += "Channel Notification" + " is changed from " + data.channel_notif_old+ " to: "+ data.channel_notif_new + " "   ;
               }
            if (data.channel_notif_msg_old !== data.channel_notif_msg_new){
                 l_display_summary += "Notification Message" + " is changed from " + data.channel_notif_msg_old+ " to: "+ data.channel_notif_msg_new + " "   ;
               }
            if (data.channel_email_old !== data.channel_email_new){
                 l_display_summary += "Channel Email" + " is changed from " + data.channel_email_old+ " to: "+ data.channel_email_new + " "   ;
               }
            if (data.channel_email_templ_old !== data.channel_email_templ_new){
                 l_display_summary += "Email Template" + " is changed from " + data.channel_email_templ_old+ " to: "+ data.channel_email_templ_new + " "   ;
               }
            if (data.channel_wapp_old !== data.channel_wapp_new){
                 l_display_summary += "Channel Whatsapp" + " is changed from " + data.channel_wapp_old+ " to: "+ data.channel_wapp_new + " "   ;
               }
            if (data.channel_wapp_msg_old !== data.channel_wapp_msg_new){
                 l_display_summary += "Whats App Message" + " is changed from " + data.channel_wapp_msg_old+ " to: "+ data.channel_wapp_msg_new + " "   ;
               }
            if (data.channel_push_notif_old !== data.channel_push_notif_new){
                 l_display_summary += "Push Notification" + " is changed from " + data.channel_push_notif_old+ " to: "+ data.channel_push_notif_new + " "   ;
               }
            if (data.channel_push_msg_old !== data.channel_push_msg_new){
                 l_display_summary += "Push Notif Message" + " is changed from " + data.channel_push_msg_old+ " to: "+ data.channel_push_msg_new + " "   ;
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

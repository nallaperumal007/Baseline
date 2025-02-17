import React from "react";

import styles from "../../styles/createcom.module.css";
import PfCSHelper from "../../helper/emMgmt/emCltDet";
import moment from "moment";

import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";

export default class PfCSTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_loading: false,
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

    PfCSHelper.getAuditData(filter)
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
                    <p>Summary: {data.descr_new}</p>
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

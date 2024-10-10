import React from "react";
import SideMenu from "../components/sideMenu/sideMenu";
import styles from "../styles/libTlHome.module.css";
import Component3 from "../components/dashboard/portletCalendar";
import libStatusDash from "../helper/libstatusDash"; 
import CalEvent from "../components/pfmMgmt/pfCalendarEvents"; 
import Portlet50 from "../components/dashboard/portlet50";
import Portlet49 from "../components/dashboard/portlet49";
import PortLibStock from "../components/dashboard/portLibStockSt";
import PortleLibConst from "../components/dashboard/portLibStockConst";
import PortLibCost from "../components/dashboard/portLibStockCostDet";


export default class libHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderStatus: [],
      orderType: [],
      error: null,
      previewVisibility: false,
      tnnt_id: global.config.tnnt_id,
    };
  }

  componentDidMount() {
    Promise.all([
      libStatusDash.getOrderStatus(),
      libStatusDash.getOrderType(),
    ])
      .then(([orderStatusData, orderTypeData]) => {
        this.setState({
          orderStatus: orderStatusData,
          orderType: orderTypeData,
        });
      })
      .catch((error) => {
        this.setState({ error: error.message });
      });
  }

  
  render() {
    const { 
            orderStatus,
            orderType,
            error,
            selectedData,
            editable,
            previewVisibility, } = this.state;


    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <SideMenu>
        <div className={styles.row}>
          <div className={styles.Portlet1}>
            <div className={styles.wrapper}>
                <Portlet50 />
            </div>
          </div>
          <div className={styles.Portlet1}>
            <div className={styles.wrapper}>
              <Portlet49 />
            </div>
          </div>
          <div className={styles.Portlet1}>
            <Component3 />
            <div className={styles.button_add_event}>
                        <button onClick={() =>
                                this.setState({
                                    previewVisibility: true,

                                })
                                }>Add Event</button>
                    </div>

          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.Portlet1}>
            <div className={styles.wrapper}>
                <PortLibStock />
            </div>
          </div>
          <div className={styles.Portlet1}>
            <div className={styles.wrapper}>
              <PortleLibConst />
            </div>
          </div>
          <div className={styles.Portlet1}>
            <div className={styles.wrapper}>
              <PortLibCost />
            </div>
          </div>
        </div>

        
    {previewVisibility && (
      <CalEvent
        visibility={previewVisibility}
        setVisibility={(v) => this.setState({ previewVisibility: v })}
        data={selectedData}
        editable={editable}
        getData={() => this.getData()}
      />
    )}
        <br />
        <br />
      </SideMenu>
    );
  }
}


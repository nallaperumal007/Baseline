import React from "react";
import styles from "../../styles/createcom.module.css";
import PfDashboardHelper from "../../helper/pfmMgmt/pfDashboard";

export default class portlet47 extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      portlet1: [],
      is_active: true,
      id: "",
    };
    this.state = {
        ...stateData,
    };
  }

  componentDidMount() {
    const { editable } = this.state;
    const username = global.localStorage.username;
 
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
      });
    }
    this.getAcCategory();
  }
 

  getAcCategory() {
    const {
        tnnt_id,
    } = this.state;

    const filter = {
        tnnt_id: tnnt_id,
    };
    PfDashboardHelper.getPortlet1(filter)
        .then((data) => {
            this.setState({ portlet1: data });
        })
        .catch((err) => {
            console.log(err);
        });
}

  render() {
    const {      
        portlet1,
    } = this.state;

    return (
        <div>
                <div className={styles.wrapper}>
                    <table className={`table ${styles.table}`}>
                        <thead>
                            <tr>
                                <th>Employment Type</th>
                                <th>Head Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portlet1
                                 .map((t) => (  
                                     <tr> 
                                         <td>{t.Employment_Type}</td> 
                                         <td>{t.Head_Count}</td>             
                                     </tr> 
                                  ))}  
                        </tbody>
                    </table>
                </div>
        </div>
    );
}
}

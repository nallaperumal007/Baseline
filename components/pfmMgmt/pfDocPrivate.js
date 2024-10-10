import React from "react";
import styles from "../../styles/createcom.module.css";

export default class PrivateContent extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      content: props.content.page_content_intern,
      usecase_name: props.content.usecase_name,
    };
    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {}

  render() {
    const { content } = this.state; // Include totalCount in destructure

    return (
      <div style={{ paddingTop: 20 }}>
        <div className={styles.containerBorder}>
          <p className={styles.title}>{"Developer Content"}</p>
          <div
            dangerouslySetInnerHTML={{
              __html: content
            }}
          />
        </div>
      </div>
    );
  }
}

import React from "react";
import styles from "../../styles/createcom.module.css";

export default class PublicContent extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      public_content: props.content.page_content_public,
      usecase_name: props.content.usecase_name,
    };
    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {}

  render() {
    const { public_content, usecase_name } = this.state; // Include totalCount in destructure

    return (
      <div>
        <div className={styles.containerBorder}>
            <p className={styles.title}>{usecase_name}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: public_content
              }}
              id="preview-element"
            />
        </div>
      </div>
    );
  }
}

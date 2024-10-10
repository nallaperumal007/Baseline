import React from "react";
import styles from "./documentModal.module.css";
import dynamic from "next/dynamic";
const FileViewer = dynamic(() => import("react-file-viewer"), { ssr: false });


export default class DocumentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file_type: this.props.file_name.split(".").pop(),
      document_name: this.props.document_name,
    };
  }

  componentDidMount() {}
  

  render() {
    const { file_type, document_name } = this.state;

    return (
      <div className={styles.mainWrapper}>
        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            alt="Close Icon"
            className={styles.closeButton}
            onClick={() => this.props.setVisibility(false)}
          />

          <p className={styles.title}>{document_name == undefined ? "Document": document_name}</p>
          {this.props.data == undefined ? (
            <div>
              <img src="\assets\nopreview.png" />
            </div>
          ) : (
            <div className={styles.documentView}>
              {file_type == "mp4" ? (
                <div>
                  <video controls width="100%" height="500">
                    <source src={this.props.data} type="video/mp4" />
                  </video>
                </div>
              ) : file_type == "html" ? (
                <div className={styles.htmlAlignment}>
                <div
                  // style={{ whiteSpace: "pre-wrap" }}
                  dangerouslySetInnerHTML={{
                    __html: this.props.data.data.replace(
                      /contenteditable="plaintext-only"/g,
                      ""
                    ),
                  }}
                  id="preview-element"
                  // dangerouslySetInnerHTML={{ __html: file_document_view }}
                />
                </div>
              ) : (
                <div className={styles.pdfAlignment}>
                <FileViewer
                  fileType={file_type}
                  filePath={this.props.data}
                  onError={(e) => console.log("Error:", e)}
                />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

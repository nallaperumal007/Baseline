// this source generated by GenAI v2.9.4 
import React from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfDocMainDet";
import FileHelper from "../../helper/files";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export default class PfDocMainDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id: 2,
      is_active: true,
      id: "",
      int_module_id: "",
      text_usecase_name: "",
      text_page_content_public: "",
      text_page_content_intern: "",
      editorStatePublic: EditorState.createEmpty(),
      editorStateIntern: EditorState.createEmpty(),
			uploadedImages: [],
    };
		this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
		this.filesData = {};

    if (props.data !== undefined) {
      stateData.editable = props.editable;
      stateData.id = props.data;
    }

    this.state = {
      ...stateData,
    };
  }
  componentDidMount() {
    const { editable, text_page_content_public, text_page_content_intern } = this.state;
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }

    editable !== undefined && this.getRecord();
  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    SampleHelper.getRecord(filter)
      .then((data) => {
        this.setState({
          // update the state of the component
          int_module_id: data[0].module_id,
          text_usecase_name: data[0].usecase_name,
          text_page_content_public: data[0].page_content_public,
          text_page_content_intern: data[0].page_content_intern,
          is_active: data[0].is_active == "active" ? true : false,
        });

        if (data[0].page_content_public !== undefined && data[0].page_content_public !== "") {
          const htmlToDraft = require("html-to-draftjs").default;
          const contentBlock = htmlToDraft(data[0].page_content_public);
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
              contentBlock.contentBlocks
            );
            this.setState({
              editorStatePublic: EditorState.createWithContent(contentState),
            });
          }
        }

        if (data[0].page_content_intern !== undefined && data[0].page_content_intern !== "") {
          const htmlToDraft = require("html-to-draftjs").default;
          const contentBlock = htmlToDraft(data[0].page_content_intern);
          if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(
              contentBlock.contentBlocks
            );
            this.setState({
              editorStateIntern: EditorState.createWithContent(contentState),
            });
          }
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

  async insertRecord() {
    const {
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      int_module_id,
      text_usecase_name,
      text_page_content_public,
      text_page_content_intern,
      editorStatePublic,
      editorStateIntern,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (int_module_id === undefined) {
        alertText += ".Module Name\n ";
      }
      if (text_usecase_name === "") {
        alertText += ".Usecase Name\n ";
      }



      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html:
            '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
            alertText +
            "</pre>",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      const data = {
        // task_3 : add more properties to data

        module_id: int_module_id,
        usecase_name: text_usecase_name,
        page_content_public: draftToHtml(
          convertToRaw(editorStatePublic.getCurrentContent())
        ),
        page_content_intern: draftToHtml(
          convertToRaw(editorStateIntern.getCurrentContent())
        ),
        // lc_status_id: 1,
        created_by: username,
        tnnt_id: tnnt_id,
      };

      console.log(data)

      this.setState({ is_loading: true });
      SampleHelper.insertRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + data.id + " created successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: false });
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
            allowOutsideClick: false,
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async updateRecord() {
    const {
      id,
      is_active,
      tnnt_id,
      username,
      // task_2 : all declared variable add here

      int_module_id,
      text_usecase_name,
      text_page_content_public,
      text_page_content_intern,
      editorStatePublic,
      editorStateIntern,


    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      if (int_module_id === undefined) {
        alertText += ".Module Name\n ";
      }
      if (text_usecase_name === "") {
        alertText += ".Usecase Name\n ";
      }



      if (alertText !== alertInitial) {
        Swal.fire({
          title: "Fill these fields:\n",
          html:
            '<pre style="display: flex;text-align: justify;flex-direction: column;align-items: center;line-height: 1.5">' +
            alertText +
            "</pre>",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      const data = {
        id: id,
        // task_3 : add more properties to data

        module_id: int_module_id,
        usecase_name: text_usecase_name,
        page_content_public: draftToHtml(
          convertToRaw(editorStatePublic.getCurrentContent())
        ),
        page_content_intern: draftToHtml(
          convertToRaw(editorStateIntern.getCurrentContent())
        ),
        // lc_status_id: 1,
        is_active: is_active == false ? "inactive" : "active",
        created_by: username,
        tnnt_id: tnnt_id,
      };

      this.setState({ is_loading: true });
      SampleHelper.updateRecord(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + id + " updated successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: true });
          } else if (data.code === 101) {
            Swal.fire({
              text: "Error",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          } else {
            Swal.fire({
              text: data.msg,
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        })
        .catch((err) => {
          Swal.fire({
            text: err,
            confirmButtonColor: Colors.red,
            width: Colors.width,
            allowOutsideClick: false,
          });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  onEditorStateChangePublic = (editorState) => {
    this.setState({
      editorStatePublic: editorState,
    });
  };

  onEditorStateChangeIntern = (editorState) => {
    this.setState({
      editorStateIntern: editorState,
    });
  };

  async uploadImageCallBack(file) {
  if (file && file instanceof File) {
    const result = await FileHelper.upload(file, file.name, "docm", 'open');
    const res = result.data;
    if (result.code === 200) {
      console.log(res)
      this.filesData["image1"] = res;
    } else {
      Swal.fire({
        text: "Failed to upload Image",
        confirmButtonColor: Colors.red,
        width: Colors.width,
        allowOutsideClick: false,
      });
      this.setState({ is_loading: false });
    }
  }

		let uploadedImages = this.state.uploadedImages;

		const imageObject = {
			file: file,
			localSrc: this.filesData["image1"],
		}

		uploadedImages.push(imageObject);

		this.setState({ uploadedImages: uploadedImages })
		return new Promise(
			(resolve, reject) => {
				resolve({ data: { link: imageObject.localSrc } });
			}
		);
	}

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
      is_active,
      // task_2 : all declared variable add here

      int_module_id,
      text_usecase_name,
      text_page_content_public,
      text_page_content_intern,
      editorStatePublic,
      editorStateIntern,
    } = this.state;

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

        <div className={styles.wrapperPayment} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div>
            <p className={styles.title}>
              {editable == undefined ? "Create Record" : editable ? "Update Record" : "View Record"}
            </p>
            {/*// task_4 : build logic per column and specific to data type.*/}
            <div className={styles.sideWrapper}>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Module Name:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                    *
                  </span>
                  </p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="number"
                        value={int_module_id}
                        onChange={(e) =>
                          this.setState({
                            int_module_id: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{int_module_id}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Usecase Name:<span
                    style={{ color: "red", marginLeft: "3px", fontSize: "20px" }} >
                    *
                  </span>
                  </p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="text"
                        value={text_usecase_name}
                        onChange={(e) =>
                          this.setState({
                            text_usecase_name: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{text_usecase_name}</p>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Page Content Public:
                  </p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <div style={{ border: "1px solid rgb(201, 201, 201)", marginLeft: 10 }}>
                        <Editor
                          editorState={editorStatePublic}
                          editorStyle={{
                            paddingLeft: 10,
                            paddingRight: 20,
                          }}
                          toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history', 'image'],
                            image: {
                              uploadCallback: this.uploadImageCallBack,
                              urlEnabled: true,
                              uploadEnabled: true,
                              alignmentEnabled: true,
                              previewImage: true,
                              inputAccept:
                                "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                              defaultSize: {
                                width: "50%",
                              },
                            },
                          }}
                          onEditorStateChange={this.onEditorStateChangePublic}
                          placeholder="Enter Content"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: text_page_content_public }} />
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Page Content Internal:
                  </p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <div style={{ border: "1px solid rgb(201, 201, 201)", marginLeft: 10 }}>
                        <Editor
                          editorState={editorStateIntern}
                          editorStyle={{
                            paddingLeft: 10,
                            paddingRight: 20,
                          }}
                          toolbar={{
                            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'remove', 'history', 'image'],
                            image: {
                              uploadCallback: this.uploadImageCallBack,
                              urlEnabled: true,
                              uploadEnabled: true,
                              alignmentEnabled: true,
                              previewImage: true,
                              inputAccept:
                                "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                              defaultSize: {
                                width: "50%",
                              },
                            },
                          }}
                          onEditorStateChange={this.onEditorStateChangeIntern}
                          placeholder="Enter Content"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <div style={{ textAlign: "justify" }} dangerouslySetInnerHTML={{ __html: text_page_content_intern }} />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.inputAlignment}>
              <p className={`mandatory`}><span style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>* are mandatory fields</span></p>
            </div>
            <div
              className={styles.inputAlignment}
              style={{
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              {editable !== undefined && (
                <div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={is_active}
                      onChange={(e) =>
                        this.setState({
                          is_active: e.target.checked,
                        })
                      }
                      disabled={editable == false}
                    />
                    <span className="slider round"></span>
                  </label>
                  <p className={styles.statusText}>
                    {is_active ? "Active" : "Inactive"}
                  </p>
                </div>
              )}
            </div>
            {editable != false && (
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() =>
                    editable == undefined
                      ? this.insertRecord()
                      : editable && this.updateRecord()
                  }
                >
                  {editable == undefined ? "Create" : editable && "Update"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
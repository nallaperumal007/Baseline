import React from "react";
import styles from "./pfMgmt.module.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import CustomInput from "../customInput/customInput";
import PfNotifEmailHelper from "../../helper/pfmMgmt/pfNotifEmail";
import PfEmailTemplateHelper from "../../helper/pfmMgmt/pfNotifEmailTemplate";
import FilesHelper from "../../helper/files";
import DdValues from "../../helper/comm/commDdLookup";
import PaTenantHelper from "../../helper/pa/paTenantDet";
import PfWfdHelper from "../../helper/pfmMgmt/pfWFDet";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PfUserActivityDet from "../../helper/pfmMgmt/pfUserActivityDet";


export default class EmailNotifiModal extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      role_id: global.config.user_role,
      editable: undefined,
      editableOrder: false,
      id: "",
      num_from_id: "",
      num_to_id: undefined,
      num_event_id: "",
      num_template_id: "",
      num_status_id: "",
      email_subject: "",
      email_content: "",
      email_attachment1: "",
      email_attachment2: "",
      is_loading: false,
      selectedData: undefined,
      file_document_view: undefined,
      arr_template: [],
      id_selectedTemplate: undefined,
      com_id: 78,
      is_active: true,
      arr_sendTo: [
        {
          id: 1,
          title: "Individual",
          value: "Individual",
        },
        {
          id: 2,
          title: "Collection",
          value: "Collection",
        }
      ],
      id_selectedSendTo: undefined,
      arr_funcName: [],
      arr_sendAt: [
        {
          id: 1,
          title: "Now",
          value: "Now",
        },
        {
          id: 2,
          title: "Later",
          value: "Later",
        }
      ],
      id_selectedSendAt: 1,
      sentOn_date: new Date(),
      sentOn_time: "",
      arr_emailId: [],
      id_selectedVerify: undefined,
      arr_verify: [],
      num_old_wfs: 1,
      access_role_user: global.config.access_role_list,
      bl_role_user: "",
      editableOrder: false,
    };
    if (props.data !== undefined) {
      stateData.editable = props.editable;
      stateData.editableOrder = props.editableOrder;
      stateData.id = props.data;
    }

    this.state = {
      ...stateData,
    };

    this.filesData = {};
  }
  componentDidMount() {
    const { editable, editableOrder, num_old_wfs } = this.state;
    const username = global.localStorage.username;
    const ms_id = "1";
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
      });
    }

    this.getDropdown();
    this.getDdFunction();
    this.getEmailId();
    editable !== undefined && this.getRecord();

    editable == undefined && this.getWfa(num_old_wfs);
    (editableOrder || editable) && this.getOrderTranst();
    const user_name = global.config.username;
    const created_by = username;
    const tnnt_id = global.config.tnnt_id;
    PfUserActivityDet.insertRecord({ user_name, ms_id, created_by, tnnt_id })
      .then((response) => {
        // Handle success response
        console.log("Data inserted successfully:", response);
      })
      .catch((error) => {
        console.error("Error inserting data:", error);
      });

  }

  getRecord() {
    const { id, tnnt_id, editableOrder } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };

    if (editableOrder == true) {
      PfNotifEmailHelper.getRecordForOrder(filter)
        .then((data) => {

          this.setState({
            email_attachment1: data[0].email_attachment1,
            email_attachment2: data[0].email_attachment2,
            email_content: data[0].email_content,
            email_subject: data[0].email_subject,
            id_selectedTemplate: data[0].template_id,
            num_template_id: data[0].template_id,
            num_from_id: data[0].from_id,
            num_to_id: data[0].to_id,
            num_event_id: data[0].evt_id,
            num_status_id: data[0].status_id,
            is_active: data[0].is_active == "active" ? true : false,
          num_old_wfs: data[0].next_wfs_id,
            // sentOn_date: data[0].sched_date,
            // sentOn_time: data[0].sched_time,
          });

          FilesHelper.getFile(data[0].email_content)
            .then((htmlContent) => {
              const tags = data[0];
              const replacedHtml = htmlContent.data.replace(/\{\{tag_(\d+)\}\}/g, (match, tagNumber) => {
                const tagName = `tag_${tagNumber}`;
                const tagValue = tags[tagName] || '';
                return tagValue;
              });
              this.setState({ file_document_view: replacedHtml });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {

      PfNotifEmailHelper.getRecord(filter)
        .then((data) => {

          this.setState({
            email_attachment1: data[0].email_attachment1,
            email_attachment2: data[0].email_attachment2,
            email_content: data[0].email_content,
            email_subject: data[0].email_subject,
            id_selectedTemplate: data[0].template_id,
            num_template_id: data[0].template_id,
            num_from_id: data[0].from_id,
            num_to_id: data[0].to_id,
            num_event_id: data[0].evt_id,
            num_status_id: data[0].status_id,
            is_active: data[0].is_active == "active" ? true : false,
          num_old_wfs: data[0].next_wfs_id,
          // sentOn_date: data[0].sched_date,
            // sentOn_time: data[0].sched_time,
          });

          FilesHelper.getFile(data[0].email_content)
            .then((htmlContent) => {
              const tags = data[0];
              const replacedHtml = htmlContent.data.replace(/\{\{tag_(\d+)\}\}/g, (match, tagNumber) => {
                const tagName = `tag_${tagNumber}`;
                const tagValue = tags[tagName] || '';
                return tagValue;
              });
              this.setState({ file_document_view: replacedHtml });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getDropdown() {
    const { tnnt_id, editable } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: editable === true ? undefined : "active",
    };

    PfEmailTemplateHelper.getFilteredData(filter)
      .then((data) => {

        this.setState({ arr_template: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDdFunction() {
    const {
      tnnt_id,
    } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
    };

    DdValues.getCollectDet(filter)
      .then((data) => {
        this.setState({ arr_funcName: data });
      })
      .catch((err) => {
        console.log(err);
      });

    DdValues.getEmailId(filter)
      .then((data) => {
        this.setState({ arr_emailId: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getEmailId() {
    const { tnnt_id } = this.state;

    const filter = {
      id: tnnt_id,
    };

    PaTenantHelper.getEmail(filter)
      .then((data) => {
        this.setState({ num_from_id: data[0].email_from_id });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getWfa(num_old_wfs) {
    const { com_id, tnnt_id, access_role_user, stateData } = this.state;

    const filter = {
      com_id: com_id,
      tnnt_id: tnnt_id,
      old_wfs_id: num_old_wfs,
      is_active: "active",
    };

    PfWfdHelper.getWfa(filter)
      .then((data) => {
        const access_role_list = data[0].access_role_users_list;
        // const role_id = parseInt(access_role_user);
        const role_id = access_role_user.split(";").map((id) => parseInt(id));
        const roleIds = access_role_list.split(";").map((id) => parseInt(id));
        // const isRoleAllowed = roleIds.includes(role_id);
        const isRoleAllowed = role_id.some((id) => roleIds.includes(id));

        this.setState({
          arr_verify: data,
          bl_role_user: isRoleAllowed,
          id_selectedVerify: num_old_wfs == 1 ? data[0].next_wfs_id : undefined,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getOrderTranst() {
    const { id, tnnt_id, com_id, num_old_wfs } = this.state;

    const filter = {
      rec_id: id,
      tnnt_id: tnnt_id,
      com_id: com_id,
      is_active: "active",
    };
    PfWfdHelper.getOrderTranst(filter)
      .then((data) => {
        if (data[0].next_wfs_id == 2) {
          this.setState({
            id_selectedVerify: 4,
          });
          this.getWfa(num_old_wfs);
        } else if (data[0].next_wfs_id == 3) {
          this.setState({
            id_selectedVerify: 3,
          });
          this.getWfa(num_old_wfs);
        } else {
          this.getWfa(data[0].next_wfs_id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async create() {
    const {
      username,
      id_selectedTemplate,
      tnnt_id,
      num_from_id,
      num_to_id,
      num_template_id,
      num_event_id,
      email_content,
      email_attachment1,
      email_attachment2,
      email_subject,
      sentOn_date,
      sentOn_time,
      id_selectedSendAt,
      id_selectedSendTo,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
      editableOrder
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedVerify === "") {
        alertText += ". Verificication\n";
      }

      if (id_selectedTemplate === undefined) {
        alertText += ". Template\n";
      }

      if (num_to_id === "") {
        alertText += ". To Id\n";
      }

      if (email_content === "") {
        alertText += ". Message\n";
      }

      if (editableOrder) {
        if (id_selectedVerify === undefined) {
          alertText += ". Verificication";
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
    }
    if (!bl_role_user) {
      Swal.fire({
        text: "You cannot perform this action",
        confirmButtonColor: Colors.red,
        width: Colors.width,
        allowOutsideClick: false,
      });
      return;
    }

      const data = {
        com_id: 0,
        com_rec_id: 0,
        evt_id: num_event_id,
        template_id: num_template_id,
        from_id: num_from_id,
        to_id: num_to_id,
        email_subject: email_subject,
        email_content: email_content,
        email_attachment1: email_attachment1,
        email_attachment2: email_attachment2,
        id_selectedSendTo: id_selectedSendTo,
        sched_date: moment(sentOn_date).format("YYYY-MM-DD"),
        sched_time: sentOn_time,
        status_id: id_selectedSendAt == 2 ? 9 : 1,
        created_by: username,
        tnnt_id: tnnt_id,
        lc_status_id: 1,
        next_wfs_id: id_selectedVerify,
      };

      data.arr_wfs = arr_verify;
      data.arr_wfs[0].user_name = username;

      this.setState({ is_loading: true });

      PfNotifEmailHelper.insertRecord(data)
        .then((data) => {
          if ((data.code == 200) & (id_selectedVerify === 2)) {
            this.props.getData();
            Swal.fire({
              text: "Record Id: " + data.id + " created successfully.",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.setVisibility(false);
            this.setState({ is_loading: false });
          } else if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text:
                "Your record ID " +
                data.id +
                " is being reviewed & once approved you will be able to view the record!!",
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
          this.setState({ is_loading: false });
          console.log(err);
        });
    } catch (err) {
      Swal.fire({
        text: err,
        confirmButtonColor: Colors.red,
        width: Colors.width,
        allowOutsideClick: false,
      });
      this.setState({ is_loading: false });
      console.log(err);
    }
  }

  async update() {
    const {
      username,
      id_selectedTemplate,
      tnnt_id,
      num_from_id,
      num_to_id,
      num_template_id,
      num_event_id,
      num_status_id,
      email_content,
      email_subject,
      email_attachment1,
      email_attachment2,
      is_active,
      id,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
      editableOrder,
      com_id,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedTemplate === undefined) {
        alertText += ". Template\n";
      }

      if (num_to_id === "") {
        alertText += ". To Id\n";
      }

      if (email_content === "") {
        alertText += ". Message\n";
      }

      if (editableOrder) {
        if (id_selectedVerify === undefined) {
          alertText += ". Verificication";
        }

        if (!bl_role_user) {
          Swal.fire({
            icon: "warning",
            text: "You don't have permission to Verify!!",
            confirmButtonColor: Colors.red,
            width: Colors.width,
            allowOutsideClick: false,
          });
          return;
        }
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

      const filter = {
        rec_id: id,
        user_name: username,
        next_wfs_id: 4,
        tnnt_id: tnnt_id,
        is_active: "active",
        com_id: com_id,
      };

      const checkUser = await PfWfdHelper.checkOrderTranst(filter);

      if (!checkUser && id_selectedVerify != 4) {
        await Swal.fire({
          icon: "warning",
          text: "Maker cannot be Checker!!!",
          confirmButtonColor: Colors.primaryColor,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return; // Terminate the loop
      }

      const data = {
        id: id,
        com_id: 0,
        com_rec_id: 0,
        evt_id: num_event_id,
        template_id: num_template_id,
        from_id: num_from_id,
        to_id: num_to_id,
        email_subject: email_subject,
        email_content: email_content,
        email_attachment1: email_attachment1,
        email_attachment2: email_attachment2,
        status_id: num_status_id,
        created_by: username,
        tnnt_id: tnnt_id,
        is_active: is_active == true ? "active" : "inactive",
        next_wfs_id: id_selectedVerify == undefined ? null : id_selectedVerify,
      };

      data.arr_wfs = arr_verify.filter(
        (item) => item.next_wfs_id == id_selectedVerify
      );
      data.arr_wfs[0].user_name = username;
      data.arr_wfs[0].rec_id = id;

      const alert_message =
        id_selectedVerify == 6
          ? "Order is now ready for six eye verification"
          : id_selectedVerify == 5
            ? "Order has been reject."
            : id_selectedVerify == 7
              ? "Order has been reject."
              : id_selectedVerify == 3
                ? "Order is successfully discarded!!"
                : id_selectedVerify == 2
                  ? "Order is verified and can accessed in Ventor Details Page"
                  : "Your record is being reviewed & once approved you will be able to see the changes!!";

      this.setState({ is_loading: true });
      PfNotifEmailHelper.updateRecord(data)
        .then((data) => {
          if (data.code.code == 200) {
            this.props.getData();
            Swal.fire({
              text: alert_message,
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
          this.setState({ is_loading: false });
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  fillTextMessage(e) {
    const { arr_template } = this.state;

    const id = e.target.value;

    arr_template.map(
      (a) =>
        a.id == id &&
        this.setState({
          id_selectedTemplate: e.target.value,
          num_event_id: a.event_id,
          num_template_id: e.target.value,
          email_subject: a.email_sub,
          email_content: a.email_content,
          email_attachment1: a.email_attachment1,
          email_attachment2: a.email_attachment2,
        })
    );
  }

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      arr_template,
      id_selectedTemplate,
      num_from_id,
      num_to_id,
      email_content,
      email_subject,
      is_active,
      is_loading,
      file_document_view,
      id_selectedSendTo,
      arr_sendTo,
      arr_funcName,
      arr_sendAt,
      id_selectedSendAt,
      sentOn_date,
      sentOn_time,
      arr_emailId,
      arr_verify,
      id_selectedVerify,
      editableOrder,
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

        <div className={styles.wrapper} onClick={(e) => e.stopPropagation()}>
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div>
            <p className={styles.title}>
              {editable == undefined
                ? "Create E-Mail Notification"
                : editable
                  ? "Update E-Mail Notification"
                  : "View E-Mail Notification"}
            </p>

            <div className={styles.inputAlignment}>
              <p>From:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput value={num_from_id} />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{num_from_id}</p>
                </div>
              )}
            </div>

            <div className={styles.leftWrapper}>
              <div className={styles.inputAlignment}>
                <p>Send To:</p>
                {editable != false ? (
                  <select
                    value={
                      id_selectedSendTo === undefined ? 0 : id_selectedSendTo
                    }
                    onChange={(e) =>
                      this.setState({
                        id_selectedSendTo: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      {"Select Send To"}
                    </option>
                    {arr_sendTo.map((s) => (
                      <option value={s.id}>{s.value}</option>
                    ))}
                  </select>
                ) : (
                  <div className={styles.viewField}>
                    <p>{id_selectedSendTo}</p>
                  </div>
                )}
              </div>
            </div>
            {id_selectedSendTo == 2 && (
              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>To:</p>
                  {editable != false ? (
                    <select
                      value={
                        num_to_id === undefined ? 0 : num_to_id
                      }
                      onChange={(e) =>
                        this.setState({
                          num_to_id: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected>
                        {"Select Send To"}
                      </option>
                      {arr_funcName.map((s) => (
                        <option value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{num_to_id}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {id_selectedSendTo == 1 && (
              <div className={styles.inputAlignment}>
                <p>To:</p>
                {editable != false ? (
                  <select
                    value={
                      num_to_id === undefined ? 0 : num_to_id
                    }
                    onChange={(e) =>
                      this.setState({
                        num_to_id: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      {"Select Send To"}
                    </option>
                    {arr_emailId.map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                  </select>
                ) : (
                  <div className={styles.viewField}>
                    <p>{num_to_id}</p>
                  </div>
                )}
              </div>
            )}

            <div className={`borderColorMan ${styles.inputAlignment}`}>
              <p>Template:</p>
              {editable != false ? (
                <select
                  value={id_selectedTemplate}
                  onChange={(e) => {
                    this.fillTextMessage(e);
                  }}
                >
                  <option value={0} disabled selected>
                    {"Select Template"}
                  </option>
                  {arr_template.map((p) => (
                    <option value={p.id}>
                      Event: {p.event_id} - {p.templ_name}
                    </option>
                  ))}
                </select>
              ) : (
                arr_template.map(
                  (p) =>
                    p.id == id_selectedTemplate && (
                      <div className={styles.viewField}>
                        <p>Event: {p.event_id} - {p.templ_name}</p>
                      </div>
                    )
                )
              )}
            </div>

            <div className={styles.inputAlignment}>
              <p>Email Subject:</p>
              {editable != false ? (
                <div className={styles.inputCustom}>
                  <CustomInput
                    value={email_subject}
                    inputType={"text"}
                  />
                </div>
              ) : (
                <div className={styles.viewField}>
                  <p>{email_subject}</p>
                </div>
              )}
            </div>

            <div className={styles.leftWrapper}>
              <div className={styles.inputAlignment}>
                <p>Send At:</p>
                {editable != false ? (
                  <select
                    value={
                      id_selectedSendAt === undefined ? 0 : id_selectedSendAt
                    }
                    onChange={(e) =>
                      this.setState({
                        id_selectedSendAt: e.target.value,
                      })
                    }
                  >
                    <option value={0} disabled selected>
                      {"Select Send At"}
                    </option>
                    {arr_sendAt.map((s) => (
                      <option value={s.id}>{s.value}</option>
                    ))}
                  </select>
                ) : (
                  <div className={styles.viewField}>
                    <p>{id_selectedSendAt}</p>
                  </div>
                )}
              </div>
            </div>

            {id_selectedSendAt == 2 && (
              <div className={styles.inputAlignment}>
                <p>Sent On:
                </p>
                {editable != false ? (
                  <div className={styles.inputCustom}>
                    <DatePicker
                      className={styles.date}
                      dateFormat="dd-MM-yyyy"
                      selected={sentOn_date}
                      onChange={(e) =>
                        this.setState({ sentOn_date: e })
                      }
                    />
                  </div>
                ) : (
                  <div className={styles.viewField}>
                    <p>{moment(sentOn_date).format("DD-MMM-YYYY")}</p>
                  </div>
                )}
              </div>
            )}

            {id_selectedSendAt == 2 && (
              <div className={styles.leftWrapper}>
                <div className={styles.inputAlignment}>
                  <p>Time: (HH:MM - 24Hr Format)</p>
                  {editable != false ? (
                    <div className={styles.inputCustom}>
                      <CustomInput
                        input type="time"
                        value={sentOn_time}
                        onChange={(e) =>
                          this.setState({
                            sentOn_time: e.target.value,
                          })
                        }
                      />
                    </div>
                  ) : (
                    <div className={styles.viewField}>
                      <p>{sentOn_time}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div
              // style={{ whiteSpace: "pre-wrap" }}
              dangerouslySetInnerHTML={{
                __html:
                  editable == true
                    ? file_document_view
                    : file_document_view
                      ? file_document_view.replace(
                        /contenteditable="plaintext-only"/g,
                        ""
                      )
                      : "",
              }}
              id="preview-element"
            // dangerouslySetInnerHTML={{ __html: file_document_view }}
            />

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

            <div className={styles.button}>
              {(editableOrder == true || editable != false) && (
                <div className={styles.verifyAlignment}>
                  <div className={styles.inputAlignmentVerify}>
                    <select
                      value={id_selectedVerify}
                      onChange={(e) =>
                        this.setState({
                          id_selectedVerify: e.target.value,
                        })
                      }
                    >
                      <option value={0} disabled selected>
                        {"Select..."}
                      </option>
                      {arr_verify.map((b) => (
                        <option value={b.next_wfs_id}>{b.wfa_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
              {editableOrder ? (
                <div className={styles.button}>
                  <button
                    className={`button`}
                    onClick={() => this.update()}
                  >
                    {"Submit"}
                  </button>
                </div>
              ) : (
                editable != false && (
                  <div className={styles.button}>
                    <button
                      className={`button`}
                      onClick={() =>
                        editable == undefined
                          ? this.create()
                          : editable && this.update()
                      }
                    >
                      {"Submit"}
                    </button>
                  </div>
                )
              )}
            </div>

            {/* {editable != false && (
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() =>
                    editable == undefined
                      ? this.create()
                      : editable && this.update()
                  }
                >
                  {editable == undefined ? "Create" : editable && "Update"}
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
    );
  }
}

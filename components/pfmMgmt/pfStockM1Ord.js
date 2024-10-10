import React from "react";
import moment from "moment";
import { CalendarTwoTone } from "@ant-design/icons";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import ComponentModal from "../../components/pfmMgmt/pfAddCompoent";
import SampleHelper from "../../helper/pfmMgmt/pfStockM1Ord";
import StockListHelper from "../../helper/pfmMgmt/pfStockOrdList";
import PfWfdHelper from "../../helper/pfmMgmt/pfWFDet";
import PfConstOptions from "../../helper/pfmMgmt/pfConstOption";
import PfDdLookUp from "../../helper/pfmMgmt/pfDdLookup";
import FileHelper from "../../helper/files";
import pfhr from "../../helper/hr/hrStaffM1Det";

export default class EmCltDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      com_id: 507,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_invoice_nr: "",
      date_raised_date: new Date(),
      text_bill_amount: "",
      attachment: "",

      arr_stock_details: [],
      arr_component: [],
      id_component_name: "",
      component_name: "",
      num_quantity: "",
      dec_amount: "",

      text_purchased_by: "",
      int_approved_by_id: "",
      date_approved_date: "",
      text_business_justif: "",
      date_fin_approval_date: "",
      text_settlement_amount: "",
      int_ord_wfs_id: "",

      //Workflow
      access_role_user: global.config.access_role_list,
      arr_verify: [],
      id_selectedVerify: undefined,
      num_old_wfs: 1,
      bl_role_user: "",
      editableOrder: false,

      text_clt_name: "",
      text_clt_type_id: 1,
      clientName: "",
      company_Website: "",
      land_line_number: "",
      state_id: "",
      addr_state_id: "",
      arr_state: [],
      clientType: 2,
      addressType: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      postalCode: "",
      pointOfContact: "",
      designation: "",
      arr_designation: [],
      mobileNumber: "+91",
      altMobileNumber: "+91",
      email: "",
      altEmail: "",
      whatsappNo: "+91",
      addresses: [],
      pointOfContacts: [],
      formErrors: [],
      requiredFields: [],
      requiredFieldsArray: [
        "text_bill_amount",
        "id_component_name",
        "num_quantity",
        // "dec_amount",
      ],
      arr_user_details: [],
      const_type_intl_id: "",
    };

    stateData.editable = props.editable;
    if (props.data !== undefined) {
      stateData.id = props.data;
      stateData.editableOrder = props.editableOrder;
    }

    this.state = {
      ...stateData,
    };
  }

  componentDidMount() {
    const { editable, editableOrder, num_old_wfs } = this.state;
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }

    this.getDropdown();
    this.getComponentDd();
    editable !== undefined && this.getRecord();

    editable == undefined && this.getWfa(num_old_wfs);
    (editableOrder || editable) && this.getOrderTranst();
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
        const role_id = access_role_user.split(";").map((id) => parseInt(id));
        const roleIds = access_role_list.split(";").map((id) => parseInt(id));
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

  async getComponentDd() {
    const { tnnt_id } = this.state;
    const filter = {
      intl_id: "stock_type",
      tnnt_id: tnnt_id,
    };

    return PfConstOptions
      .getConstOptions(filter)
      .then((data) => {
        this.setState({ arr_component: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecord() {
    const { id, tnnt_id, editableOrder } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };
    if (editableOrder == true) {
      SampleHelper.getRecordForOrder(filter)
        .then((data) => {

          const stateData = {
            text_invoice_nr: data[0].invoice_nr,
            text_component_name: data[0].component_name,
            date_raised_date: data[0].date_raised_date === null ? null : new Date(moment(data[0].date_raised_date, "DD/MMM/YYYY").format("DD/MMM/YYYY")),
            text_purchased_by: data[0].purchased_by,
            text_bill_amount: data[0].bill_amount,
            int_approved_by_id: data[0].approved_by_id,
            approved_date: data[0].approved_date === null ? null : new Date(moment(data[0].approved_date, "DD/MMM/YYYY").format("DD/MMM/YYYY")),
            text_business_justif: data[0].business_justif,
            fin_approval_date: data[0].fin_approval_date === null ? null : new Date(moment(data[0].fin_approval_date, "DD/MMM/YYYY").format("DD/MMM/YYYY")),
            text_settlement_amount: data[0].settlement_amount,
            int_ord_wfs_id: data[0].ord_wfs_id,
            is_active: data[0].is_active == "active" ? true : false,
          };

          const filter_stock = {
            ord_id: id,
            tnnt_id: tnnt_id,
          };

          StockListHelper.getRecord(filter_stock).then((poc) => {
            stateData.arr_stock_details = poc.map((pocRec) => {
              return {
                id: pocRec.id,
                ord_id: pocRec.ord_id,
                id_component_name: pocRec.stock_id,
                num_quantity: pocRec.qty,
                is_active: pocRec.is_active == "active" ? true : false,
                editable: false,
              };
            });

            this.setState(stateData);
          })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      SampleHelper.getRecord(filter)
        .then((data) => {

          const stateData = {
            text_invoice_nr: data[0].invoice_nr,
            text_component_name: data[0].component_name,
            date_raised_date: data[0].date_raised_date === null ? null : new Date(moment(data[0].date_raised_date, "DD/MMM/YYYY").format("DD/MMM/YYYY")),
            text_purchased_by: data[0].purchased_by,
            text_bill_amount: data[0].bill_amount,
            int_approved_by_id: data[0].approved_by_id,
            approved_date: data[0].approved_date === null ? null : new Date(moment(data[0].approved_date, "DD/MMM/YYYY").format("DD/MMM/YYYY")),
            text_business_justif: data[0].business_justif,
            fin_approval_date: data[0].fin_approval_date === null ? null : new Date(moment(data[0].fin_approval_date, "DD/MMM/YYYY").format("DD/MMM/YYYY")),
            text_settlement_amount: data[0].settlement_amount,
            int_ord_wfs_id: data[0].ord_wfs_id,
            is_active: data[0].is_active == "active" ? true : false,
          };

          const filter_stock = {
            ord_id: id,
            tnnt_id: tnnt_id,
          };

          StockListHelper.getRecord(filter_stock).then((poc) => {
            stateData.arr_stock_details = poc.map((pocRec) => {
              return {
                id: pocRec.id,
                ord_id: pocRec.ord_id,
                id_component_name: pocRec.stock_id,
                num_quantity: pocRec.qty,
                is_active: pocRec.is_active == "active" ? true : false,
                editable: false,
              };
            });

            this.setState(stateData);
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
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: "active",
      intl_id: "stock_list",
    };

    PfConstOptions.getConstOptions(filter)
      .then((data) => {
        this.setState({ arr_component: data });
      })
      .catch((err) => {
        console.log(err);
      });
      
    PfDdLookUp.getStaffM1Name(filter)
    .then((data) => {
      this.setState({ arr_user_details: data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  async insertRecord() {
    const {
      tnnt_id,
      username,
      text_invoice_nr,
      text_component_name,
      date_raised_date,
      text_purchased_by,
      text_bill_amount,
      attachment,
      int_approved_by_id,
      date_approved_date,
      text_business_justif,
      date_fin_approval_date,
      text_settlement_amount,
      arr_stock_details,
      int_ord_wfs_id,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation
      // if (text_component_name === "") {
      //   alertText += ".Component Name\n ";
      // }
      if (date_raised_date === "" || date_raised_date === null) {
        alertText += ". Raised Date\n";
      }
      if (text_purchased_by === "") {
        alertText += ".Pruchased By\n";
      }
      if (text_bill_amount === "") {
        alertText += ". Total Amount\n";
      }
      if (arr_stock_details.length == 0) {
        alertText += ". Stock Details\n";
      }
      // if (int_ord_wfs_id === undefined) {
      //   alertText += ".Order Workflow status\n ";
      // }
      if (id_selectedVerify === "") {
        alertText += ". Verificication\n";
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

      if (!bl_role_user) {
        Swal.fire({
          text: "You cannot perform this action",
          confirmButtonColor: Colors.red,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      let data = {
        invoice_nr: text_invoice_nr,
        raised_date:
          date_raised_date === null
            ? null
            : moment(date_raised_date).format("YYYY-MMM-DD"),
        bill_amount: text_bill_amount,
        ord_wfs_id: id_selectedVerify,
        created_by: username,
        tnnt_id: tnnt_id,
        purchased_by: text_purchased_by,
        // component_name: text_component_name,
        // approved_by_id: int_approved_by_id,
        // approved_date: moment(date_approved_date).format("YYYY-MMM-DD"),
        // business_justif: text_business_justif,
        // fin_approval_date: moment(date_fin_approval_date).format("YYYY-MMM-DD"),
        // settlement_amount: text_settlement_amount,
        // lc_status_id: 1,
        arr_stock_details: arr_stock_details.map((poc) => {
          return {
            stock_id: poc.id_component_name,
            qty: poc.num_quantity,
            // amount: poc.dec_amount,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        next_wfs_id: id_selectedVerify,
      };

      // const handleUpload = async (file, fieldName) => {
      //   if (file && file instanceof File) {
      //     const result = await FileHelper.upload(file, file.name, "test");
      //     const res = result.data;
      //     if (result.code === 200) {
      //       data = {
      //         ...data,
      //         [fieldName]: res.substring(res.lastIndexOf("/") + 1),
      //       };
      //       console.log("data..", data);
      //     } else {
      //       Swal.fire({
      //         text: "Failed to upload Exhibitor Manual",
      //         confirmButtonColor: Colors.red,
      //         width: Colors.width,
      //         allowOutsideClick: false,
      //       });
      //       this.setState({ is_loading: false });
      //     }
      //   }
      // };

      // await handleUpload(attachment, "attachment");
      data.arr_wfs = arr_verify;
      data.arr_wfs[0].user_name = username;

      console.log(data);

      this.setState({ is_loading: true });
      SampleHelper.insertBatch(data)
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
                "Your record ID " + data.id + " is being reviewed & once approved you will be able to view the record!!",
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
      tnnt_id,
      username,
      text_invoice_nr,
      text_component_name,
      date_raised_date,
      text_purchased_by,
      text_bill_amount,
      attachment,
      int_approved_by_id,
      date_approved_date,
      text_business_justif,
      date_fin_approval_date,
      text_settlement_amount,
      arr_stock_details,
      int_ord_wfs_id,
      editableOrder,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
      id,
      com_id,
      is_active,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      //Validation

      if (date_raised_date === "" || date_raised_date === null) {
        alertText += ". Raised Date\n";
      }

      if (text_bill_amount === "") {
        alertText += ". Total Amount\n";
      }
      if (arr_stock_details.length == 0) {
        alertText += ". Stock Details\n";
      }
      if (text_purchased_by === "") {
        alertText += ".Pruchased By\n ";
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

      let data = {
        id: id,
        invoice_nr: text_invoice_nr,
        raised_date:
          date_raised_date === null
            ? null
            : moment(date_raised_date).format("YYYY-MMM-DD"),
        bill_amount: text_bill_amount,
        ord_wfs_id: id_selectedVerify,
        created_by: username,
        tnnt_id: tnnt_id,
        purchased_by: text_purchased_by,
        is_active: is_active == false ? "inactive" : "active",
        arr_stock_details: arr_stock_details.map((poc) => {
          return {
            id: poc.id,
            ord_id: poc.ord_id,
            stock_id: poc.id_component_name,
            qty: poc.num_quantity,
            // amount: poc.dec_amount,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        next_wfs_id: id_selectedVerify,
      };

      // const handleUpload = async (file, fieldName) => {
      //   if (file && file instanceof File) {
      //     const result = await FileHelper.upload(file, file.name, "test");
      //     const res = result.data;
      //     if (result.code === 200) {
      //       data = {
      //         ...data,
      //         [fieldName]: res.substring(res.lastIndexOf("/") + 1),
      //       };
      //       console.log("data..", data);
      //     } else {
      //       Swal.fire({
      //         text: "Failed to upload Exhibitor Manual",
      //         confirmButtonColor: Colors.red,
      //         width: Colors.width,
      //         allowOutsideClick: false,
      //       });
      //       this.setState({ is_loading: false });
      //     }
      //   }
      // };

      // await handleUpload(attachment, "attachment");
      data.arr_wfs = arr_verify;
      data.arr_wfs[0].user_name = username;

      console.log(data);

      const alert_message =
      id_selectedVerify == 6
        ? "Order is now ready next verification"
        : id_selectedVerify == 5
          ? "Order has been reject."
          : id_selectedVerify == 7
            ? "Order has been reject."
            : id_selectedVerify == 3
              ? "Order is successfully discarded!!"
              : id_selectedVerify == 2
                ? "Order is verified and can accessed in Exhibitor Details Page"
                : "Your Exhibitor record is being reviewed & once approved you will be able to see the changes!!";

      this.setState({ is_loading: true });
      SampleHelper.updateBatch(data)
        .then((data) => {
          if (data.code == 200) {
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
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  camelCaseToWords = (key) => {
    // Using regular expression to split the key into words
    const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    // Capitalizing the first letter of the first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    // Joining the words with spaces
    return words.join(" ");
  };

  validateInput = (event) => {
    const key = event.target.name,
      value = event.target.value;

    switch (key) {
      // Only numbers
      case "num_quantity":
      case "id_component_name":
        return /^\d+$/.test(value);

      // case "dec_amount":
      case "text_bill_amount":
        return /^\d+(\.\d{1,2})?$/.test(value);
      default:
        return true;
    }
  };

  renderInvalidError = () => {
    return (
      <Form.Text className={styles.error}>
        Invalid input. Only numbers with up to two decimal places are allowed.
      </Form.Text>
    );
  };

  renderRequiredFieldError = () => {
    return (
      <Form.Text className={styles.error}>
        Required field, please enter some value.
      </Form.Text>
    );
  };

  removeFromArray = (array, element) => {
    if (!array.includes(element)) return array;
    const indexOf = array.indexOf(element);
    array.splice(indexOf, 1);
    return array;
  };

  //#region Basic Details
  handleChange = (event) => {
    const { name, value, required } = event.target;
    let { formErrors, requiredFields } = this.state;
    if (value !== "") {
      requiredFields = this.removeFromArray(requiredFields, name);
      if (!this.validateInput(event)) {
        if (!formErrors.includes(name)) formErrors.push(name);
      } else {
        formErrors = this.removeFromArray(formErrors, name);
      }
    } else {
      if (required && !requiredFields.includes(name)) requiredFields.push(name);
      formErrors = this.removeFromArray(formErrors, name);
    }

    const stateObject = {
      [name]: value,
      formErrors: formErrors,
      requiredFields: requiredFields,
    };

    this.setState(stateObject);
  };

  renderBasicDetails = () => {
    const {
      editable,
      formErrors,
      requiredFields,
      text_invoice_nr,
      text_bill_amount,
      text_purchased_by,
      date_raised_date,
      attachment,
      arr_user_details,
    } = this.state;
    const disabled = editable !== undefined && !editable;

    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>

          <Row className={styles.formRow}>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="text_invoice_nr"
              >
                <Form.Label>Invoice Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Invoice Number"
                  value={text_invoice_nr}
                  onChange={this.handleChange}
                  name="text_invoice_nr"
                  required
                  readOnly={disabled}
                />
                {formErrors.includes("text_invoice_nr")
                  ? this.renderInvalidError()
                  : null}
                {requiredFields.includes("text_invoice_nr")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="text_bill_amount"
              >
                <Form.Label className={styles.required}>
                  Total Amount
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Total Amount"
                  value={text_bill_amount}
                  onChange={this.handleChange}
                  name="text_bill_amount"
                  required
                  readOnly={disabled}
                />
                {formErrors.includes("text_bill_amount")
                  ? this.renderInvalidError()
                  : null}
                {requiredFields.includes("text_bill_amount")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="text_purchased_by"
              >
                <Form.Label>Purchased By</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    value={text_purchased_by}
                    onChange={this.handleChange}
                    name="text_purchased_by"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_user_details.map((a) => (
                      <option value={a.name}>{a.name}</option>
                    ))}
                  </Form.Control>
                  {formErrors.includes("text_purchased_by")
                  ? this.renderInvalidError()
                  : null}
                {requiredFields.includes("text_purchased_by")
                  ? this.renderRequiredFieldError()
                  : null}
                </div>
              </Form.Group>
            </Col>
            {/* <Col md={8}>
              <Form.Group
                className={styles.controlGroup}
                controlId="attachment"
              >
                <Form.Label className={styles.required}>Attachment</Form.Label>
                <Form.Control
                  type="file"
                  accept=".pdf,.doc,.docx,.jpg,.png,.jpmg"
                  onChange={(e) => this.setState({ attachment: e.target.files[0] })} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="attachment"
              >
                <Form.Label className={styles.required}>Attachment</Form.Label>
              </Form.Group>
            </Col> */}
          </Row>
        </fieldset>
      </div>
    );
  };

  //#region Attachment
  renderAttachment = (event) => {

  }

  //#region Stock Details
  handleAddStockRow = () => {
    const {
      arr_stock_details,
      id_component_name,
      num_quantity,
      component_name,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;

    if (requiredFieldsArray.includes("id_component_name") && id_component_name === "") {
      requiredFields.push("id_component_name");
    }
    // if (requiredFieldsArray.includes("num_quantity") && num_quantity === "") {
    //   requiredFields.push("num_quantity");
    // }

    if (requiredFields.length > 0) {
      this.setState({ requiredFields: requiredFields }, () => {
      });
      return false;
    }

    const fields = ["id_component_name", "num_quantity"];
    let isErrorPresent = false;
    for (const element of fields) {
      if (formErrors.includes(element)) {
        isErrorPresent = true;
      }
    }

    if (isErrorPresent) return false;

    arr_stock_details.push({
      arr_stock_details: arr_stock_details,
      id_component_name: id_component_name,
      num_quantity: num_quantity,
      // dec_amount: dec_amount,
      editable: false,
    });

    this.setState({
      arr_stock_details: arr_stock_details,
      id_component_name: "",
      num_quantity: "",
      // dec_amount: "",
    });
  };

  handleEditStockRow = (index) => {
    const { arr_stock_details } = this.state;
    arr_stock_details[index].editable = true;
    this.setState({ arr_stock_details: arr_stock_details });
  };

  handleSaveStockRow = (index) => {
    const { arr_stock_details } = this.state;
    arr_stock_details[index].editable = false;
    this.setState({ arr_stock_details: arr_stock_details });
  };

  handleRemoveStockRow = (index) => {
    console.log("index: ", index);
    const { arr_stock_details } = this.state;
    arr_stock_details.splice(index, 1);
    this.setState({ arr_stock_details: arr_stock_details });
  };

  handleStockFieldChange = (event, index) => {
    const { name, value, required } = event.target;
    let { formErrors, requiredFields } = this.state;
    if (value !== "") {
      requiredFields = this.removeFromArray(requiredFields, name);
      if (!this.validateInput(event)) {
        if (!formErrors.includes(name)) formErrors.push(name);
      } else {
        formErrors = this.removeFromArray(formErrors, name);
      }
    } else {
      if (required && !requiredFields.includes(name)) requiredFields.push(name);
      formErrors = this.removeFromArray(formErrors, name);
    }

    const stateObject = {
      formErrors: formErrors,
      requiredFields: requiredFields,
    };

    if (index !== null) {
      const { arr_stock_details } = this.state;
      arr_stock_details[index][name] = value;
      stateObject.arr_stock_details = arr_stock_details;
    } else {
      stateObject[name] = value;
    }

    this.setState(stateObject);
  };

  renderComponent = (index, editable) => {
    const {
      id_component_name,
      arr_stock_details,
      requiredFields,
      arr_component,
    } = this.state;
    const value =
      index !== null
        ? arr_stock_details[index].id_component_name
        : id_component_name;
    return (
      <Form.Group className={styles.controlGroup} controlId="id_component_name">
        <div className="select-container">
          <Form.Control
            as="select"
            value={value}
            onChange={(e) => {
              this.handleStockFieldChange(e, index);
            }}
            name="id_component_name"
            required
            disabled={!editable}
          >
            <option value="" disabled>
              Select
            </option>
            {arr_component.map((a) => (
              <option value={a.id} id={a.option_name}>{a.option_name}</option>
            ))}
          </Form.Control>
          {requiredFields.includes("id_component_name")
            ? this.renderRequiredFieldError()
            : null}
        </div>
      </Form.Group>
    );
  };

  rendeEditableField = (index, name, field_name) => {
    const {
      arr_stock_details,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;
    const value =
      index !== null ? arr_stock_details[index][name] : this.state[name];

    return (
      <Form.Group className={styles.controlGroup} controlId={name}>
        <Form.Control
          type="text"
          placeholder={`Enter ${this.camelCaseToWords(field_name)}`}
          value={value}
          onChange={(e) => {
            this.handleStockFieldChange(e, index);
          }}
          name={name}
          required={requiredFieldsArray.includes(name)}
        />
        {formErrors.includes(name) ? this.renderInvalidError() : null}
        {requiredFields.includes(name) ? this.renderRequiredFieldError() : null}
      </Form.Group>
    );
  };

  renderStockEditableRow = () => {
    const { editable } = this.state;
    return (
      <tr>
        <td>{this.renderComponent(null, true)}</td>
        <td>{this.rendeEditableField(null, "num_quantity", "Quantity")}</td>
        {/* <td>{this.rendeEditableField(null, "dec_amount", "Amount")}</td> */}
      </tr>
    );
  };

  renderStockDetails = () => {
    const { editable, arr_stock_details, com_id } = this.state;

    // const disabled = editable !== undefined && !editable;

    const isViewOnlyMode = editable === false;
    return (
      <div className={styles.divMain3}>
        <fieldset className={styles.fieldsetWrapper}>
          <div className={styles.mainLegendsWrapper}>
            <legend className={styles.legendsWrapper3}>Stock Details</legend>
            <legend className={styles.actionCell}>
              {editable != false ? (
                <div>
                <button className={`button`} style={{ fontSize: "15px" }}
                  onClick={() =>
                    this.setState({
                      modalVisibility: true,
                      editable: undefined,
                      const_type_intl_id: 'stock_type',
                    })}
                >
                  Add Component
                </button>
                  <i
                    class="fa fa-plus-circle"
                    aria-hidden="true"
                    onClick={this.handleAddStockRow}
                    hidden={editable == false}
                  ></i>
                </div>
              ) : (
                <div style={{ margin: "10px" }} />
              )}
            </legend>
          </div>
          <table className={styles.addressTable}>
            <thead>
              <tr>
                <th>Component Name</th>
                <th>Quantity</th>
                {/* <th>Amount</th> */}
                {editable && true ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {arr_stock_details.map((row, index) => {
                return (
                  <tr
                    key={`stock_row_${index}`}
                    className={styles.readOnlyDataRow}
                  >
                    <td>{this.renderComponent(index, row.editable)}</td>
                    <td>
                      {row.editable
                        ? this.rendeEditableField(
                          index,
                          "num_quantity",
                          "Quantity"
                        )
                        : row.num_quantity}
                    </td>
                    {/* <td>
                      {row.editable
                        ? this.rendeEditableField(index, "dec_amount", "Amount")
                        : row.dec_amount}
                    </td> */}
                    {!isViewOnlyMode ? (
                      <td className={styles.actionCell}>
                        <i
                          className="fa fa-times-circle-o"
                          aria-hidden="true"
                          onClick={(e) => {
                            this.handleRemoveStockRow(index);
                          }}
                        ></i>
                        {row.editable ? (
                          <i
                            class="fa fa-save"
                            aria-hidden="true"
                            onClick={(e) => {
                              this.handleSaveStockRow(index);
                            }}
                          ></i>
                        ) : (
                          <i
                            class="fa fa-edit"
                            aria-hidden="true"
                            onClick={(e) => {
                              this.handleEditStockRow(index);
                            }}
                          ></i>
                        )}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
              {!isViewOnlyMode ? this.renderStockEditableRow() : null}
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderBasicDetails()}
        {this.renderAttachment()}
        {this.renderStockDetails()}
      </Form>
    );
  };

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
      arr_verify,
      id_selectedVerify,
      editableOrder,
      is_active,
      modalVisibility,
      com_id,
      const_type_intl_id,
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
        
        {modalVisibility && (
          <ComponentModal
            visibility={modalVisibility}
            setVisibility={(v) => this.setState({ modalVisibility: v })}
            com_id={com_id}
            const_type_intl_id={const_type_intl_id}
            getData={() => this.getComponentDd()}
          />
        )}
        <div
          className={styles.newcomponents}
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src="/assets/close-red.png"
            className={styles.closeButton}
            onClick={() => setVisibility(false)}
          />
          <div>
            <p className={styles.title}>
              {editable == undefined
                ? "Create Record"
                : editable
                  ? "Update Record"
                  : "View Record"}
            </p>

            {this.renderCreateRecordForm()}

            <div>
              <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
                * are mandatory fields
              </p>
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
                    onClick={() => this.updateRecord()}
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
                          ? this.insertRecord()
                          : editable && this.updateRecord()
                      }
                    >
                      {"Submit"}
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

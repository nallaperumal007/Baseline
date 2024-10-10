import React from "react";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import OrderHelper from "../../helper/pfmMgmt/pfOrdM1Det";
import ExpenseHelper from "../../helper/pfmMgmt/pfOrdM1Expense";
import StockHelper from "../../helper/pfmMgmt/pfOrdM1Stock";
import { Form, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PfWfdHelper from "../../helper/pfmMgmt/pfWFDet";
import PfConstOptions from "../../helper/pfmMgmt/pfConstOption";
import PfDdLookUp from "../../helper/pfmMgmt/pfDdLookup";
import CommentsHelper from "../../helper/comments"; 
import DesignationModal from "../../components/emMgmt/emDesignation";
import { Input } from "antd";
import { CalendarTwoTone, FieldTimeOutlined } from "@ant-design/icons";

const { TextArea } = Input;
export default class PfOrdM1Det extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      user_role_list: global.config.user_role_list,
      is_loading: false,
      selectedData: undefined,
      editable: undefined,
      editableOrder: false,
      com_id: 506,
      is_active: true,
      id: "",
      arr_order_type: [],
      order_type: "",
      arr_client: [],
      client: "",
      arr_machine: [],
      machine: "",
      arr_user_details: [],
      assigned_to: "",
      attend_date: "",
      attend_time: "",
      report_descr: "",
      observation_details: "",
      arr_expense_details: [
        {
          charges: 1,
          amount: "",
          billability: 1,
          attachment: "",
        },
        {
          charges: 2,
          amount: "",
          billability: "",
          attachment: "",
        },
        {
          charges: 3,
          amount: "",
          billability: "",
          attachment: "",
        },
      ],
      arr_charges: [
        {
          id: 1,
          name: "Service Cost",
        },
        {
          id: 2,
          name: "Boarding & Lodging",
        },
        {
          id: 3,
          name: "Travel",
        },
      ],
      charges: "",
      amount: "",
      arr_bill: [
        {
          id: 1,
          name: "Billable",
        },
        {
          id: 2,
          name: "Non-billable",
        },
        {
          id: 3,
          name: "Client provided",
        },
      ],
      billability: "",
      attachment: "",
      arr_stock_details: [],
      arr_stock: [],
      bill: "",
      stock: "",
      quantity: "",
      formErrors: [],
      requiredFields: [],
      requiredFieldsArray: [
        "clientName",
        "state Id",
        "clientType",
        "addressType",
        "addressLine1",
        "city",
        "State",
        "postalCode",
        "stock",
        "quantity",
      ],
      id_selectedVerify: undefined,
      arr_verify: [],
      num_old_wfs: 1,
      access_role_user: global.config.access_role_list,
      bl_role_user: "",
      arr_clientType: [],
      pfAddDesign: false,
      modalVisibility: false,
      rejection_reason: "",
      id_wfa: undefined,
    };

    this.fileInputRef = React.createRef();

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

  camelCaseToWords = (key) => {
    // Using regular expression to split the key into words
    const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    // Capitalizing the first letter of the first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    // Joining the words with spaces
    return words.join(" ");
  };

  getDropdown() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      is_active: "active",
      intl_id: "order_type",
    };

    // PfDdLookUp.getStockM1Name(filter)
    //   .then((data) => {

    //     this.setState({ arr_stock: data });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    PfDdLookUp.getMachineM1Name(filter)
      .then((data) => {
        this.setState({ arr_machine: data });
      })
      .catch((err) => {
        console.log(err);
      });

    PfDdLookUp.getCltM1Name(filter)
      .then((data) => {
        this.setState({ arr_client: data });
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

    PfConstOptions.getConstOptions(filter)
      .then((data) => {
        this.setState({ arr_order_type: data });
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

    // if (editableOrder == true) {
    // OrderHelper.getRecordForOrder(filter)
    //   .then((data) => {
    //     const stateData = {
    //       order_type: data[0].ord_type_id,
    //       client: data[0].clt_id,
    //       machine: data[0].machine_id,
    //       report_descr: data[0].issue_reported,
    //       assigned_to: data[0].assigned_to_id,
    //       attend_date: data[0].attend_to == null ? "" : new Date(data[0].attend_to),
    //       attend_time: data[0].attend_time == null ? "" : new Date(data[0].attend_time),
    //       // attend_time: data[0].attend_time,
    //       observation_details: data[0].observation_details,
    //       ord_status_id: data[0].ord_status_id,
    //       created_by: data[0].created_by,
    //       // tnnt_id: data[0].tnnt_id,
    //       is_active: data[0].is_active == "active" ? true : false,
    //     };

    //     const filter_record = {
    //       ord_id: id,
    //       tnnt_id: tnnt_id,
    //     };
    //     ExpenseHelper.getRecord(filter_record).then((res) => {
    //       stateData.arr_expense_details = res.map((rec) => {
    //         return {
    //           id: rec.id,
    //           ord_id: rec.ord_id,
    //           charges: rec.charge_type_id,
    //           amount: rec.ord_amt,
    //           billability: rec.ord_billability_id,
    //           attachment: rec.ord_attachment,
    //           editable: false,
    //         };
    //       });

    //       const filter_clt = {
    //         ord_id: id,
    //         tnnt_id: tnnt_id,
    //       };

    //       StockHelper.getRecord(filter_clt).then((poc) => {
    //         stateData.arr_stock_details = poc.map((pocRec) => {
    //           return {
    //             id: pocRec.id,
    //             ord_id: pocRec.ord_id,
    //             bill: pocRec.bill_id,
    //             stock: pocRec.stock_id,
    //             quantity: pocRec.quantity_id,
    //             editable: false,
    //           };
    //         });

    //         this.setState(stateData);
    //       });
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // } else {

    OrderHelper.getRecord(filter)
      .then((data) => {
        const stateData = {
          order_type: data[0].ord_type_id,
          client: data[0].clt_id,
          machine: data[0].machine_id,
          report_descr: data[0].issue_reported,
          assigned_to: data[0].assigned_to_id,
          attend_date:
            data[0].attend_to == null ? "" : new Date(data[0].attend_to),
          attend_time:
            data[0].attend_time == null ? "" : new Date(data[0].attend_time),
          // attend_time: data[0].attend_time,
          observation_details: data[0].observation_details,
          ord_status_id: data[0].ord_status_id,
          created_by: data[0].created_by,
          // tnnt_id: data[0].tnnt_id,
          is_active: data[0].is_active == "active" ? true : false,
        };

        const filter_record = {
          ord_id: id,
          tnnt_id: tnnt_id,
        };
        ExpenseHelper.getRecord(filter_record).then((res) => {
          stateData.arr_expense_details = res.map((rec) => {
            return {
              id: rec.id,
              ord_id: rec.ord_id,
              charges: rec.charge_type_id,
              amount: rec.ord_amt,
              billability: rec.ord_billability_id,
              attachment: rec.ord_attachment,
              editable: false,
            };
          });

          const filter_clt = {
            ord_id: id,
            tnnt_id: tnnt_id,
          };

          StockHelper.getRecord(filter_clt).then((poc) => {
            stateData.arr_stock_details = poc.map((pocRec) => {
              return {
                id: pocRec.id,
                ord_id: pocRec.ord_id,
                bill: pocRec.bill_id,
                stock: pocRec.stock_id,
                quantity: pocRec.quantity_id,
                editable: false,
              };
            });

            this.setState(stateData);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    // }
  }

  //#region Insert Function
  async insertRecord() {
    const {
      com_id,
      tnnt_id,
      username,
      order_type,
      client,
      machine,
      assigned_to,
      attend_date,
      attend_time,
      report_descr,
      arr_expense_details,
      arr_stock_details,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (id_selectedVerify === "") {
        alertText += ". Verificication\n";
      }

      if (order_type === "") {
        alertText += ". Order Type\n";
      }

      if (client === "") {
        alertText += ". Client\n";
      }

      if (machine === "") {
        alertText += ". Machine\n";
      }

      if (assigned_to === "") {
        alertText += ". Assigned To\n";
      }

      if (report_descr === "") {
        alertText += ". Report Description\n";
      }

      if (arr_expense_details.length == 0) {
        alertText += ". Address\n";
      }

      // if (arr_stock_details.length == 0) {
      //   alertText += ". Point Of Contacts\n";
      // }

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

      const data = {
        ord_type_id: order_type,
        clt_id: client,
        machine_id: machine,
        assigned_to_id: assigned_to,
        attend_to: attend_date
          ? moment(attend_date).format("YYYY-MM-DD")
          : null,
        attend_time: attend_time ? attend_time : null,
        issue_reported: report_descr,
        ord_status_id: 2032,
        created_by: username,
        tnnt_id: tnnt_id,
        arr_expense_details: arr_expense_details.map((add) => {
          return {
            charge_type_id: add.charges,
            ord_amt: add.amount,
            ord_billability_id: add.billability,
            ord_attachment: add.attachment,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        arr_stock_details: arr_stock_details.map((poc) => {
          return {
            bill_id: poc.bill,
            stock_id: poc.stock,
            quantity_id: poc.quantity,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        next_wfs_id: id_selectedVerify,
      };
      data.arr_wfs = arr_verify;
      data.arr_wfs[0].user_name = username;
      console.log("data: ", data);

      this.setState({ is_loading: true });
      OrderHelper.insertBatch(data)
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
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }
  //#region Insert Function End

  //#region Update Function
  async updateRecord() {
    const {
      id,
      is_active,
      tnnt_id,
      username,
      order_type,
      client,
      machine,
      assigned_to,
      attend_date,
      attend_time,
      report_descr,
      arr_expense_details,
      arr_stock_details,
      editableOrder,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
      com_id,
      user_role_list,
      id_wfa,
      rejection_reason,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (order_type === "") {
        alertText += ". Order Type\n";
      }

      if (client === "") {
        alertText += ". Client\n";
      }

      if (machine === "") {
        alertText += ". Machine\n";
      }

      if (assigned_to === "") {
        alertText += ". Assigned To\n";
      }

      if (report_descr === "") {
        alertText += ". Report Description\n";
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

      const status = this.handleOrderStatus();
      const data = {
        id: id,
        ord_type_id: order_type,
        clt_id: client,
        machine_id: machine,
        assigned_to_id: assigned_to,
        attend_to: moment(attend_date).format("YYYY-MM-DD"),
        attend_time: attend_time,
        issue_reported: report_descr,
        ord_status_id: status,
        created_by: username,
        tnnt_id: tnnt_id,
        is_active: is_active == false ? "inactive" : "active",
        next_wfs_id: id_selectedVerify,
        arr_expense_details: arr_expense_details.map((add) => {
          return {
            id: add.id,
            ord_id: add.ord_id,
            charge_type_id: add.charges,
            ord_amt: add.amount,
            ord_billability_id: add.billability,
            ord_attachment: add.attachment,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        arr_stock_details: arr_stock_details.map((poc) => {
          return {
            id: poc.id,
            ord_id: poc.ord_id,
            bill_id: poc.bill,
            stock_id: poc.stock,
            quantity_id: poc.quantity,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
      };

      data.arr_wfs = arr_verify.filter(
        (item) => item.next_wfs_id == id_selectedVerify
      );
      data.arr_wfs[0].user_name = username;
      data.arr_wfs[0].rec_id = id;
      console.log("data: ", data);

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
                  ? "Order is verified and can accessed in Details Page"
                  : "Your record is being reviewed & once approved you will be able to see the changes!!";

      this.setState({ is_loading: true });
      OrderHelper.updateBatch(data)
        .then((data) => {
          if (data.code == 200) {
            id_wfa == 16 && this.handleRejectionReason();
            Swal.fire({
              text: alert_message,
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.props.getData();
              }
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
          this.setState({ is_loading: false });
        });
    } catch (err) {
      console.log(err);
      this.setState({ is_loading: false });
    }
  }
  //#region Update Function End

  handleOrderStatus = () => {
    const { id_selectedVerify } = this.state;

    if (id_selectedVerify == 12) {
      return 2032;
    } else if (id_selectedVerify == 13) {
      return 2033;
    } else if (id_selectedVerify == 14) {
      return 2034;
    } else if (id_selectedVerify == 15) {
      return 2035;
    } else if (id_selectedVerify == 16) {
      return 2036;
    } else if (id_selectedVerify == 8) {
      return 2037;
    } else if (id_selectedVerify == 9) {
      return 2038;
    } else if (id_selectedVerify == 10) {
      return 2039;
    } else if (id_selectedVerify == 11) {
      return 2040;
    } else if (id_selectedVerify == 17) {
      return 2041;
    } else if (id_selectedVerify == 18) {
      return 2042;
    }
  };

  handleRejectionReason = async () => {
    const { com_id, rejection_reason, id, tnnt_id } = this.state;

    const data = {
      com_id: com_id,
      com_rec_id: id,
      comments: rejection_reason,
      created_by: global.config.username,
      tnnt_id: tnnt_id,
    };
    const result = await CommentsHelper.create(data);
    return result;
  };
  handleSubmit = (event) => {
    event.preventDefault();
    // Implement your submit logic here
    console.log("Form Submitted");
  };

  validateInput = (event) => {
    const key = event.target.name,
      value = event.target.value;

    switch (key) {
      // String validation
      //case "clientName":
      //  return /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
      case "city":
        return /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
      case "arr_stock_details":
        return /^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value);
      // case "email":
      // case "altEmail":
      //  return /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/.test(value);

      // Only numbers
      case "clientType":
      case "designation":
      case "addressType":
      case "postalCode":
        return /^\d+$/.test(value);

      // Mobile numbers accepting '+'
      case "mobileNumber":
      case "altMobileNumber":
      case "whatsappNo":
        return /^\+?\d+$/.test(value);

      default:
        return true;
    }
  };

  removeFromArray = (array, element) => {
    if (!array.includes(element)) return array;
    const indexOf = array.indexOf(element);
    array.splice(indexOf, 1);
    return array;
  };

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

  renderInvalidError = () => {
    return (
      <Form.Text className={styles.error}>
        Invalid input. Only characters are allowed.
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

  renderBasicDetails = () => {
    const {
      editable,
      arr_order_type,
      order_type,
      arr_client,
      client,
      arr_machine,
      machine,
      arr_user_details,
      assigned_to,
      formErrors,
      requiredFields,
      attend_date,
      attend_time,
      report_descr,
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
                controlId="order_type"
              >
                <Form.Label>Order Type</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    value={order_type}
                    onChange={this.handleChange}
                    name="order_type"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_order_type.map((a) => (
                      <option value={a.id}>{a.option_name}</option>
                    ))}
                  </Form.Control>
                  {requiredFields.includes("order_type")
                    ? this.renderRequiredFieldError()
                    : null}
                </div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className={styles.controlGroup} controlId="client">
                <Form.Label>Client</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    value={client}
                    onChange={this.handleChange}
                    name="client"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_client.map((a) => (
                      <option value={a.id}>{a.name}</option>
                    ))}
                  </Form.Control>
                  {requiredFields.includes("client")
                    ? this.renderRequiredFieldError()
                    : null}
                </div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group className={styles.controlGroup} controlId="machine">
                <Form.Label>Machine</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    value={machine}
                    onChange={this.handleChange}
                    name="machine"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_machine.map((a) => (
                      <option value={a.id}>{a.name}</option>
                    ))}
                  </Form.Control>
                  {requiredFields.includes("machine")
                    ? this.renderRequiredFieldError()
                    : null}
                </div>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="assigned_to"
              >
                <Form.Label>Assigned To</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    value={assigned_to}
                    onChange={this.handleChange}
                    name="assigned_to"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_user_details.map((a) => (
                      <option value={a.id}>{a.name}</option>
                    ))}
                  </Form.Control>
                  {/* {requiredFields.includes("assigned_to")
                    ? this.renderRequiredFieldError()
                    : null} */}
                </div>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="attend_date"
              >
                <Form.Label style={{ paddingTop: "10px" }}>
                  Attend Date
                </Form.Label>
                <div className={styles.inputContainer}>
                  <DatePicker
                    className={
                      disabled
                        ? `${styles.disabledField} ${styles.date1}`
                        : styles.date1
                    }
                    dateFormat="dd-MMM-yyyy"
                    selected={attend_date}
                    onChange={(e) => this.setState({ attend_date: e })}
                    disabled={disabled}
                  />
                  <CalendarTwoTone className={styles.icon} />
                </div>

                {requiredFields.includes("attend_date")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup1}
                controlId="attend_time"
              >
                <Form.Label style={{ paddingTop: "10px" }}>
                  Attend Time
                </Form.Label>
                <div className={styles.inputContainer}>
                  {console.log(attend_time)}
                  <DatePicker
                    className={
                      disabled
                        ? `${styles.disabledField} ${styles.date1}`
                        : styles.date1
                    }
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    selected={attend_time}
                    onChange={(e) => this.setState({ attend_time: e })}
                    disabled={disabled}
                  />
                  <FieldTimeOutlined className={styles.icon} />
                </div>

                {requiredFields.includes("attend_time")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="report_descr"
              >
                <Form.Label>Report Description</Form.Label>
                {/* <Form.Control
                  as="textarea"
                  placeholder="Enter Report Description"
                  
                  value={report_descr}
                  onChange={this.handleChange}
                  name="report_descr"
                  required
                  readOnly={disabled}
                /> */}
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={this.handleChange}
                  name="report_descr"
                  placeholder="Enter Report Description"
                  required
                  readOnly={disabled}
                  style={{
                    height: 120,
                    resize: "none",
                  }}
                />
                {formErrors.includes("report_descr")
                  ? this.renderInvalidError()
                  : null}
                {requiredFields.includes("report_descr")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>

            <style jsx>{`
              .select-container {
                position: relative;
              }

              .select-container:after {
                content: "▼";
                position: absolute;
                right: 10px;
                top: calc(50% - 10px);
                pointer-events: none;
              }
            `}</style>
          </Row>
        </fieldset>
      </div>
    );
  };

  //#region Expense Details

  renderAmount = (index, name) => {
    const {
      arr_expense_details,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;
    const value =
      index !== null ? arr_expense_details[index][name] : this.state[name];

    return (
      <Form.Group className={styles.controlGroup} controlId={name}>
        <Form.Control
          type="text"
          placeholder={`Enter ${this.camelCaseToWords(name)}`}
          value={value}
          onChange={(e) => {
            this.handleExpenseFieldChange(e, index);
          }}
          name={name}
          required={requiredFieldsArray.includes(name)}
        />
        {formErrors.includes(name) ? this.renderInvalidError() : null}
        {requiredFields.includes(name) ? this.renderRequiredFieldError() : null}
      </Form.Group>
    );
  };

  handleExpenseFieldChange = (event, index) => {
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
    console.log(name);

    if (index !== null) {
      const { arr_expense_details } = this.state;
      if (name == "attachment") {
        console.log(arr_expense_details[index][name]);
        arr_expense_details[index][name] = event.target.files[0];
      } else {
        arr_expense_details[index][name] = value;
      }
      stateObject.arr_expense_details = arr_expense_details;
    } else {
      if (name == "attachment") {
        console.log(stateObject[name]);
        stateObject[name] = event.target.files[0];
      } else {
        stateObject[name] = value;
      }
      // stateObject[name] = value;
    }

    this.setState(stateObject);
  };

  renderCharges = (index, editable) => {
    const { charges, arr_expense_details, requiredFields, arr_charges } =
      this.state;
    const value = index !== null ? arr_expense_details[index].charges : charges;
    return (
      <Form.Group className={styles.controlGroup} controlId="charges">
        <div className="select-container">
          <Form.Control
            as="select"
            value={value}
            onChange={(e) => {
              this.handleExpenseFieldChange(e, index);
            }}
            name="charges"
            required
            disabled={!editable}
          >
            <option value="" disabled>
              Select
            </option>
            {arr_charges.map((a) => (
              <option value={a.id}>{a.name}</option>
            ))}
          </Form.Control>
          {requiredFields.includes("charges")
            ? this.renderRequiredFieldError()
            : null}
        </div>
      </Form.Group>
    );
  };

  renderBillability = (index, editable) => {
    const { billability, arr_expense_details, requiredFields, arr_bill } =
      this.state;
    const value =
      index !== null ? arr_expense_details[index].billability : billability;
    return (
      <Form.Group className={styles.controlGroup} controlId="billability">
        <div className="select-container">
          <Form.Control
            as="select"
            value={value}
            onChange={(e) => {
              this.handleExpenseFieldChange(e, index);
            }}
            name="billability"
            required
            disabled={!editable}
          >
            <option value="" disabled>
              Select
            </option>
            {arr_bill.map((a) => (
              <option value={a.id}>{a.name}</option>
            ))}
          </Form.Control>
          {requiredFields.includes("billability")
            ? this.renderRequiredFieldError()
            : null}
        </div>
      </Form.Group>
    );
  };

  renderAttachment = (index, name) => {
    const {
      arr_expense_details,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;
    const value =
      index !== null ? arr_expense_details[index][name] : this.state[name];
    return (
      <div>
        <input
          type="file"
          accept=".pdf"
          name={name}
          style={{ display: "none" }}
          // ref={index === null ? this.fileInputRef : null}
          ref={this.fileInputRef}
          onChange={(e) => {
            this.handleExpenseFieldChange(e, index);
          }}
        />
        <UploadIcon onClick={this.handleUploadIconClick} />
      </div>
    );
  };
  handleUploadIconClick = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click();
    }
  };

  renderAddressEditableRow = () => {
    return (
      <tr>
        <td>{this.renderCharges(null, true)}</td>
        <td>{this.renderAmount(null, "amount")}</td>
        <td>{this.renderBillability(null, true)}</td>
        <td>{this.renderAttachment(null, "attachment")}</td>
      </tr>
    );
  };

  handleAddAddressRow = () => {
    const {
      charges,
      amount,
      billability,
      attachment,
      postalCode,
      arr_expense_details,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;

    if (requiredFieldsArray.includes("charges") && charges === "") {
      requiredFields.push("charges");
    }
    if (requiredFieldsArray.includes("amount") && amount === "") {
      requiredFields.push("amount");
    }
    if (requiredFieldsArray.includes("billability") && billability === "") {
      requiredFields.push("billability");
    }
    if (requiredFieldsArray.includes("attachment") && attachment === "") {
      requiredFields.push("attachment");
    }

    if (requiredFields.length > 0) {
      this.setState({ requiredFields: requiredFields }, () => {
        console.log("Returnig due to req fields");
      });
      return false;
    }

    const fields = ["charges", "amount", "billability", "attachment"];
    let isErrorPresent = false;
    for (const element of fields) {
      console.log("element: ", element);
      if (formErrors.includes(element)) {
        console.log("formErrors: ", formErrors);
        isErrorPresent = true;
      }
    }

    console.log("Returning due to errors");
    if (isErrorPresent) return false;

    arr_expense_details.push({
      charges: charges,
      amount: amount,
      billability: billability,
      attachment: attachment,
      editable: false,
    });

    this.setState({
      arr_expense_details: arr_expense_details,
      charges: "",
      amount: "",
      billability: "",
      attachment: null,
    });

    // Reset the file input field
    if (this.fileInputRef.current) {
      this.fileInputRef.current.value = ""; // Clear the file input
    }
  };

  handleRemoveAddressRow = (index) => {
    const { arr_expense_details } = this.state;
    arr_expense_details.splice(index, 1);
    this.setState({ arr_expense_details: arr_expense_details });
  };

  handleEditAddressRow = (index) => {
    const { arr_expense_details } = this.state;
    arr_expense_details[index].editable = true;
    this.setState({ arr_expense_details: arr_expense_details });
  };

  handleSaveAddressRow = (index) => {
    const { arr_expense_details } = this.state;
    arr_expense_details[index].editable = false;
    this.setState({ arr_expense_details: arr_expense_details });
  };

  renderExpenseDetails = () => {
    const { arr_expense_details, editable } = this.state;

    const isViewOnlyMode = editable === false;

    return (
      <div className={styles.divMain2}>
        <fieldset className={styles.fieldsetWrapper}>
          <div className={styles.mainLegendsWrapper}>
            <legend className={styles.legendsWrapper2}>Expense Details</legend>
            <legend className={styles.actionCell}>
              {editable != false ? (
                <i
                  class="fa fa-plus-circle"
                  aria-hidden="true"
                  onClick={this.handleAddAddressRow}
                ></i>
              ) : (
                <div style={{ margin: "10px" }} />
              )}
            </legend>
          </div>
          <table className={styles.addressTable}>
            <thead>
              <tr>
                <th>Charges</th>
                <th>Amount</th>
                <th>Billability</th>
                <th>Attachment</th>
                {(editable && true) ||
                  (editable == undefined && arr_expense_details.length != 0) ? (
                  <th>Action</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {arr_expense_details.map((row, index) => {
                return (
                  <tr
                    key={`add_row_${index}`}
                    className={row.editable ? "" : styles.readOnlyDataRow}
                  >
                    <td>{this.renderCharges(index, row.editable)}</td>
                    <td>
                      {row.editable ? (
                        this.renderAmount(index, "amount")
                      ) : (
                        <span>{row.amount}</span>
                      )}
                    </td>
                    <td>{this.renderBillability(index, row.editable)}</td>
                    <td>
                      {
                        row.editable ? (
                          <div>
                            {row.attachment != "" && <VisibilityIcon />}
                            {this.renderAttachment(index, "attachment")}
                          </div>
                        ) : // <UploadIcon
                          //   // onClick={() => this.handleUploadIconClick(data.id)}
                          //   style={{ cursor: "pointer" }} />
                          row.attachment == "" || row.attachment == null ? (
                            "Not Available"
                          ) : (
                            row.attachment.name
                          )
                        // <input
                        //   type="file"
                        //   accept=".pdf"
                        //   style={{ display: "none" }}
                        //   onChange={(e) => {
                        //     this.setState({ attachment: e.target.files[0] })
                        //   }}
                        // />
                      }
                    </td>
                    {!isViewOnlyMode ? (
                      <td className={styles.actionCell}>
                        <i
                          className="fa fa-times-circle-o"
                          aria-hidden="true"
                          onClick={(_e) => {
                            this.handleRemoveAddressRow(index);
                          }}
                        ></i>
                        {row.editable ? (
                          <i
                            class="fa fa-save"
                            aria-hidden="true"
                            onClick={(_e) => {
                              this.handleSaveAddressRow(index);
                            }}
                          ></i>
                        ) : (
                          <i
                            class="fa fa-edit"
                            aria-hidden="true"
                            onClick={(_e) => {
                              this.handleEditAddressRow(index);
                            }}
                          ></i>
                        )}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
              {!isViewOnlyMode ? this.renderAddressEditableRow() : null}
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  // handleUploadIconClick = (id) => {
  //   document.getElementById(`input${id}`).click();
  // };

  //#endregion

  //#region Stock Details

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

  renderStock = (index, editable) => {
    const { stock, arr_stock_details, requiredFields, arr_stock } = this.state;
    const value = index !== null ? arr_stock_details[index].stock : stock;
    return (
      <Form.Group className={styles.controlGroup} controlId="stock">
        <div className="select-container">
          <Form.Control
            as="select"
            value={value}
            onChange={(e) => {
              this.handleStockFieldChange(e, index);
            }}
            name="stock"
            required
            disabled={!editable}
          >
            <option value="" disabled>
              Select
            </option>
            {arr_stock.map((a) => (
              <option value={a.id}>{a.name}</option>
            ))}
          </Form.Control>
          {requiredFields.includes("stock")
            ? this.renderRequiredFieldError()
            : null}
        </div>
      </Form.Group>
    );
  };

  handleAddStockRow = () => {
    const {
      arr_stock_details,
      bill,
      stock,
      quantity,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;

    if (requiredFieldsArray.includes("stock") && stock === "") {
      requiredFields.push("stock");
    }
    if (requiredFieldsArray.includes("quantity") && quantity === "") {
      requiredFields.push("quantity");
    }

    if (requiredFields.length > 0) {
      this.setState({ requiredFields: requiredFields }, () => {
        console.log("Returnig due to req fields");
      });
      return false;
    }

    const fields = ["stock", "quantity"];
    let isErrorPresent = false;
    for (const element of fields) {
      console.log("element: ", element);
      if (formErrors.includes(element)) {
        console.log("formErrors: ", formErrors);
        isErrorPresent = true;
      }
    }

    console.log("Returning due to errors");
    if (isErrorPresent) return false;

    arr_stock_details.push({
      arr_stock_details: arr_stock_details,
      bill: bill,
      stock: stock,
      quantity: quantity,
      editable: false,
    });

    this.setState({
      arr_stock_details: arr_stock_details,
      bill: "",
      stock: "",
      quantity: "",
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

  rendeEditableField = (index, name) => {
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
          placeholder={`Enter ${this.camelCaseToWords(name)}`}
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
        <td>{this.rendeEditableField(null, "bill")}</td>
        <td>{this.renderStock(null, true)}</td>
        <td>{this.rendeEditableField(null, "quantity")}</td>
      </tr>
    );
  };

  renderStockDetails = () => {
    const { editable, arr_stock_details, requiredFields } = this.state;

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
          <div>
            {" "}
            <p style={{ color: "red", marginLeft: "3px", fontSize: "15px" }}>
              Fill-in only the client non-billable here only after raising
              dedicated stock order
            </p>
          </div>
          <table className={styles.addressTable}>
            <thead>
              <tr>
                <th>Bill Nr</th>
                <th>Stock Name</th>
                <th>Quantity</th>
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
                    <td>
                      {row.editable
                        ? this.rendeEditableField(index, "bill")
                        : row.bill}
                    </td>
                    <td>{this.renderStock(index, row.editable)}</td>
                    <td>
                      {row.editable
                        ? this.rendeEditableField(index, "quantity")
                        : row.quantity}
                    </td>
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

  renderRejectionReason = () => {
    const { editable, formErrors, requiredFields } = this.state;

    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Rejection Reason</legend>
          <Row className={styles.formRow}>
            <Col md={4}>
              <Form.Group
                className={styles.controlGroup}
                controlId="rejection_reason"
              >
                {/* <Form.Label>Report Description</Form.Label> */}
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={this.handleChange}
                  name="rejection_reason"
                  placeholder="Enter Reason"
                  required
                  style={{
                    height: 120,
                    resize: "none",
                  }}
                />
                {formErrors.includes("rejection_reason")
                  ? this.renderInvalidError()
                  : null}
                {requiredFields.includes("rejection_reason")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    const { id_wfa } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderBasicDetails()}
        {this.renderExpenseDetails()}
        {this.renderStockDetails()}
        {id_wfa == 16 && this.renderRejectionReason()}
      </Form>
    );
  };

  render() {
    const { setVisibility } = this.props;
    const {
      editable,
      is_loading,
      formErrors,
      requiredFields,
      arr_verify,
      id_selectedVerify,
      editableOrder,
      is_active,
      modalVisibility,
      ord_status_id,
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
          <DesignationModal
            visibility={modalVisibility}
            setVisibility={(v) => this.setState({ modalVisibility: v })}
            editable={editable}
            getData={() => this.getDropdown()}
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
              {`${editable == undefined ? "Create" : editable ? "Update" : "View"
                } Order Details`}
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
                      onChange={(e) => {
                        const selectedOption = e.target.selectedOptions[0];
                        this.setState({
                          id_selectedVerify: e.target.value,
                          id_wfa: selectedOption.id,
                        });
                      }}
                    >
                      <option value={0} disabled selected>
                        {"Select..."}
                      </option>
                      {arr_verify.map((b) => (
                        <option id={b.wfa_id} value={b.next_wfs_id}>
                          {b.wfa_name}
                        </option>
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

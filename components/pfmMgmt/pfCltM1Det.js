import React from "react";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import { Form, Row, Col, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UploadIcon from "@mui/icons-material/Upload";
import PfWfdHelper from "../../helper/pfmMgmt/pfWFDet";
import ClientHelper from "../../helper/pfmMgmt/pfCltM1Det";
import POCHelper from "../../helper/pfmMgmt/pfPocM1Det";
import AddressHelper from "../../helper/pfmMgmt/pfAddrDet";
import pfConstOptionHelper from "../../helper/pfmMgmt/pfConstOption";
import PfDocmM1Det from "../../helper/pfmMgmt/pfDocmM1Det";
import FileHelper from "../../helper/files";
import DesignationModal from "../../components/emMgmt/emDesignation";
import DocumentModal from "../../components/documentModal/documentSigned";
import {Input} from 'antd'

export default class EmCltDet extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      role_id: global.config.user_role,
      is_loading: false,
      file_name: undefined,
      selectedData: undefined,
      editable: undefined,
      editableOrder: false,
      documentEditVisibility: false,
      com_id: 503,
      is_active: true,
      id: "",
      // task_1 : variable_declare

      text_clt_name: "",
      text_clt_type_id: 1,
      clientName: "",
      cin_nr: "",
      gst_nr: "",
      state_id: "",
      addr_state_id: "",
      arr_state: [],
      clientType: 2,
      arr_address_type: [],
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
        "clientName",
        "clientType",
        "addressType",
        "addressLine1",
        "city",
        "State",
        "postalCode",
        "pointOfContact",
        "designation",
        "mobileNumber",
        "email",
        // "whatsappNo",
      ],
      id_selectedVerify: undefined,
      arr_verify: [],
      num_old_wfs: 1,
      access_role_user: global.config.access_role_list,
      bl_role_user: "",
      arr_clientType: [],
      pfAddDesign: false,
      modalVisibility: false,
      arr_documents: [
        {
          id: 104,
          document_name: "GST",
          file_name: "file_gst",
          file_type: ".pdf",
        },
      ],
      file_gst: "",
      file_id: "",
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
    const { editable } = this.state;
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }

    this.getDropdown();
    editable !== undefined && this.getRecord();
  }

  camelCaseToWords = (key) => {
    // Using regular expression to split the key into words
    const words = key.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
    // Capitalizing the first letter of the first word
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    // Joining the words with spaces
    return words.join(" ");
  };

  handleButtonClick = () => {
    this.setState({ pfAddDesign: true });
  };

  getDropdown() {
    const { tnnt_id } = this.state;

    const filter = {
      tnnt_id: tnnt_id,
      intl_id: "design_type",
    };

    const filter2 = {
      tnnt_id: tnnt_id,
      intl_id: "clt_type",
    };

    pfConstOptionHelper.getConstOptions(filter)
      .then((data) => {
        this.setState({ arr_designation: data });
      })
      .catch((err) => {
        console.log(err);
      });

    pfConstOptionHelper.getConstOptions(filter2)
      .then((data) => {
        this.setState({ arr_clientType: data });
      })
      .catch((err) => {
        console.log(err);
      });

    filter.intl_id = 'addr_type';

    pfConstOptionHelper.getConstOptions(filter)
      .then((data) => {
        this.setState({ arr_address_type: data });
      })
      .catch((err) => {
        console.log(err);
      });

    filter.intl_id = 'ind_states';

    pfConstOptionHelper.getConstOptions(filter)
      .then((data) => {
        this.setState({ arr_state: data });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getRecord() {
    const { id, tnnt_id } = this.state;

    const filter = {
      id: id,
      tnnt_id: tnnt_id,
    };
    console.log(filter);

    ClientHelper.getRecord(filter)
      .then((data) => {
        const stateData = {
          clientName: data[0].clt_name,
          cin_nr: data[0].cin_nr,
          gst_nr: data[0].gst_nr,
          clt_type_id: data[0].clt_type_id,
          created_by: data[0].created_by,
          is_active: data[0].is_active == "active" ? true : false,
        };

        const filter_record = {
          base_com_rec_id: id,
          tnnt_id: tnnt_id,
        };
        AddressHelper.getRecord(filter_record).then((res) => {
          stateData.addresses = res.map((rec) => {
            return {
              addressId: rec.id,
              cltBaseComId: rec.base_com_id,
              cltBaseRecId: rec.base_com_rec_id,
              addressType: rec.addr_type_id,
              addressLine1: rec.addr_line_1,
              addressLine2: rec.addr_line_2,
              addressLine3: rec.addr_line_3,
              city: rec.city,
              addr_state_id: rec.state_id,
              postalCode: rec.postal_code,
              country: "India",
              editable: false,
            };
          });

          const filter_clt = {
            base_com_rec_id: id,
            tnnt_id: tnnt_id,
          };

          POCHelper.getRecord(filter_clt).then((poc) => {
            stateData.pointOfContacts = poc.map((pocRec) => {
              return {
                pocId: pocRec.id,
                cltBaseComId: pocRec.base_com_id,
                cltBaseRecId: pocRec.base_com_rec_id,
                pointOfContact: pocRec.poc_name,
                designation: pocRec.design_id,
                email: pocRec.email_id,
                altEmail: pocRec.alt_email_id,
                mobileNumber: pocRec.mobile_nr,
                altMobileNumber: pocRec.alt_mobile_nr,
                whatsappNo: pocRec.wapp_nr,
                editable: false,
              };
            });

            const filter_doc = {
              base_com_rec_id: id,
              tnnt_id: tnnt_id,
            };

            PfDocmM1Det.getRecord(filter_doc).then((poc) => {
              console.log(poc)
              stateData.file_gst = (poc.length != 0) ? poc[0].docm : "";
              stateData.file_id =  (poc.length != 0) ? poc[0].id: "";
              // stateData.document_details = poc.map((pocRec) => {
              //   return {
              //     id: pocRec.id,
              //     base_com_id: pocRec.base_com_id,
              //     base_com_rec_id: pocRec.base_com_rec_id,
              //     docm_type_id: pocRec.docm_type_id,
              //     file_gst: pocRec.docm,
              //     editable: false,
              //   };
              // });

              this.setState(stateData);
            });
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //#region Insert Function
  async insertRecord() {
    const {
      tnnt_id,
      username,
      clientName,
      state_id,
      addr_state_id,
      gst_nr,
      cin_nr,
      clientType,
      addresses,
      pointOfContacts,
      arr_verify,
      id_selectedVerify,
      bl_role_user,
      file_gst,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (clientName === "") {
        // alertText += ". Company Name\n";
        alertText += ". Client Name\n";
      }

      // if (cin_nr === "") {
      //     alertText += ". CIN Nr\n";
      //   }

      if (clientType === undefined) {
        alertText += ". Client Type\n";
      }

      if (addresses.length == 0) {
        alertText += ". Address\n";
      }

      if (pointOfContacts.length == 0) {
        alertText += ". Point Of Contacts\n";
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
      this.setState({ is_loading: true });

      let data = {
        clt_name: clientName,
        cin_nr: cin_nr,
        gst_nr: gst_nr,
        clt_type_id: clientType,
        created_by: username,
        tnnt_id: tnnt_id,
        arr_addressDetails: addresses.map((add) => {
          return {
            base_com_id: 201,
            addr_type_id: add.addressType,
            addr_line_1: add.addressLine1,
            addr_line_2: add.addressLine2,
            addr_line_3: add.addressLine3,
            city: add.city,
            state_id: add.addr_state_id,
            postal_code: add.postalCode,
            country_id: 25,
            lc_status_id: 1,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        arr_pocDetails: pointOfContacts.map((poc) => {
          return {
            base_com_id: 401,
            design_id: poc.designation,
            poc_name: poc.pointOfContact,
            email_id: poc.email,
            alt_email_id: poc.altEmail,
            mobile_nr:
              poc.mobileNumber &&
                poc.mobileNumber.trim() !== "" &&
                poc.mobileNumber !== "+91"
                ? poc.mobileNumber
                : null,
            alt_mobile_nr:
              poc.altMobileNumber &&
                poc.altMobileNumber.trim() !== "" &&
                poc.altMobileNumber !== "+91"
                ? poc.altMobileNumber
                : null,
            wapp_nr:
              poc.whatsappNo &&
                poc.whatsappNo.trim() !== "" &&
                poc.whatsappNo !== "+91"
                ? poc.whatsappNo
                : null,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
      };

      const handleUpload = async (file, fieldName) => {
        if (file && file instanceof File) {
          const result = await FileHelper.upload(file, file.name, "test");
          const res = result.data;
          if (result.code === 200) {
            data = {
              ...data,
              arr_document: [{
                base_com_id: 301,
                docm: res.substring(res.lastIndexOf("/") + 1),
                docm_type_id: 104,
                created_by: username,
                tnnt_id: tnnt_id,
              }]
            };
          } else {
            Swal.fire({
              text: "Failed to upload Gst File",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        }
      };

      await handleUpload(file_gst, "file_gst");
      console.log(data);

      ClientHelper.insertBatch(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text:
                "Your record ID " +
                data.id +
                " has been successfully created!!",
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
      clientName,
      clientType,
      file_id,
      addresses,
      pointOfContacts,
      file_gst,
      cin_nr,
      gst_nr,
    } = this.state;

    try {
      const alertInitial = "";
      let alertText = alertInitial;

      if (clientName === "") {
        alertText += ". Client Name\n";
      }

      // if (cin_nr === "") {
      //   alertText += ". CIN Nr\n";
      // }

      if (clientType === undefined) {
        alertText += ". Client Type\n";
      }

      if (addresses.length == 0) {
        alertText += ". Address\n";
      }

      if (pointOfContacts.length == 0) {
        alertText += ". Point Of Contacts\n";
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
      this.setState({ is_loading: true });

      let data = {
        id: id,
        clt_name: clientName,
        cin_nr: cin_nr,
        gst_nr: gst_nr,
        clt_type_id: clientType,
        created_by: username,
        tnnt_id: tnnt_id,
        is_active: is_active == false ? "inactive" : "active",
        arr_addressDetails: addresses?.map((add) => {
          return {
            id: add.addressId,
            base_com_id: 201,
            base_com_rec_id: add.cltBaseRecId,
            addr_type_id: add.addressType,
            addr_line_1: add.addressLine1,
            addr_line_2: add.addressLine2,
            addr_line_3: add.addressLine3,
            city: add.city,
            state_id: add.addr_state_id,
            postal_code: add.postalCode,
            country_id: 1,
            lc_status_id: 1,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
        arr_pocDetails: pointOfContacts.map((poc) => {
          return {
            id: poc.pocId,
            design_id: poc.designation,
            base_com_id: 401,
            base_com_rec_id: poc.base_com_rec_id,
            poc_name: poc.pointOfContact,
            email_id: poc.email,
            alt_email_id: poc.altEmail,
            mobile_nr:
              poc.mobileNumber &&
                poc.mobileNumber.trim() !== "" &&
                poc.mobileNumber !== "+91"
                ? poc.mobileNumber
                : null,
            alt_mobile_nr:
              poc.altMobileNumber &&
                poc.altMobileNumber.trim() !== "" &&
                poc.altMobileNumber !== "+91"
                ? poc.altMobileNumber
                : null,
            wapp_nr:
              poc.whatsappNo &&
                poc.whatsappNo.trim() !== "" &&
                poc.whatsappNo !== "+91"
                ? poc.whatsappNo
                : null,
            lc_status_id: 1,
            created_by: username,
            tnnt_id: tnnt_id,
          };
        }),
      };

      const handleUpload = async (file, fieldName) => {
        if (file && file instanceof File) {
          const result = await FileHelper.upload(file, file.name, "test");
          const res = result.data;
          if (result.code === 200) {
            data = {
              ...data,
              arr_document: [{
                id: file_id != "" ? file_id: undefined,
                base_com_id: 301,
                docm: res.substring(res.lastIndexOf("/") + 1),
                docm_type_id: 104,
                created_by: username,
                tnnt_id: tnnt_id,
              }]
            };
            console.log("data..", data);
          } else {
            Swal.fire({
              text: "Failed to upload GST",
              confirmButtonColor: Colors.red,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.setState({ is_loading: false });
          }
        } else {
          // data = {
          //   ...data,
          //   [fieldName]: file,
          // };
          data = {
            ...data,
            arr_document: [{
              id: file_id,
              base_com_id: 301,
              docm: file,
              docm_type_id: 104,
              created_by: username,
              tnnt_id: tnnt_id,
            }]
          };
        }
      };

      await handleUpload(file_gst, "file_gst");

      ClientHelper.updateBatch(data)
        .then((data) => {
          if (data.code == 200) {
            this.props.getData();
            Swal.fire({
              text: "Successfully Updated!!",
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
          this.setState({ is_loading: false });
        });
    } catch (err) {
      console.log(err);
      this.setState({ is_loading: false });
    }
  }
  //#region Update Function End

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
      case "pointOfContact":
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

  renderClientDetails = () => {
    const {
      editable,
      clientName,
      state_id,
      arr_state,
      cin_nr,
      gst_nr,
      clientType,
      formErrors,
      requiredFields,
      arr_clientType,
    } = this.state;
    const disabled = editable !== undefined && !editable;

    return (
      <div className={styles.divMain1}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Basic Details</legend>
          <Row className={styles.formRow}>
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup}
                controlId="clientName"
              >
                <Form.Label className={styles.required}>Client Name</Form.Label>
                {/* <Form.Control
                  type="text"
                  placeholder="Enter Client Name"
                  value={clientName}
                  onChange={this.handleChange}
                  name="clientName"
                  required
                  readOnly={disabled}
                /> */}

<div className={styles.ant_input}>
                     <Input
                      value={clientName}
                      maxLength={50}
                      onChange={this.handleChange}
                      placeholder="Enter Client Name"
                      style={{ paddingBottom: '10px' }} 
                      name="clientName"
                      required
                     />
      {/* Custom Character Count */}
                     <div className={styles.ant_cus_count}>
                     ({clientName.length} / 50)
                    </div>
                   </div>
                {formErrors.includes("clientName")
                  ? this.renderInvalidError()
                  : null}
                {requiredFields.includes("clientName")
                  ? this.renderRequiredFieldError()
                  : null}
              </Form.Group>
            </Col>
            <Col md={6}>
              {/* <Form.Group
                className={styles.controlGroup}
                controlId="clientType"
              >
                <Form.Label className={styles.required}>Client Type</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    className="form-select no-arrow"
                    value={clientType}
                    onChange={
                      this.handleChange
                    }
                    name="designation"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_clientType.map((a) => (
                      <option value={a.id}>{a.option_name}</option>
                    ))}
                  </Form.Control>
                  {requiredFields.includes("clientType")
                    ? this.renderRequiredFieldError()
                    : null}
                </div>
              </Form.Group> */}

<Form.Group className={styles.controlGroup} controlId="ClientType">
<Form.Label className={styles.required}>Client Type</Form.Label>
        <Form.Control
          as="select"
          value={clientType}
          className="form-select"
          onChange={(e) => {
            this.handleChange
          }}
          
          name="ClientType"
          required
          disabled={disabled}
        >
          <option value="" disabled>
            Select
          </option>
          {arr_clientType.map((a) => (
            <option value={a.id}>{a.option_name}</option>
          ))}
        </Form.Control>
        {requiredFields.includes("clientType")
          ? this.renderRequiredFieldError()
          : null}
      </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className={styles.controlGroup} controlId="cin_nr">
                <Form.Label className={styles.form_name}>CIN Nr:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter CIN Nr"
                  value={cin_nr}
                  onChange={this.handleChange}
                  name="cin_nr"
                  required
                  readOnly={disabled}
                />
                {formErrors.includes("cin_nr")
                  ? this.renderInvalidError()
                  : null}
                {/* {requiredFields.includes("cin_nr")
                  ? this.renderRequiredFieldError()
                  : null} */}
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className={styles.controlGroup} controlId="gst_nr">
                <Form.Label className={styles.form_name}>GST Nr:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter GST Nr"
                  value={gst_nr}
                  onChange={this.handleChange}
                  name="gst_nr"
                  readOnly={disabled}
                />
              </Form.Group>
            </Col>
            {/* 
            <Col md={6}>
              <Form.Group
                className={styles.controlGroup}
                controlId="state_id"
              >
                <Form.Label>Company registration state</Form.Label>
                <div className="select-container">
                  <Form.Control
                    as="select"
                    value={state_id}
                    onChange={this.handleChange}
                    name="state_id"
                    required
                    disabled={disabled}
                  >
                    <option value="" disabled>
                      Select
                    </option>
                    {arr_state.map((a) => (
                      <option value={a.id}>{a.name}</option>
                    ))}
                  </Form.Control>
                  {/* {requiredFields.includes("state_id")
                    ? this.renderRequiredFieldError()
                    : null} 
                </div>
              </Form.Group>
            </Col> 
  */}

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

  //#region Client Address Details

  handleAddressFieldChange = (event, index, lineIndex = null) => {
    const { name, value, required } = event.target;
    let { formErrors, requiredFields } = this.state;
    if (lineIndex === null || lineIndex === 1) {
      if (value !== "") {
        requiredFields = this.removeFromArray(requiredFields, name);
        if (!this.validateInput(event)) {
          if (!formErrors.includes(name)) formErrors.push(name);
        } else {
          formErrors = this.removeFromArray(formErrors, name);
        }
      } else {
        if (required && !requiredFields.includes(name))
          requiredFields.push(name);
        formErrors = this.removeFromArray(formErrors, name);
      }
    }

    const stateObject = {
      formErrors: formErrors,
      requiredFields: requiredFields,
    };

    if (index !== null) {
      const { addresses } = this.state;
      addresses[index][name] = value;
      stateObject.addresses = addresses;
    } else {
      stateObject[name] = value;
    }

    this.setState(stateObject);
  };

  renderAddressType = (index) => {
    const { arr_address_type, addressType, addresses, requiredFields } = this.state;
    const value = index !== null ? addresses[index].addressType : addressType;
    return (
      <Form.Group className={styles.controlGroup} controlId="addressType">
        <Form.Control
          as="select"
          value={value}
          className="form-select"
          onChange={(e) => {
            this.handleAddressFieldChange(e, index, null);
          }}
          title={value == "1" ? "Head Office" : "Branch Office"}
          name="addressType"
          required
        >
          <option value="" disabled>
            Select
          </option>
          {arr_address_type.map((a) => (
            <option value={a.id}>{a.option_name}</option>
          ))}
        </Form.Control>
        {requiredFields.includes("addressType")
          ? this.renderRequiredFieldError()
          : null}
      </Form.Group>
    );
  };

  renderAddressLines = (index, lineIndex) => {
    const { addresses, requiredFields } = this.state;
    const value =
      index !== null
        ? addresses[index][`addressLine${lineIndex}`]
        : this.state[`addressLine${lineIndex}`];
    return (
      <Form.Group
        className={styles.controlGroup}
        controlId={`addressLine${lineIndex}`}
      >
        <Form.Control
          type="text"
          placeholder={`Enter address line ${lineIndex}`}
          value={value}
          title={value}
          onChange={(e) => {
            this.handleAddressFieldChange(e, index, lineIndex);
          }}
          name={`addressLine${lineIndex}`}
          required={lineIndex == 1 ? true : false}
        />
        {requiredFields.includes(`addressLine${lineIndex}`)
          ? this.renderRequiredFieldError()
          : null}
      </Form.Group>
    );
  };

  renderAddressField = (index, name) => {
    const { addresses, requiredFields, formErrors } = this.state;
    const value = index !== null ? addresses[index][name] : this.state[name];
    return (
      <Form.Group className={styles.controlGroup} controlId={name}>
        <Form.Control
          type="text"
          placeholder={`Enter ${this.camelCaseToWords(name)}`}
          value={value}
          onChange={(e) => {
            this.handleAddressFieldChange(e, index, null);
          }}
          name={name}
          required
        />
        {formErrors.includes(name) ? this.renderInvalidError() : null}
        {requiredFields.includes(name) ? this.renderRequiredFieldError() : null}
      </Form.Group>
    );
  };

  renderState = (index, editable) => {
    const { addr_state_id, addresses, requiredFields, arr_state } = this.state;
    console.log(addr_state_id);
    const value =
      index !== null ? addresses[index].addr_state_id : addr_state_id;
    console.log(value);
    return (
      <Form.Group className={styles.controlGroup} controlId="addr_state_id">
        <div className="select-container">
          <Form.Control
            as="select"
            className="form-select"
            value={value}
            onChange={(e) => {
              this.handleAddressFieldChange(e, index, null);
            }}
            name="addr_state_id"
            required
            disabled={!editable}
          >
            <option value="" disabled>
              Select
            </option>
            {arr_state.map((a) => (
              <option value={a.id}>{a.option_name}</option>
            ))}
          </Form.Control>
          {requiredFields.includes("addr_state_id")
            ? this.renderRequiredFieldError()
            : null}
        </div>
      </Form.Group>
    );
  };

  renderCountry = () => {
    return (
      <Form.Group className={styles.controlGroup} controlId="country">
        <Form.Control
          type="text"
          placeholder="Enter postal code"
          value={"India"}
          readOnly={true}
        />
      </Form.Group>
    );
  };

  renderAddressEditableRow = () => {
    return (
      <tr>
        <td>{this.renderAddressType(null)}</td>
        <td>{this.renderAddressLines(null, 1)}</td>
        <td>{this.renderAddressLines(null, 2)}</td>
        <td>{this.renderAddressLines(null, 3)}</td>
        <td>{this.renderAddressField(null, "city")}</td>
        <td>{this.renderState(null, true)}</td>
        <td>{this.renderAddressField(null, "postalCode")}</td>
        <td>{this.renderCountry()}</td>
      </tr>
    );
  };

  handleAddAddressRow = () => {
    const {
      addressType,
      addressLine1,
      addressLine2,
      addressLine3,
      city,
      addr_state_id,
      state,
      postalCode,
      addresses,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;

    if (requiredFieldsArray.includes("addressType") && addressType === "") {
      requiredFields.push("addressType");
    }
    if (requiredFieldsArray.includes("addressLine1") && addressLine1 === "") {
      requiredFields.push("addressLine1");
    }
    if (requiredFieldsArray.includes("city") && city === "") {
      requiredFields.push("city");
    }
    if (requiredFieldsArray.includes("postalCode") && postalCode === "") {
      requiredFields.push("postalCode");
    }

    if (requiredFields.length > 0) {
      this.setState({ requiredFields: requiredFields }, () => {
        console.log("Returnig due to req fields");
      });
      return false;
    }

    const fields = [
      "addressType",
      "addressLine1",
      "addressLine2",
      "addressLine3",
      "city",
      "state",
      "postalCode",
    ];
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

    addresses.push({
      addressType: addressType,
      addressLine1: addressLine1,
      addressLine2: addressLine2,
      addressLine3: addressLine3,
      city: city,
      addr_state_id: addr_state_id,
      postalCode: postalCode,
      country: "India",
      editable: false,
    });

    this.setState({
      addresses: addresses,
      addressType: "",
      addressLine1: "",
      addressLine2: "",
      addressLine3: "",
      city: "",
      addr_state_id: "",
      postalCode: "",
    });
  };

  handleRemoveAddressRow = (index) => {
    const { addresses } = this.state;
    addresses.splice(index, 1);
    this.setState({ addresses: addresses });
  };

  handleEditAddressRow = (index) => {
    const { addresses } = this.state;
    addresses[index].editable = true;
    this.setState({ addresses: addresses });
  };

  handleSaveAddressRow = (index) => {
    const { addresses } = this.state;
    addresses[index].editable = false;
    this.setState({ addresses: addresses });
  };

  renderAddressTable = () => {
    const { addresses, editable, arr_state, requiredFields } = this.state;

    const isViewOnlyMode = editable === false;

    return (
      <div className={styles.divMain2}>
        <fieldset className={styles.fieldsetWrapper}>
          <div className={styles.mainLegendsWrapper}>
            <legend className={styles.legendsWrapper2}>Address Details</legend>
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
                <th className={styles.required}>Address Type</th>
                <th className={styles.required}>Address Line 1</th>
                <th>Address Line 2</th>
                <th>Address Line 3</th>
                <th className={styles.required}>City</th>
                <th className={styles.required}>State</th>
                <th className={styles.required}>Postal Code</th>
                <th>Country</th>
                {(editable && true) ||
                  (editable == undefined && addresses.length != 0) ? (
                  <th>Action</th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {addresses.map((row, index) => {
                return (
                  <tr
                    key={`add_row_${index}`}
                    className={row.editable ? "" : styles.readOnlyDataRow}
                  >
                    <td>
                      {row.editable ? (
                        this.renderAddressType(index)
                      ) : (
                        <span>
                          {row.addressType == "1"
                            ? "Head Office"
                            : "Branch Office"}
                        </span>
                      )}
                    </td>
                    <td>
                      {row.editable ? (
                        this.renderAddressLines(index, 1)
                      ) : (
                        <span>{row.addressLine1}</span>
                      )}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderAddressLines(index, 2)
                        : row.addressLine2}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderAddressLines(index, 3)
                        : row.addressLine3}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderAddressField(index, "city")
                        : row.city}
                    </td>
                    <td>
                      {this.renderState(index, row.editable)}
                      {/* <Form.Group
                        className={styles.controlGroup}
                        controlId="addr_state_id"
                      >
                        <div className="select-container">
                          <Form.Control
                            as="select"
                            value={row.addr_state_id}
                            onChange={this.handleChange}
                            name="addr_state_id"
                            required

                          >
                            <option value="" disabled>
                              Select
                            </option>
                          {arr_state.map((a) => (
                            <option value={a.id}>{a.name}</option>
                          ))}
                          </Form.Control>
                          {requiredFields.includes("addr_state_id")
                            ? this.renderRequiredFieldError()
                            : null}
                        </div>
                      </Form.Group> */}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderAddressField(index, "postalCode")
                        : row.postalCode}
                    </td>
                    <td>{this.renderCountry()}</td>
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

  //#endregion

  //#region Point of Contact Details

  handlePOCFieldChange = (event, index) => {
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
      const { pointOfContacts } = this.state;
      pointOfContacts[index][name] = value;
      stateObject.pointOfContacts = pointOfContacts;
    } else {
      stateObject[name] = value;
    }

    this.setState(stateObject);
  };

  renderDesignation = (index, editable) => {
    const { designation, pointOfContacts, requiredFields, arr_designation } =
      this.state;
    const value =
      index !== null ? pointOfContacts[index].designation : designation;
    return (
      <Form.Group className={styles.controlGroup} controlId="designation">
        <div className="select-container">
          <Form.Control
            as="select"
            className="form-select"
            value={value}
            onChange={(e) => {
              this.handlePOCFieldChange(e, index);
            }}
            name="designation"
            required
            disabled={!editable}
          >
            <option value="" disabled>
              Select
            </option>
            {arr_designation.map((a) => (
              <option value={a.id}>{a.option_name}</option>
            ))}
          </Form.Control>
          {requiredFields.includes("designation")
            ? this.renderRequiredFieldError()
            : null}
        </div>
      </Form.Group>
    );
  };

  handleAddPOCRow = () => {
    const {
      pointOfContact,
      designation,
      mobileNumber,
      altMobileNumber,
      email,
      altEmail,
      whatsappNo,
      pointOfContacts,
      formErrors,
      requiredFields,
      requiredFieldsArray,
    } = this.state;

    if (
      requiredFieldsArray.includes("pointOfContact") &&
      pointOfContact === ""
    ) {
      requiredFields.push("pointOfContact");
    }
    if (requiredFieldsArray.includes("designation") && designation === "") {
      requiredFields.push("designation");
    }
    if (requiredFieldsArray.includes("email") && email === "") {
      requiredFields.push("email");
    }
    if (
      requiredFieldsArray.includes("mobileNumber") &&
      (mobileNumber === "" || mobileNumber === "+91")
    ) {
      requiredFields.push("mobileNumber");
    }
    if (
      requiredFieldsArray.includes("whatsappNo") &&
      (whatsappNo === "" || whatsappNo === "+91")
    ) {
      requiredFields.push("whatsappNo");
    }

    if (requiredFields.length > 0) {
      this.setState({ requiredFields: requiredFields }, () => {
        console.log("Returnig due to req fields");
      });
      return false;
    }

    const fields = [
      "pointOfContact",
      "designation",
      "mobileNumber",
      "altMobileNumber",
      "email",
      "altEmail",
      "whatsappNo",
    ];
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

    pointOfContacts.push({
      pointOfContact: pointOfContact,
      designation: designation,
      mobileNumber: mobileNumber,
      altMobileNumber: altMobileNumber,
      email: email,
      altEmail: altEmail,
      whatsappNo: whatsappNo,
      editable: false,
    });

    this.setState({
      pointOfContacts: pointOfContacts,
      pointOfContact: "",
      designation: "",
      mobileNumber: "",
      altMobileNumber: "",
      email: "",
      altEmail: "",
      whatsappNo: "",
    });
  };

  handleEditPOCRow = (index) => {
    const { pointOfContacts } = this.state;
    pointOfContacts[index].editable = true;
    this.setState({ pointOfContacts: pointOfContacts });
  };

  handleSavePOCRow = (index) => {
    const { pointOfContacts } = this.state;
    pointOfContacts[index].editable = false;
    this.setState({ pointOfContacts: pointOfContacts });
  };

  handleRemovePOCRow = (index) => {
    console.log("index: ", index);
    const { pointOfContacts } = this.state;
    pointOfContacts.splice(index, 1);
    this.setState({ pointOfContacts: pointOfContacts });
  };

  renderPOCEditableField = (index, name) => {
    const { pointOfContacts, formErrors, requiredFields, requiredFieldsArray } =
      this.state;
    const value =
      index !== null ? pointOfContacts[index][name] : this.state[name];

    return (
      <Form.Group className={styles.controlGroup} controlId={name}>
        <Form.Control
          type="text"
          placeholder={`Enter ${this.camelCaseToWords(name)}`}
          value={value}
          onChange={(e) => {
            this.handlePOCFieldChange(e, index);
          }}
          name={name}
          required={requiredFieldsArray.includes(name)}
        />
        {formErrors.includes(name) ? this.renderInvalidError() : null}
        {requiredFields.includes(name) ? this.renderRequiredFieldError() : null}
      </Form.Group>
    );
  };

  renderPOCEditableRow = () => {
    const { editable } =
      this.state;
    const disabled = editable !== undefined && !editable;
    return (
      <tr>
        <td>{this.renderPOCEditableField(null, "pointOfContact")}</td>
        {/* <td>{this.renderPOCEditableField(null, "designation")}</td> */}
        <td>{this.renderDesignation(null, true)}</td>
        <td>{this.renderPOCEditableField(null, "mobileNumber")}</td>
        <td>{this.renderPOCEditableField(null, "altMobileNumber")}</td>
        <td>{this.renderPOCEditableField(null, "email")}</td>
        <td>{this.renderPOCEditableField(null, "altEmail")}</td>
        <td>{this.renderPOCEditableField(null, "whatsappNo")}</td>
      </tr>
    );
  };

  renderPointOfContact = () => {
    const { editable, pointOfContacts } =
      this.state;

    // const disabled = editable !== undefined && !editable;

    const isViewOnlyMode = editable === false;

    return (
      <div className={styles.divMain3}>
        <fieldset className={styles.fieldsetWrapper}>
          <div className={styles.mainLegendsWrapper}>
            <legend className={styles.legendsWrapper3}>
              Point Of Contacts
            </legend>
            <legend className={styles.actionCell}>
              {editable != false ? (
                <div>
                  <button
                    className={`button`}
                    style={{ fontSize: "15px" }}
                    onClick={() =>
                      this.setState({
                        modalVisibility: true,
                        editable: undefined,
                      })
                    }
                  >
                    Add Designation
                  </button>
                  <i
                    class="fa fa-plus-circle"
                    aria-hidden="true"
                    onClick={this.handleAddPOCRow}
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
                <th className={styles.required}>Name</th>
                <th className={styles.required}>Designation</th>
                <th className={styles.required}>Mobile Number</th>
                <th>Alternate Mobile Number</th>
                <th className={styles.required}>Email</th>
                <th>Alternate Email</th>
                <th>Whatsapp Number</th>
                {editable && true ? <th>Action</th> : null}
              </tr>
            </thead>
            <tbody>
              {pointOfContacts.map((row, index) => {
                return (
                  <tr
                    key={`poc_row_${index}`}
                    className={styles.readOnlyDataRow}
                  >
                    <td>
                      {row.editable
                        ? this.renderPOCEditableField(index, "pointOfContact")
                        : row.pointOfContact}
                    </td>
                    <td>
                      {/* {row.editable
                        ? this.renderPOCEditableField(index, "designation")
                        : row.designation} */}
                      {this.renderDesignation(index, row.editable)}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderPOCEditableField(index, "mobileNumber")
                        : row.mobileNumber}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderPOCEditableField(index, "altMobileNumber")
                        : row.altMobileNumber}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderPOCEditableField(index, "email")
                        : row.email}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderPOCEditableField(index, "altEmail")
                        : row.altEmail}
                    </td>
                    <td>
                      {row.editable
                        ? this.renderPOCEditableField(index, "whatsappNo")
                        : row.whatsappNo}
                    </td>
                    {!isViewOnlyMode ? (
                      <td className={styles.actionCell}>
                        <i
                          className="fa fa-times-circle-o"
                          aria-hidden="true"
                          onClick={(e) => {
                            this.handleRemovePOCRow(index);
                          }}
                        ></i>
                        {row.editable ? (
                          <i
                            class="fa fa-save"
                            aria-hidden="true"
                            onClick={(e) => {
                              this.handleSavePOCRow(index);
                            }}
                          ></i>
                        ) : (
                          <i
                            class="fa fa-edit"
                            aria-hidden="true"
                            onClick={(e) => {
                              this.handleEditPOCRow(index);
                            }}
                          ></i>
                        )}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
              {!isViewOnlyMode ? this.renderPOCEditableRow() : null}
            </tbody>
          </table>
        </fieldset>
      </div>
    );
  };

  handleFileSelect = (file, type) => {
    console.log("type", type);
    switch (type) {
      case "GST": {
        this.setState({ file_gst: file });
        break;
      }
      default: {
        break;
      }
    }
  };

  handleUploadIconClick = (id) => {
    document.getElementById(`input${id}`).click();
  };

  async handleImageUrl(file_name) {
    const fileUrl = this.state[file_name];

    if (fileUrl == null || fileUrl == "") {
      Swal.fire({
        icon: "info",
        text: "There is no file to view!",
        confirmButtonColor: Colors.primaryColor,
        allowOutsideClick: false,
      });
      return;
    } else if (fileUrl instanceof File) {
      const file_url = URL.createObjectURL(fileUrl);
      this.setState({
        file_name: fileUrl.name,
        selectedData: file_url,
        documentEditVisibility: true,
      });
    } else {
      const file_type = fileUrl.split(".").pop();
      let result;
      file_type == "html"
        ? (result = await FileHelper.getFile(fileUrl))
        : (result = await FileHelper.getSignedUrl(fileUrl));
      this.setState({
        file_name: fileUrl,
        selectedData: result,
        documentEditVisibility: true,
      });
    }
  }

  renderFileUpload = () => {
    const { editable, arr_documents, file_gst } = this.state;

    return (
      <div className={styles.divMain2}>
        <fieldset className={styles.fieldsetWrapper}>
          <legend className={styles.legendsWrapper1}>Upload Documents</legend>
          <Row className={styles.formRow}>
            <Table hover>
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Status</th>
                  <th>View</th>
                  {editable != false && <th>Upload</th>}
                </tr>
              </thead>
              <tbody>
                {arr_documents.map((data) => {
                  return (
                    <tr
                      class={
                        this.state[data.file_name] == null ||
                          this.state[data.file_name] == ""
                          ? "table-danger"
                          : "table-success"
                      }
                    >
                      <td>
                        {data.document_name}
                      </td>
                      <td>
                        {this.state[data.file_name] == null ||
                          this.state[data.file_name] == ""
                          ? "Not Uploaded"
                          : "Uploaded"}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <div
                          onClick={() => this.handleImageUrl(data.file_name)}
                        >
                          <VisibilityIcon />
                        </div>
                      </td>
                      {editable != false && (
                        <td style={{ textAlign: "center" }}>
                          <UploadIcon
                            onClick={() => this.handleUploadIconClick(data.id)}
                            style={{ cursor: "pointer" }}
                          />
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png,.jpmg"
                            id={`input${data.id}`}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              this.handleFileSelect(
                                e.target.files[0],
                                data.document_name
                              );
                            }}
                          />
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Row>
        </fieldset>
      </div>
    );
  };

  renderCreateRecordForm = () => {
    return (
      <Form onSubmit={this.handleSubmit} className={styles.formWrapper}>
        {this.renderClientDetails()}
        {this.renderPointOfContact()}
        {this.renderAddressTable()}
        {this.renderFileUpload()}
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
      selectedData,
      is_active,
      modalVisibility,
      documentEditVisibility,
      file_name,
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

        {documentEditVisibility && (
          <DocumentModal
            visibility={documentEditVisibility}
            setVisibility={(v) => this.setState({ documentEditVisibility: v })}
            data={selectedData}
            file_name={file_name}
          />
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
                } Client`}
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
                    {"Submit"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

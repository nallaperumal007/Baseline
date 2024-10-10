import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Colors from "../../constants/colors";
import styles from "../../styles/createcom.module.css";
import CustomInput from "../customInput/customInput";
import SampleHelper from "../../helper/pfmMgmt/pfConstOption";

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    const stateData = {
      tnnt_id: global.config.tnnt_id,
      username: "",
      is_loading: false,
      com_id: 0,
      is_active: true,
      id: "",
      txt_name: "",
      arr_options_data: [
        {
          option_name: "",
          const_type_id: "",
          created_by: global.config.username,
          tnnt_id: global.config.tnnt_id,
        },
      ],
      const_type_id: undefined,
      txt_title: "",
    };

    this.state = {
      ...stateData,
    };
  }
  componentDidMount() {
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }
    this.getConstType();
  }

  getConstType() {
    if (this.props.com_id == 507 && this.props.const_type_intl_id == 'stock_type') {
      this.setState({ 
        const_type_id: 32,
        txt_title: "Stock"
       })
    }
  }

  validateInputs = () => {
    const { arr_options_data } = this.state;

    for (let i = 0; i < arr_options_data.length; i++) {
      const { option_name } = arr_options_data[i];
      if (!option_name) {
        return false;
      }
    }
    return true;
  };

  async insertRecord() {
    const { arr_options_data } = this.state;

    try {
      if (!this.validateInputs()) {
        Swal.fire({
          text: "Please fill in all fields before submitting.",
          confirmButtonColor: Colors.red,
          width: Colors.width,
          allowOutsideClick: false,
        });
        return;
      }

      const data = {};
      data.arr_options_data = arr_options_data;

      this.setState({ is_loading: true });
      SampleHelper.insertMulti(data)
        .then((data) => {
          if (data.code == 200) {
            Swal.fire({
              text: "Successfullt Submited!!",
              confirmButtonColor: Colors.primaryColor,
              width: Colors.width,
              allowOutsideClick: false,
            });
            this.props.getData();
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

  handleAddRow = () => {
    const { tnnt_id, username } = this.state;
    this.setState((prevState) => ({
      arr_options_data: [
        ...prevState.arr_options_data,
        { option_name: "", const_type_id: "", created_by: username, tnnt_id: tnnt_id },
      ],
    }));
  };

  handleInputChange = (index, field, value) => {
    const { const_type_id } = this.state;
    const newTagDetails = [...this.state.arr_options_data];
    newTagDetails[index][field] = value;
    newTagDetails[index]["const_type_id"] = const_type_id;
    this.setState({ arr_options_data: newTagDetails });
  };

  render() {
    const { setVisibility } = this.props;
    const { is_loading, arr_options_data, txt_title } = this.state;

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
            <p className={styles.title}>{`Add ${txt_title} `}</p>

            <div className={`${styles.button} ${styles.actionCell}`}>
              <i
                class="fa fa-plus-circle"
                aria-hidden="true"
                onClick={this.handleAddRow}
              ></i>
            </div>
            <div>
              <table className={`table ${styles.table}`}>
                <thead>
                  <tr>
                    <th>
                      {txt_title}
                      <span
                        style={{
                          color: "red",
                          marginLeft: "3px",
                          fontSize: "20px",
                        }}
                      >
                        *
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {arr_options_data.map((row, index) => (
                    <tr key={index}>
                      <td>
                        <div
                          className={styles.inputAlignment}
                          style={{ justifyContent: "center" }}
                        >
                          <div className={styles.inputCustom}>
                            <CustomInput
                              inputType="text"
                              value={row.name}
                              onChange={(e) =>
                                this.handleInputChange(
                                  index,
                                  "option_name",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={styles.inputAlignment}>
              <p className={`mandatory`}>* are mandatory fields</p>
            </div>

            <div className={styles.button}>
              <div className={styles.button}>
                <button
                  className={`button`}
                  onClick={() => this.insertRecord()}
                >
                  {"Submit"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

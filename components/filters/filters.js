import React from "react";
import styles from "./filters.module.css";

const COMMON_FILTERS = [
  {
    id: 1,
    title: "Active",
    value: "active",
  },
  {
    id: 2,
    title: "In-Active",
    value: "inactive",
  },
  {
    id: 3,
    title: "All",
    value: "all",
  },
];

export default class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelection: "all",
    };
  }

  handleOnChange = (event) => {
    const value = event.target.value;
    this.setState({
      currentSelection: value,
    });
  };

  handleOnClickSubmit = () => {
    console.log("Clicked submit");
    const { onClickSubmit } = this.props;
    const { currentSelection } = this.state;
    let option = currentSelection === "all" ? undefined : currentSelection;
    onClickSubmit(option);
  };

  handleClearFilter = () => {
    this.setState({ currentSelection: "all" }, () => {
      this.handleOnClickSubmit();
    });
  };

  render() {
    const { title, onClickSubmit } = this.props;
    const { currentSelection } = this.state;
    return (
      <div className={styles.mainWrapper}>
        <span className={styles.title}>{title}:</span>
        <select
          className={styles.select}
          value={currentSelection}
          onChange={this.handleOnChange.bind(this)}
        >
          {COMMON_FILTERS.map((option) => {
            return (
              <option key={option.id} value={option.value}>
                {option.title}
              </option>
            );
          })}
        </select>

        <div className={styles.buttonsWrapper}>
          <button
            className={`button`}
            onClick={this.handleOnClickSubmit.bind(this)}
          >
            Submit
          </button>
          <button
            className={`button`}
            onClick={this.handleClearFilter.bind(this)}
          >
            Clear Filter
          </button>
        </div>
      </div>
    );
  }
}

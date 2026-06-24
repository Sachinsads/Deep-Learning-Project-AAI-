import React, { Component } from "react";

class Supersquare extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: "",
      result: "",
    };
  }

  handleChange = (event) => {
    this.setState({ number: event.target.value });
  };

  checkSupersquare = () => {
    const num = this.state.number;
    if (num.length !== 4) {
      this.setState({ result: "Please enter a 4-digit number" });
      return;
    }
    const validDigits = ["0", "1", "4", "9"];
    let isSupersquare = true;
    for (let digit of num) {
      if (!validDigits.includes(digit)) {
        isSupersquare = false;
        break;
      }
    }
    if (isSupersquare) {
      this.setState({ result: "✅ " + num + " is a Super Square Number" });
    } else {
      this.setState({ result: "❌ " + num + " is NOT a Super Square Number" });
    }
  };

  render() {
    return (
      <div className="card">
        <h2>Super Square Checker</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Checks if all digits are perfect squares (0, 1, 4, or 9).
        </p>
        <input
          type="text"
          placeholder="Enter 4 digit number"
          value={this.state.number}
          onChange={this.handleChange}
          maxLength={4}
        />
        <button onClick={this.checkSupersquare}>Check Number</button>
        {this.state.result && <div className="result-text">{this.state.result}</div>}
      </div>
    );
  }
}

export default Supersquare;

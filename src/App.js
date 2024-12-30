import React, { useState } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Calculator />
    </div>
  );
}

function Calculator() {
  const [friendRate, setFriendRate] = useState("");
  const [yourRate, setYourRate] = useState("");
  const [bill, setBill] = useState("");
  const tip = (parseFloat(bill) * (yourRate + friendRate)) / 2 / 100;

  function handleClickReset() {
    setBill("");
    setFriendRate("");
    setYourRate("");
  }

  return (
    <div className="container">
      <Bill bill={bill} setBill={setBill} />
      <ServiceRate key="1" tipPercentage={yourRate} setPercentage={setYourRate}>
        <label>How did you like the service?</label>{" "}
      </ServiceRate>
      <ServiceRate
        key="2"
        tipPercentage={friendRate}
        setPercentage={setFriendRate}
      >
        <label>How did your friend like the service?</label>{" "}
      </ServiceRate>
      {bill > 0 && <Message tip={tip} bill={bill} onClick={handleClickReset} />}
    </div>
  );
}

function Bill({ bill, setBill }) {
  const [error, setError] = useState(""); // State to track the error message

  const handleChange = (e) => {
    let value = e.target.value.replace("$", "");

    if (!/^\d*\.?\d*$/.test(value)) {
      // If the value is invalid, set an error message
      setError("Please enter a valid number");
      return;
    }
    if (value.length > 15) {
      setError("Number is too large.");
      return;
    }

    setError(""); // Clear any existing errors
    setBill(value);
  };

  return (
    <div className="question">
      <span>How much was the bill</span>
      <div className="bill">
        <input
          className="input"
          type="text"
          value={bill}
          placeholder="Bill..."
          onChange={handleChange}
          onFocus={(e) => {
            if (bill) e.target.value = bill;
          }}
          onBlur={(e) => {
            if (bill) e.target.value = `${bill}$`;
          }}
        />
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

function ServiceRate({ tipPercentage, setPercentage, children }) {
  return (
    <div className="question">
      <span> {children}</span>
      <select
        id="list"
        className="input"
        value={tipPercentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was ok (5%)</option>
        <option value="10">It was goo (10%)</option>
        <option value="20">Absolutely, it was good (20%)</option>
      </select>
    </div>
  );
}

function Message({ bill, tip, onClick }) {
  const numericBill = parseFloat(bill.replace("$", "")) || 0;
  return (
    <div className="message">
      <p>
        <span> &gt; </span>
        You pay {numericBill + tip} $ (${bill} + ${tip} tip)
      </p>

      <button onClick={onClick} className="button">
        <span>Reset </span>
      </button>
    </div>
  );
}

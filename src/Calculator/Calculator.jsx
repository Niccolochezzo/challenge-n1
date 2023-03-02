import React, { useState, useMemo, useCallback } from "react";
import "./calculator.css";
import dollar from "./assets/icon-dollar.svg";
import person from "./assets/icon-person.svg";

function Calculator() {
  const [bill, setBill] = useState(0);
  const [tip, setTip] = useState("Custom");
  const [numOfPeople, setNumOfPeople] = useState(1);

  const handleBillChange = (e) => {
    setBill(parseFloat(e.target.value));
  };

  const handleTipChange = useCallback((value) => {
    if (value === "custom") {
      setTip(parseFloat(customTip) / 100);
    } else {
      setTip(parseFloat(value) / 100);
    }
  }, []);

  const handleInputFocus = () => {
    setBill("");
  };

  const handleInputBlur = () => {
    if (bill === "") {
      setBill(0);
    }
  };

  const handleCustomTipChange = (e) => {
    setTip(parseFloat(e.target.value) / 100);
  };

  const handleNumOfPeopleChange = (e) => {
    setNumOfPeople(parseInt(e.target.value));
  };

  const handleTipButtonClick = useCallback(
    (tipPercentage) => {
      handleTipChange(tipPercentage);
    },
    [handleTipChange]
  );

  const handleReset = () => {
    setBill(0);
    setTip(0);
    setNumOfPeople(1);
  };

  const calculateTip = useMemo(() => {
    const tipAmount = bill * tip;
    const totalAmount = bill + tipAmount;
    const tipPerPerson = tipAmount / numOfPeople;
    const totalPerPerson = totalAmount / numOfPeople;

    return {
      tipAmount: tipPerPerson.toFixed(2),
      totalAmount: totalPerPerson.toFixed(2),
    };
  }, [bill, tip, numOfPeople]);

  const { tipAmount, totalAmount } = calculateTip;

  return (
    <div className="calcBoard">
      <div className="left">
        <div className="bill">
          <span>Bill:</span>
          <div>
            <input
              type="number"
              value={bill}
              onChange={handleBillChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <img src={dollar} alt="dollar" />
          </div>
        </div>

        <div className="tips">
          <span>Selected Tips %</span>
          <div className="percentage">
            <button onClick={() => handleTipButtonClick("5")}>5%</button>
            <button onClick={() => handleTipButtonClick("10")}>10%</button>
            <button onClick={() => handleTipButtonClick("15")}>15%</button>
            <button onClick={() => handleTipButtonClick("25")}>25%</button>
            <button onClick={() => handleTipButtonClick("50")}>50%</button>

            <input
              type="number"
              min="0"
              step="0.01"
              value={typeof tip === "number" ? tip * 100 : ""}
              onChange={handleCustomTipChange}
              onFocus={(e) => (e.target.value = "")}
              placeholder="Custom"
            />
          </div>
        </div>

        <div className="numOfPeople">
          {numOfPeople < 1 ? (
            <div className="alert">
              <span>Number of People:</span> <p>Can't be zero</p>
            </div>
          ) : (
            <span>Number of People:</span>
          )}

          <div>
            <img src={person} alt="person" />
            <input
              className={numOfPeople < 1 ? "red-border" : ""}
              type="number"
              min="1"
              value={numOfPeople}
              onChange={handleNumOfPeopleChange}
              onFocus={(e) => (e.target.value = "")}
              onBlur={(e) => (e.target.value = numOfPeople)}
            />
          </div>
        </div>
      </div>

      <div className="right">
        <div className="rightWrapper">
          <div className="tipAmount">
            <p>
              Tip Amount
              <br />
              <span>/ person</span>
            </p>
            <p className="totals">
              {isNaN(tipAmount) || !isFinite(tipAmount)
                ? "$0"
                : `$${tipAmount}`}
            </p>
          </div>
          <div className="tipAmount">
            <p>
              Total
              <br />
              <span>/ person</span>
            </p>
            <p className="totals">
              {isNaN(totalAmount) || !isFinite(totalAmount)
                ? "$0"
                : `$${totalAmount}`}
            </p>
          </div>
        </div>

        <button
          className={bill === 0 ? "disabled" : ""}
          disabled={bill === 0}
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Calculator;

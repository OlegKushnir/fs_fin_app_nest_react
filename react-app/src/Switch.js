import "./switch.css";

function Switch({ setIncome, income }) {
  return (
     <div className="toggle-radio">
      <input
        type="radio"
        name="rdo"
        id="yes"
        checked={income}
        readOnly
      />
      <input
        type="radio"
        name="rdo"
        id="no"
        checked={!income}
        readOnly
      />
      <div className="switch">
        <label htmlFor="yes" onClick={() => setIncome(true)}>
          income
        </label>
        <label htmlFor="no" onClick={() => setIncome(false)}>
          expense
        </label>
        <span></span>
      </div>
    </div>
  );
}

export default Switch;

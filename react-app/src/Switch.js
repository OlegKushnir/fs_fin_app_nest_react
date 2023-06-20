import "./switch.css";
function Switch() {
  return (<div class="toggle-radio">
  <input type="radio" name="rdo" id="yes" checked/>
  <input type="radio" name="rdo" id="no"/>
  <div class="switch">
    <label for="yes">income</label>
    <label for="no">expense</label>
    <span></span>
  </div>
  </div>
  );
}

export default Switch;
/**
 * UIFormController
 *
 * [CONTROLLER]
 */

import React, {Component} from "react"
import ReactDOM from "react-dom"

import UIInput from "./UIInput"
import UITextarea from "./UITextarea"
import UIButton from "./UIButton"
import UISelect from "./UISelect"

function inputGenerator(inputs = []) {
  if (inputs.length == 0)  {
    return; // better no op than errors

  } else {
    return inputs.map((input, index) => {
      var {type, name, label, defaultValue} = input;
      switch (input.type) {
        case "textarea":
          return <UITextarea ref={name} {...input} key={index} />
        break;
        case "select":
          return <UISelect ref={name} {...input} key={index} />
        break;
        default:
          return <UIInput ref={name} {...input} key={index} />
      }
    })
  }
}

export default class UIFormController extends Component {
  constructor(props) {
    super(props)
  }

  _renderInputs(inputs) { // method object wrapper
    return inputGenerator(inputs);
  }

  _renderButton() {
    return <UIButton name="submit" type="submit" />
  }

  _payloadMapper() {
    var self = this;
    var payload = {};

    Object.keys(this.refs).forEach(name => {
      // Fetch value from input via refs
      var value = this.refs[name].refs["low-level-input"].value;
      // Populate empty object with key/value pairs
      payload[name] = value;
    });

    return payload;
  }

  _submitHandler(action, e) {
    e.preventDefault();
    var payload = this._payloadMapper();

    if (this.props.dispatch && action) {
      this.props.dispatch(action(payload));
    }

  }

  // This is to handle 2 level deep submission of second level records
  _deepSubmitHandler(associativeRecordID, action, e) {
    e.preventDefault();
    var payload = this._payloadMapper();
    if (this.props.dispatch && action) {
      this.props.dispatch(action(associativeRecordID, payload))
    }
  }
}

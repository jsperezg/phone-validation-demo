import React from 'react';
import { parsePhoneNumberFromString, AsYouType } from 'libphonenumber-js';

class PhoneValidationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryCode: '',
      phoneNumber: '',
      isValidNumber: false,
      formattedValue: ''
    };
  }

  validateInput = () => {
    const { countryCode, phoneNumber } = this.state;

    const number = parsePhoneNumberFromString(phoneNumber, countryCode);
    if (number) {
      this.setState({
        isValidNumber: number.isValid(),
        formattedValue: number.format('E.164')
      });
    } else {
      this.setState({
        isValidNumber: false,
        formattedValue: ''
      });
    }
  };

  handleChange = (event) => {
    const { id, value } = event.target;

    let formattedValue;
    if (id === 'phoneNumber') {
      const { countryCode } = this.state;

      formattedValue = new AsYouType(countryCode).input(value);
    } else {
      formattedValue = value.toUpperCase();
    }

    this.setState({
      [id]: formattedValue
    }, this.validateInput);
  };

  render() {
    const { countryCode, phoneNumber, isValidNumber, formattedValue } = this.state;

    return (
      <form>
        <div>
          <label htmlFor="countryCode">Country code</label>
          <br />
          <input type="text" id="countryCode" value={countryCode} onChange={this.handleChange} />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <br />
          <input type="text" id="phoneNumber" value={phoneNumber} onChange={this.handleChange} />
        </div>

        {isValidNumber && (
          <div>
            <p>Is valid!!! E.164 format: { formattedValue }</p>
          </div>
        )}
      </form>
    );
  }
}

export default PhoneValidationForm;

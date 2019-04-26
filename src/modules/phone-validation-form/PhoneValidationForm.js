import React from 'react';
import ParseNumberFormat from 'google-libphonenumber';

class PhoneValidationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countryCode: '',
      phoneNumber: '',
      isValidNumber: false,
      isPossibleNumber: false,
      formattedValue: ''
    };

    this.phoneUtil = ParseNumberFormat.PhoneNumberUtil.getInstance();
  }

  validateInput = () => {
    const { countryCode, phoneNumber } = this.state;

    try {
      const number = this.phoneUtil.parse(phoneNumber, countryCode);
      this.setState({
        isValidNumber: this.phoneUtil.isValidNumber(number),
        isPossibleNumber: this.phoneUtil.isPossibleNumber(number),
        formattedValue: `+${number.getCountryCode()} ${this.phoneUtil.format(number, ParseNumberFormat.E164)}`
      });
    } catch {
      this.setState({
        isValidNumber: false,
        isPossibleNumber: false,
        formattedValue: ''
      });
    }
  };

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      [id]: value.toUpperCase()
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

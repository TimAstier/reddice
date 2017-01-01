import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup'
import TextFieldGroup from '../common/TextFieldGroup';

// Use class components for top-components to get hot reloading working
class SignupForm extends React.Component {
  // Defining the state in the constructor
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false
    };

    // Binding the right context to the onChange and onSubmit methods
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  onSubmit(e) {
    e.preventDefault();
    // Condition for client side validation
    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {})
        .catch(error => {
          this.setState({ errors: error.response.data, isLoading: false }) });
    }
  }

  render() {
    const { errors } = this.state;
    const options = map(timezones, (val, key) =>
      <option key={val} value={val}>{key}</option>
    );
    return (
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>

				<TextFieldGroup
					error={errors.username}
					label="Username"
					onChange={this.onChange}
					value={this.state.username}
					field="username"
				/>

				<TextFieldGroup
					error={errors.email}
					label="Email"
					onChange={this.onChange}
					value={this.state.email}
					field="email"
				/>

				<TextFieldGroup
					error={errors.password}
					label="Password"
					onChange={this.onChange}
					value={this.state.password}
					field="password"
				/>

				<TextFieldGroup
					error={errors.passwordConfirmation}
					label="Password Confirmation"
					onChange={this.onChange}
					value={this.state.passwordConfirmation}
					field="passwordConfirmation"
				/>

        <div className={classnames("form-group",
          { 'has-error': errors.timezone })}>
          <label className="control-label">Timezone</label>
          <select
            value={this.state.timezone}
            onChange={this.onChange}
            name="timezone"
            className="form-control"
          >
            <option value="" disabled>Choose your Timezone</option>
            {options}
          </select>
          { errors.timezone &&
            <span className="help-block">{errors.timezone}</span>
          }
        </div>

        <div className="form-group">
          <button
            className="btn btn-primary btn-lg"
            disabled={this.state.isLoading}
          >
            Sign up
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired
};

export default SignupForm;

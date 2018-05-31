import React, { Component } from "react";
import { Form, FormField, Button, Label } from "semantic-ui-react";
import PropTypes from "prop-types";

class authform extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      errors: {},
      stat: false,
      loading: false
    };
  }

  componentDidMount() {}

  onSubmit = () => {
    this.setState({
      errors: { ...this.validateform(this.state.data) },
      stat: true
    });

    setTimeout(() => {
      if (this.state.stat && Object.keys(this.state.errors).length === 0) {
        this.props.submitdatabase(this.state.data);
        this.setState({
          loading: true
        });
      }
    }, 0);
  };

  validateform = data => {
    const errors = {};
    if (!data.name || data.name === "") errors.name = "Name is required";
    if (!data.password || data.password === "")
      errors.password = "Password is required";
    return errors;
  };

  handleChange = e => {
    this.setState({
      data: {
        ...this.state.data,
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormField error={!!this.state.errors.name}>
          <label>Name</label>
          <input
            name="name"
            placeholder="Name"
            type="text"
            onChange={this.handleChange}
          />

          {this.state.errors.name && (
            <Label basic color="red" pointing>
              {this.state.errors.name}
            </Label>
          )}
        </FormField>
        <FormField error={!!this.state.errors.password}>
          <label>Passcode</label>
          <input
            name="password"
            placeholder="Password"
            type="password"
            onChange={this.handleChange}
          />
          {this.state.errors.password && (
            <Label basic color="red" pointing>
              {this.state.errors.password}
            </Label>
          )}
        </FormField>
        <Button type="submit" loading={this.state.loading}>
          Submit
        </Button>
      </Form>
    );
  }
}

authform.propTypes = {
  submitdatabase: PropTypes.func.isRequired
};

export default authform;

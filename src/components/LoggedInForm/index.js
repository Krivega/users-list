// @flow

import React from 'react';
import bem from 'bem-cn';
import { DialogContainer, TextField } from 'react-md';

import './style.css';

const ENTER_KEY_CODE = 13;
const block = bem('logged-in-form');

type Props = {
  email?: string,
  password?: string,
  opened?: boolean,
  onSubmit: ({
    email?: string,
    password?: string
  }) => void | Promise<any>,
  onHide: () => void
};

type State = {
  email?: string,
  password?: string
};

export default class LoggedInForm extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: props.email,
      password: props.password
    };
  }

  handleSubmit = () => {
    const { email, password } = this.state;

    this.props.onSubmit({ email, password });
  };

  handleKeyDown = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === ENTER_KEY_CODE) {
      this.handleSubmit();
    }
  };

  handleChangeField = (value: string, { target: { name } }: { target: { name: string } }) => {
    this.setState({
      [name]: value
    });
  };

  render() {
    const { opened, onHide } = this.props;
    const { email, password } = this.state;
    const actions = [
      {
        secondary: true,
        children: 'Cancel',
        onClick: onHide
      },
      {
        primary: true,
        children: 'Ok',
        onClick: this.handleSubmit
      }
    ];

    return (
      <div className={block()}>
        <DialogContainer
          id="logged-in-form-dialog"
          title="Logged in Administrator"
          visible={opened}
          actions={actions}
          onHide={onHide}
          focusOnMount
        >
          <TextField
            id="email-logged-in"
            label="Email"
            name="email"
            onChange={this.handleChangeField}
            onKeyDown={this.handleKeyDown}
            value={email}
          />
          <TextField
            id="password-logged-in"
            label="Password"
            name="password"
            type="password"
            onChange={this.handleChangeField}
            onKeyDown={this.handleKeyDown}
            value={password}
          />
        </DialogContainer>
      </div>
    );
  }
}

// @flow

import React from 'react';
import bem from 'bem-cn';
import { Button, TextField } from 'react-md';

import './style.css';

const ENTER_KEY_CODE = 13;
const block = bem('text-editing');

type Props = {
  value?: string,
  label?: string,
  id: string,
  opened?: boolean,
  onEdit: (value?: string) => void,
  onChange?: (value?: string) => void
};

type State = {
  value?: string
};

export default class TextEditing extends React.PureComponent<Props, State> {
  textFieldEl: ?HTMLInputElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      value: props.value || ''
    };
  }

  componentWillReceiveProps(props: Props) {
    const value = props.value;

    if (value !== undefined) {
      this.setState({
        value
      });
    }
  }

  handleChange = (value: string) => {
    const { onChange } = this.props;

    this.setState({
      value
    });

    if (onChange === undefined) {
      return;
    }

    onChange(value);
  };

  handleSave = () => {
    this.props.onEdit(this.state.value);
  };

  setRefTextFieldEl = (el: ?HTMLInputElement) => {
    this.textFieldEl = el;
  };

  handleKeyDown = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === ENTER_KEY_CODE) {
      this.handleSave();
    }
  };

  render() {
    const { value } = this.state;
    const { label, id } = this.props;

    return (
      <div className={block()} onKeyDown={this.handleKeyDown} tabIndex="0">
        <TextField
          label={label}
          value={value}
          onChange={this.handleChange}
          id={id}
          inlineIndicator={
            <Button icon secondary onClick={this.handleSave} className={block('inline-btn')()}>
              done
            </Button>
          }
          ref={this.setRefTextFieldEl}
        />
      </div>
    );
  }

  componentDidMount() {
    if (this.textFieldEl) {
      this.textFieldEl.focus();
    }
  }
}

// @flow

import React from 'react';
import { DialogContainer, TextField } from 'react-md';

const ENTER_KEY_CODE = 13;

type Props = {
  value?: string,
  id: string,
  opened?: boolean,
  onSave: (value?: string) => void,
  onCancel: () => void
};

type State = {
  value?: string
};

export default class ImageUrlEditing extends React.PureComponent<Props, State> {
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

  handleSave = () => {
    this.props.onSave(this.state.value);
  };

  handleKeyDown = ({ keyCode }: { keyCode: number }) => {
    if (keyCode === ENTER_KEY_CODE) {
      this.handleSave();
    }
  };

  handleChange = (value: string) => {
    this.setState({
      value
    });
  };

  render() {
    const { value } = this.state;
    const { id, onCancel, opened } = this.props;
    const actions = [
      {
        secondary: true,
        children: 'Cancel',
        onClick: onCancel
      },
      {
        primary: true,
        children: 'Ok',
        onClick: this.handleSave
      }
    ];

    return (
      <DialogContainer
        title="Image Url"
        id={id}
        visible={opened}
        actions={actions}
        onHide={onCancel}
        focusOnMount
      >
        <TextField
          id={`${id}-field`}
          name={`${id}-field`}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
          value={value}
        />
      </DialogContainer>
    );
  }
}

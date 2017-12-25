// @flow

import React from 'react';
import bem from 'bem-cn';
import { Button } from 'react-md';
import Image from 'components/Image';
import TextEditing from 'components/TextEditing';
import ImageUrlEditing from 'components/ImageUrlEditing';

import './style.css';

const block = bem('user-info');

type Props = {
  name: string,
  avatarUrl: string,
  editable?: boolean,
  onChangeName: (value: string) => void,
  onChangeAvatarUrl: (value: string) => void
};

type State = {
  nameEdited: boolean,
  avatarUrlEdited: boolean
};

export default class UserInfo extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      nameEdited: false,
      avatarUrlEdited: false
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.name !== this.props.name) {
      this.setState({ nameEdited: false });
    }
    if (nextProps.avatarUrl !== this.props.avatarUrl) {
      this.setState({
        avatarUrlEdited: false
      });
    }
  }

  handleEditNameStart = () => {
    this.setState({ nameEdited: true });
  };

  handleEditNameEnd = (value?: string) => {
    if (value && value !== this.props.name) {
      this.props.onChangeName(value);
    } else {
      this.setState({ nameEdited: false });
    }
  };

  handleEditAvatarUrlStart = () => {
    this.setState({ avatarUrlEdited: true });
  };

  handleEditAvatarUrlSave = (value?: string) => {
    if (value && value !== this.props.avatarUrl) {
      this.props.onChangeAvatarUrl(value);
    } else {
      this.setState({ avatarUrlEdited: false });
    }
  };

  handleEditAvatarUrlCancel = () => {
    this.setState({ avatarUrlEdited: false });
  };

  renderImage() {
    const { avatarUrl, name } = this.props;

    return <Image src={avatarUrl} alt={name} fit />;
  }

  renderTextEditing() {
    const { name } = this.props;

    return <TextEditing value={name} onEdit={this.handleEditNameEnd} id={`editing-text-${name}`} />;
  }

  renderAvatarUrlAEditing() {
    const { avatarUrl, name, editable } = this.props;
    const { avatarUrlEdited } = this.state;

    if (!editable) {
      return null;
    }

    return (
      <ImageUrlEditing
        value={avatarUrl}
        id={`editing-avatar-url-${name}`}
        opened={avatarUrlEdited}
        onSave={this.handleEditAvatarUrlSave}
        onCancel={this.handleEditAvatarUrlCancel}
      />
    );
  }

  renderTextActions() {
    const { editable } = this.props;

    if (!editable) {
      return null;
    }

    return (
      <div className={block('title', 'edit')()}>
        <Button icon primary onClick={this.handleEditNameStart}>
          edit
        </Button>
      </div>
    );
  }

  renderAvatarUrlActions() {
    const { editable } = this.props;

    if (!editable) {
      return null;
    }

    return (
      <div className={block('image', 'edit')()}>
        <Button primary floating onClick={this.handleEditAvatarUrlStart}>
          edit
        </Button>
      </div>
    );
  }

  render() {
    const { name } = this.props;
    const { nameEdited, avatarUrlEdited } = this.state;

    return (
      <div className={block()}>
        <div className={block('image')()}>
          {this.renderImage()}
          {!avatarUrlEdited ? this.renderAvatarUrlActions() : null}
        </div>
        <div className={block('info')()}>
          <h1 className={block('title')()}>
            {!nameEdited ? name : null}
            {!nameEdited ? this.renderTextActions() : null}
            {nameEdited ? this.renderTextEditing() : null}
          </h1>
        </div>
        {this.renderAvatarUrlAEditing()}
      </div>
    );
  }
}

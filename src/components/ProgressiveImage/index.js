// @flow

import React from 'react';
import bem from 'bem-cn';
import ImageComponent from 'components/Image';

import './style.css';

const block = bem('progressive-image');

type Props = {
  src: string,
  placeholder: string,
  alt?: string,
  responsive?: boolean,
  fit?: boolean,
  small?: boolean,
  circle?: boolean
};

type State = {
  currentSrc: string,
  loading: boolean
};

export default class ProgressiveImage extends React.PureComponent<Props, State> {
  image: ?HTMLImageElement;

  constructor(props: Props) {
    super(props);

    this.state = {
      currentSrc: props.placeholder,
      loading: true
    };
  }

  componentDidMount() {
    const { src } = this.props;

    this.loadImage(src);
  }

  componentWillReceiveProps(nextProps: Props) {
    const { src, placeholder } = nextProps;

    if (src !== this.props.src) {
      this.setState({ currentSrc: placeholder, loading: true }, () => {
        this.loadImage(src);
      });
    }
  }

  componentWillUnmount() {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }
  }

  loadImage = (src: string) => {
    if (this.image) {
      this.image.onload = null;
      this.image.onerror = null;
    }

    this.image = new Image();
    this.image.onload = this.onLoad;
    this.image.src = src;
  };

  onLoad = () => {
    if (this.image) {
      this.setState({
        currentSrc: this.image.src,
        loading: false
      });
    }
  };

  getBemMods() {
    return {
      loading: !!this.state.loading,
      fit: !!this.props.fit
    };
  }

  render() {
    const { currentSrc } = this.state;
    const { responsive, alt, fit, circle, small } = this.props;

    return (
      <div className={block(this.getBemMods())()}>
        <ImageComponent
          src={currentSrc}
          alt={alt}
          responsive={responsive}
          fit={fit}
          circle={circle}
          small={small}
        />
      </div>
    );
  }
}

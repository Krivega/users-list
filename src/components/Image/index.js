// @flow

import React from 'react';
import bem from 'bem-cn';

import './style.css';

const block = bem('image');

type ImageProps = {
  src: string,
  alt?: string
};

type ModsProps = {
  responsive?: boolean,
  fit?: boolean,
  small?: boolean,
  circle?: boolean
};

type Props = ImageProps & ModsProps;

const getBemMods = ({ responsive, fit, small, circle }: ModsProps) => {
  const mods = {
    responsive: !!responsive,
    fit: !!fit,
    small: !!small,
    circle: !!circle
  };

  return mods;
};

const Image = (props: Props) => {
  const { src, alt } = props;

  return <img className={block(getBemMods(props))()} src={src} alt={alt} />;
};

export default Image;

// @flow

import React from 'react';
import bem from 'bem-cn';
import { Button, FontIcon } from 'react-md';

import './style.css';

const block = bem('pagination');

type PrevProps = {
  hasPrev?: boolean,
  onClickPrev: () => void
};

type NextProps = {
  hasNext?: boolean,
  onClickNext: () => void
};

type Props = PrevProps & NextProps;

const renderPrev = ({ hasPrev, onClickPrev }: PrevProps) => {
  if (!hasPrev) {
    return null;
  }

  return (
    <div className={block('prev')()}>
      <Button onClick={onClickPrev} raised primary iconEl={<FontIcon>chevron_left</FontIcon>}>
        Prev
      </Button>
    </div>
  );
};

const renderNext = ({ hasNext, onClickNext }: NextProps) => {
  if (!hasNext) {
    return null;
  }

  return (
    <div className={block('next')()}>
      <Button
        onClick={onClickNext}
        raised
        primary
        iconBefore={false}
        iconEl={<FontIcon>chevron_right</FontIcon>}
      >
        Next
      </Button>
    </div>
  );
};

const Pagination = (props: Props) => {
  const { hasPrev, hasNext } = props;

  if (!hasPrev && !hasNext) {
    return null;
  }

  return (
    <div className={block()}>
      {renderPrev(props)}
      {renderNext(props)}
    </div>
  );
};

export default Pagination;

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import useDarkMode from 'composables/useDarkMode';
import './bal-loading-block.scss';

const BalLoadingBlock = ({ className, white, square }) => {
  // const { darkMode } = useDarkMode();
  const darkMode = useState(false);

  const bgClass = useMemo(() => {
    if (white) {
      return 'shimmer-white';
    }

    return darkMode ? 'shimmer-dark' : 'shimmer';
  }, [darkMode, white])

  const componentClasses = classNames('bal-loading-block', bgClass, {
    'rounded-lg': !square,
  }, className);

  return (
    <div className={componentClasses} />
  )
}

BalLoadingBlock.propTypes = {
  className: PropTypes.string,
  white: PropTypes.bool,
  square: PropTypes.bool,
};

BalLoadingBlock.defaultProps = {
  className: '',
  white: false,
  square: false,
};

export default BalLoadingBlock;

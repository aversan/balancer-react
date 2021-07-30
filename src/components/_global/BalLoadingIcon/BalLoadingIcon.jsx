import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BalLoadingIcon = ({ className, size, color }) => {
  const sizeClasses = classNames({
    'lg w-8 h-8': size === 'lg',
    'md w-5.5 h-5.5': size === 'md',
    'sm w-4 h-4': size === 'sm',
  })

  const colorClasses = classNames({
    'bg-white': color === 'white',
    'bg-gray-500': color === 'gray',
  })

  const componentClasses = classNames(
    'bal-loading-icon relative',
    sizeClasses,
    className
  )

  return (
    <div className={componentClasses}>
      <div className={`double-bounce1 w-full h-full rounded-full opacity-60 absolute top-0 left-0 ${colorClasses}`} />
      <div className={`double-bounce2 w-full h-full rounded-full opacity-60 absolute top-0 left-0 ${colorClasses}`} />
    </div>
  )
}

BalLoadingIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.oneOf(['gray', 'primary', 'white']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
};

BalLoadingIcon.defaultProps = {
  className: '',
  color: 'gray',
  size: 'md',
};

export default BalLoadingIcon;

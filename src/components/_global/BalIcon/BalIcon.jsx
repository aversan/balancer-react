import React, { useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import feather from 'feather-icons';
import classNames from "classnames";

const BalIcon = ({ className, name, size, filled }) => {
  const iconSize = useMemo(() => {
    switch (size) {
      case 'xxs':
        return '8';

      case 'xs':
        return '12';

      case 'sm':
        return '16';

      case 'lg':
        return '24';

      case 'xl':
        return '28';

      default:
        return '20';
    }
  }, [size])

  const fill = useMemo(() => filled ? 'currentColor' : 'none', [filled])

  useEffect(() => {
    feather.replace()
  });

  const componentClasses = classNames('bal-icon inline-block', className)

  return (
    <div className={componentClasses}>
      <i data-feather={name} width={iconSize} height={iconSize} fill={fill} />
    </div>
  )
}

BalIcon.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xxs', 'xs', 'sm', 'md', 'lg', 'xl']),
  filled: PropTypes.bool,
};

BalIcon.defaultProps = {
  className: '',
  size: 'md',
  filled: false,
};

export default BalIcon;

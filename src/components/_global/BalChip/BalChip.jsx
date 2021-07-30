import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BalIcon from 'components/_global/bal-icon/bal-icon'
import './bal-chip.scss'

const BalChip = ({ className, label, closeable, size, color, outline, children }) => {
  //   emits: ['closed'],

  const sizeClasses = classNames({
    'p-px text-xs': size === 'sm',
    'p-1 text-sm': size === 'md',
    'p-2 text-base': size === 'lg',
  });

  const colorClasses = classNames({
    'text-white bg-gradient-to-tr from-blue-500 to-pink-500': color === 'gradient',
    'bg-white dark:bg-gray-900': color === 'white',
    'bg-gray-100 dark:bg-gray-800': color === 'gray',
  });

  const outlineClasses = 'border-gray-100 dark:border-gray-900 border shadow-lg'

  const componentClasses = classNames('bal-chip', sizeClasses, colorClasses, {
    [outlineClasses]: outline,
  }, className);

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'xxs';

      case 'lg':
        return 'sm';

      default:
        return 'xs';
    }
  }, [size])

  const iconColorClasses = classNames({
    'text-white': color === 'gradient',
    [`text-${color}-500`]: color !== 'gradient',
  })

  const iconClasses = classNames('close', iconColorClasses);

  return (
    <div className={componentClasses}>
      <div className="content-container">
        {
          label && (
            <span>
              { label || children }
            </span>
          )
        }
        {
          closeable && (
            <div
              // onClick="$emit('closed')"
            >
              <BalIcon name="x" size={iconSize} className={iconClasses} />
            </div>
          )
        }
      </div>
    </div>
  )
}

BalChip.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  closeable: PropTypes.bool,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  color: PropTypes.oneOf(['gray', 'gradient', 'white']),
  outline: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

BalChip.defaultProps = {
  className: '',
  label: '',
  closeable: false,
  size: 'md',
  color: 'gray',
  outline: false,
  children: null,
};

export default BalChip;

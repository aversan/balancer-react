import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BalLoadingIcon from 'components/_global/bal-loading-icon/bal-loading-icon'
import './bal-btn.scss'

const BalBtn = ({ className, label, block, circle, outline, flat, rounded, loading, loadingLabel, disabled, tag, size, color, children }) => {
  const sizeClasses = classNames(
    {
      'px-2 h-6 text-xs': size === 'xs',
      'px-3 h-9 text-base': size === 'sm',
      'px-4 h-12 text-base': size === 'md',
      'px-5 h-18 text-lg md:text-2xl': size === 'lg',
    },
  )

  const circleSizeClasses = classNames(
    {
      'w-6 h-6 text-sm': size === 'xs',
      'w-9 h-9 text-lg': size === 'sm',
      'w-10 h-10 text-lg': size === 'md',
      'w-16 h-16 text-2xl': size === 'lg',
    },
  )

  const bgGradientClasses = useMemo(() => {
    if (outline) {
      return 'bg-transparent';
    }

    let fromColor;
    let toColor;

    switch(color) {
      case 'gradient-reverse':
        fromColor = 'pink';
        toColor = 'blue';
        break;

      case 'gradient-pink-yellow':
        fromColor = 'pink';
        toColor = 'yellow';
        break;

      default:
        fromColor = 'blue';
        toColor = 'pink';
    }

    if (disabled) {
      return `bg-gray-300 dark:bg-gray-700 text-white dark:text-gray-500`;
    }

    if (loading) {
      return `bg-gradient-to-tr from-${fromColor}-50 to-${toColor}-50`;
    }

    return `
      bg-gradient-to-tr from-${fromColor}-500 to-${toColor}-500
      hover:from-${fromColor}-600 hover:to-${toColor}-600
    `;
  }, [outline, color, disabled, loading])

  const bgFlatClasses = useMemo(() => `
    bg-${color}-50 hover:bg-${color}-100
    dark:bg-${color}-800 dark:hover:bg-${color}-700
  `,[color])

  const bgColorClasses = useMemo(() => {
    if (color.includes('gradient')) {
      return bgGradientClasses;
    }

    if (outline) {
      return 'bg-transparent';
    }

    if (flat) {
      return bgFlatClasses;
    }

    if (color === 'white') {
      return 'bg-white';
    }

    if (disabled) {
      return `bg-gray-300 dark:bg-gray-700 text-white dark:text-gray-500`;
    }

    if (loading) {
      return `bg-${color}-400 dark:bg-${color}-dark-400`;
    }

    return `
      bg-${color}-500 hover:bg-${color}-600
      dark:bg-${color}-dark-500 dark:hover:bg-${color}-dark-600
    `;
  },[color, outline, flat, disabled, loading, bgGradientClasses, bgFlatClasses])

  const borderClasses = useMemo(() => {
    if (outline) {
      return `border border-${color}-200 dark:border-${color}-700`;
    }

    return 'border-none';
  }, [color, outline])

  const textColorClasses = useMemo(() => {
    if (color === 'white') {
      if (outline) {
        return 'text-white'
      }

      return 'text-black';
    }

    if (outline || flat) {
      return `text-${color}-500 dark:text-${color}-400`;
    }

    return 'text-white';
  }, [color, outline, flat])

  const displayClasses = useMemo(() => {
    if (circle) {
      return 'flex justify-center items-center';
    }

    if (block) {
      return 'block w-full';
    }

    return 'inline-block';
  }, [circle, block])

  const shapeClasses = useMemo(() => {
    if (circle || rounded) {
      return 'rounded-full';
    }

    return 'rounded-lg';

  }, [circle, rounded])

  const cursorClasses = useMemo(() => {
    if (disabled || loading) {
      return 'cursor-not-allowed';
    }

    return 'cursor-pointer';
  }, [disabled, loading])

  const shadowClasses = useMemo(() => {
    if (flat || disabled || loading) {
      return '';
    }

    if (size === 'sm') {
      return 'shadow-sm hover:shadow-none';
    }

    return 'shadow hover:shadow-none';
  }, [flat, disabled, loading, size])

  const iconColor = useMemo(() => {
    if (outline) {
      return color;
    }

    return 'white';
  }, [outline, color])

  const componentClasses = classNames(
    'bal-btn overflow-hidden tracking-tight focus:outline-none active:outline-none',
    bgColorClasses,
    textColorClasses,
    borderClasses,
    displayClasses,
    shapeClasses,
    shadowClasses,
    cursorClasses,
    {
      [sizeClasses]: !circle,
      [circleSizeClasses]: circle,
    },
    className
  )

  const TagComponent = tag;

  return (
    <TagComponent
      className={componentClasses}
      disabled={disabled || loading}
    >
      {
        loading && (
          <div className="flex items-center justify-center">
            <BalLoadingIcon size={size} color={iconColor} />
            {
              loadingLabel && (
                <span className="ml-2">
                  { loadingLabel }
                </span>
              )
            }
          </div>
        )
      }
      {
        !loading && (
          <div className="bal-btn-content flex justify-center items-center w-full h-full">
            { label || children }
          </div>
        )
      }
    </TagComponent>
  )
}

BalBtn.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  block: PropTypes.bool,
  circle: PropTypes.bool,
  outline: PropTypes.bool,
  flat: PropTypes.bool,
  rounded: PropTypes.bool,
  loading: PropTypes.bool,
  loadingLabel: PropTypes.string,
  disabled: PropTypes.bool,
  tag: PropTypes.oneOf(['button', 'a', 'div', 'Link']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  color: PropTypes.oneOf([
    'primary',
    'gradient',
    'gradient-reverse',
    'gradient-pink-yellow',
    'gray',
    'red',
    'white',
    'blue'
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

BalBtn.defaultProps = {
  className: '',
  label: '',
  block: false,
  circle: false,
  outline: false,
  flat: false,
  rounded: false,
  loading: false,
  loadingLabel: 'Loading...',
  disabled: false,
  tag: 'button',
  size: 'md',
  color: 'primary',
  children: null,
};

export default BalBtn;

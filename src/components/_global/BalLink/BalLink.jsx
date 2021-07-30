import React from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

const BalLink = ({ className, external, noStyle, children }) => {
  const target = external && '_blank' || undefined
  const rel = external && 'noopener noreferrer' || undefined

  const componentClasses = classNames({
    'text-blue-500 hover:underline': !noStyle
  }, className);

  return (
    <a className={componentClasses} target={target} rel={rel}>
      { children }
    </a>
  )
}

BalLink.propTypes = {
  className: PropTypes.string,
  external: PropTypes.bool,
  noStyle: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

BalLink.defaultProps = {
  className: '',
  external: false,
  noStyle: false,
  children:null,
};

export default BalLink;

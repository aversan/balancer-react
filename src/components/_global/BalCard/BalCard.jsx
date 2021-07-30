import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const BalCard = ({ className, title, titleTag, square, noPad, noContentPad, noBorder, darkBgColor, shadow, children, header, footer }) => {
  const headerClasses = classNames('header flex items-center', {
    'p-4 pb-3': !noPad
  });

  const contentClasses = classNames('content', {
    'p-4 pt-3': !noPad && !noContentPad
  });

  const footerClasses = classNames('footer flex items-center bg-gray-50 dark:bg-gray-850 border-t border-gray-100 dark:border-gray-900', {
    'rounded-b-lg': !square,
    'p-4 pt-3': !noPad
  });

  const componentClasses = classNames('bal-card', {
    'rounded-lg': !square,
    [`bg-white dark:bg-gray-${darkBgColor}`]: darkBgColor,
    [`shadow${shadow ? '-' : ''}${shadow}`]: shadow,
    'border dark:border-gray-900': !noBorder
  }, className);

  const HeaderComponent = header;
  const FooterComponent = footer;
  const TitleComponent = titleTag;

  return (
    <div className={componentClasses}>
      {
        (title || header) && (
          <div className={headerClasses}>
            {
              title && (
                <TitleComponent>{title}</TitleComponent>
              )
            }
            {
              header && (
                <div className="flex-1 flex items-center">
                  <HeaderComponent />
                </div>
              )
            }
          </div>
        )
      }
      <div className={contentClasses}>
        {children}
      </div>
      {
        footer && (
          <div className={footerClasses}>
            <FooterComponent />
          </div>
        )
      }
    </div>
  )
}

BalCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  titleTag: PropTypes.string,
  square: PropTypes.bool,
  noPad: PropTypes.bool,
  noContentPad: PropTypes.bool,
  noBorder: PropTypes.bool,
  darkBgColor: PropTypes.string,
  shadow: PropTypes.oneOf(['', 'none', 'sm', 'md', 'lg', 'xl']),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  header: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  footer: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

BalCard.defaultProps = {
  className: '',
  title: '',
  titleTag: 'h5',
  square: false,
  noPad: false,
  noContentPad: false,
  noBorder: false,
  darkBgColor: '850',
  shadow: '',
  children: null,
  header: null,
  footer: null,
};

export default BalCard;

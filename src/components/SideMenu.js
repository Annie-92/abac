import React from 'react'
import './SideMenu.css';
import classNames from 'classnames';

function SideMenu(props) {
  const { isMenuActive, toggleMenu } = props;

  const sideMenuClasses = classNames('side-menu', {
    'side-menu--active': isMenuActive,
  });

  return (
    <aside className={sideMenuClasses}>
      <button className="side-menu__toggle" onClick={toggleMenu}>
        <span className="side-menu__toggle-icon" />
      </button>
      {/* menu content */}
    </aside>
  );
}


export default SideMenu;
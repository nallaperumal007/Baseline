import React, { Component } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { NestedMenuItem } from 'mui-nested-menu';
import styles from './menuComponent.module.css';
import Link from 'next/link';

class MenuComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      openedMenuId: null, // store the ID of the opened menu
    };
  }

  handleClick = (e, menuId) => {
    if (this.state.openedMenuId === menuId) {
      this.setState({ openedMenuId: null });
    } else {
      this.setState({ anchorEl: e.currentTarget, openedMenuId: menuId });
    }
  }

  handleClose = () => {
    this.setState({ anchorEl: null, openedMenuId: null });
  }

  renderSubMenuItems = (subMenu) => {
    if (!subMenu) return null;
    return (
        <div className={styles.content}>
{
    subMenu.map(item => (
        item.subMenu ? (
          <NestedMenuItem
            key={item.id}
            label={item.title}
            parentMenuOpen={Boolean(this.state.anchorEl)}
          >
            {this.renderSubMenuItems(item.subMenu)}
          </NestedMenuItem>
        ) : (
          <Link href={item.link} key={item.id} className={styles.subMenuItem}>
            <MenuItem key={item.id} onClick={this.handleClose}>
              {item.title}
            </MenuItem>
          </Link>
        )
      ))
}
        </div>
    )
    
  }

  render() {
    const { anchorEl, openedMenuId } = this.state;
    const { menu } = this.props;

    return (
      <div className={styles.menuWrapper}>
        {menu.map(menuItem => (
          <div key={menuItem.id}>
            {menuItem.subMenu ?
              <p
                aria-controls={`menu-${menuItem.id}`}
                aria-haspopup="true"
                onClick={(e) => this.handleClick(e, menuItem.id)}
                className={styles.menuItem}
              >
                {menuItem.title}

                {menuItem.subMenu != null &&
                  <i
                    style={{ marginLeft: 5 }}
                    class="fa fa-caret-down"
                  ></i>}
              </p>
              :
              <p
                aria-controls={`menu-${menuItem.id}`}
                aria-haspopup="true"
                className={styles.menuItem}
              >
                <Link href={menuItem.link} passHref>
                  <span>{menuItem.title}</span>
                </Link>
              </p>
            }

            {menuItem.subMenu &&
              <Menu
                id={`menu-${menuItem.id}`}
                anchorEl={anchorEl}
                open={openedMenuId === menuItem.id}
                onClose={this.handleClose}
                className={styles.subMenu}
              >
                <div className={styles.content}>
                  {menuItem.subMenu && menuItem.subMenu.map(subMenuItem => (
                    subMenuItem.subMenu ? (
                      <NestedMenuItem
                        key={subMenuItem.id}
                        label={subMenuItem.title}
                        parentMenuOpen={openedMenuId === menuItem.id}
                      >
                        {this.renderSubMenuItems(subMenuItem.subMenu)}
                      </NestedMenuItem>
                    ) : (
                      <Link href={subMenuItem.link} key={subMenuItem.id} className={styles.subMenuItem}>
                        <MenuItem onClick={this.handleClose}>{subMenuItem.title}</MenuItem>
                      </Link>
                    )
                  ))}
                </div>
              </Menu>
            }
          </div>
        ))}
      </div>
    );
  }
}

export default MenuComponent;

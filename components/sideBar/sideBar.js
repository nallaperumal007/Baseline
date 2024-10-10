import React from 'react';
import { Menu } from 'antd';

const getLevelKeys = (items) => {
  const key = {};
  const func = (items, level = 1) => {
    items.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items);
  return key;
};

class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      access_role_list: global.config.access_role_list,
      tnnt_id: global.config.tnnt_id,
      username: global.config.username,
      stateOpenKeys: ['', ''],
      arr_usecase_contect: [],
    };
  }

  componentDidMount() {
    console.log(this.props.defaultOpenKeys)
    const username = global.config.username;
    if (username != null && username !== undefined) {
      this.setState({
        username: username,
        tnnt_id: global.config.tnnt_id,
      });
    }
  }

  onOpenChange = (openKeys) => {
    const { stateOpenKeys } = this.state;
    const { items } = this.props;

    const levelKeys =  getLevelKeys(items)
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);

    if (currentOpenKey !== undefined) {
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      this.setState({
        stateOpenKeys: openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      });
    } else {
      this.setState({ stateOpenKeys: openKeys });
    }
  };

onClick = (e) => {
  const { key } = e;
  const { items, onItemSelect } = this.props;
  
  const findItemByKey = (items, key) => {
    for (const item of items) {
      if (item.key == key) return item;
      if (item.children) {
        const found = findItemByKey(item.children, key);
        if (found) return found;
      }
    }
    return null;
  };

  // Find the item by key and get its id (usecase id)
  const clickedItem = findItemByKey(items, key);
  const itemId = clickedItem ? clickedItem.id : null;
  if (onItemSelect) {
    onItemSelect(itemId);
  }
};

  render() {
    const { stateOpenKeys } = this.state;
    const { items } = this.props;

    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={['']}
        openKeys={stateOpenKeys}
        onOpenChange={this.onOpenChange}
        style={{ width: 300, position: 'fixed' }}
        items={items}
        onClick={this.onClick}
        // disableScrollLock={true}
      />
    );
  }
}

export default SideBar;
